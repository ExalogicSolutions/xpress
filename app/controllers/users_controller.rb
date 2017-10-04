class UsersController < ApplicationController
  
  before_action :set_user, only: [:set, :set_head, :reset, :reset_head, :show_head_details, :show, :edit]

  def index
    case current_user.user_type
      when ADMIN
        admin = current_user
        @industries = admin.industries
        @users = User.where(id:  Staff.where("industry_id in (?)",admin.industries.pluck(:id)).pluck(:user_id))
        when BRANCH_HEAD
          branch_id = current_user.branch.id
          @users = User.where(id:  Staff.where("branch_id = ? and user_id != ?", branch_id,current_user.id).pluck(:user_id))
        when DEPARTMENT_HEAD
          department_id = current_user.department.id
          @users = User.where(id:  Staff.where("department_id = ? and user_id != ? ", department_id,current_user.id).pluck(:user_id))
        when SUB_DEPARTMENT_HEAD
          sub_department_id = current_user.sub_department.id
          @users = User.where(id:  Staff.where("sub_department_id = ? and user_id != ? ", sub_department_id,current_user.id).pluck(:user_id))
    end
  end

  def new
    @industries = {}
    @branches = {}
    @departments = {}
    @sub_departments = {}
    @industries, @branches,  @departments, @sub_departments, @industry_id, @branch_id, @department_id, @sub_department_id = User.drop_filter_module(current_user)
    return render partial: "new"
  end

  def create_staff
  	user = User.create(first_name: params[:first_name], last_name: params[:last_name], user_name: params[:user_name], email: params[:email], password: params[:password], avatar: params[:avatar])
 	personal_detail = PersonalDetail.create(name: (user.first_name+" "+user.last_name).strip, gender: params[:gender], address_line1: params[:address_line1], address_line2: params[:address_line2], landmark: params[:landmark], city: params[:city], pincode: params[:pincode], state: params[:state], country: params[:country], contact_number: params[:contact_number], user_id: user.id)
 	if Staff.create(user_id: user.id,industry_id: params[:industry_id],branch_id: params[:branch_id],department_id: params[:department_id],sub_department_id: params[:sub_department_id])
        flash[:success]="User Created Successfully!"
        redirect_to users_path
      else
        redirect_to :back
      end   
  end

  def edit
  	return render partial: "edit"
  end

  def show
  end

  def show_head_details
  	return render partial: "show_head_details"
  end

  def reset_head
    return render partial: "reset"
  end

  def filter_sub_department
    @sub_departments={}
    SubDepartment.where(department_id: params[:id]).each {|h| @sub_departments[h.personal_detail.name]= h.id }
    return render partial: "sub_department_drop_down"
  end

  def reset
    staff = Staff.find_by_user_id(@user.id)
    if staff.present?
      if staff.sub_department_id.present?
        SubDepartment.find_by_user_id(@user.id).update(user_id: nil)
        @user.update(user_type: nil,status: false)
      elsif staff.department_id.present? 
        Department.find_by_user_id(@user.id).update(user_id: nil)
        @user.update(user_type: nil,status: false)
      elsif staff.branch_id.present? 
        Branch.find_by_user_id(@user.id).update(user_id: nil)
        @user.update(user_type: nil,status: false)
      end
    end
    flash[:success] = "Reset Successfull!"
    redirect_to users_path
  end

  def set_head
    staff = Staff.find_by_user_id(@user.id)
    if staff.present?
      if staff.sub_department_id.present?
        sub_department = SubDepartment.find(staff.sub_department_id)
        @current_head = sub_department.user
      elsif staff.department_id.present?
        department = Department.find(staff.department_id)
        @current_head = department.user
      elsif staff.branch_id.present?
        branch = Branch.find(staff.branch_id)
        @current_head = branch.user
      end
    end
    return render partial: "set"
  end

  def set
    staff=Staff.find_by_user_id(@user.id)
    if staff.present?
      if staff.sub_department_id.present?
        sub_department = SubDepartment.find(staff.sub_department_id)
        sub_department.user.present? ? sub_department.user.update(user_type: nil,status: false) : ""
        sub_department.update(user_id: @user.id)
        @user.update(user_type: SUB_DEPARTMENT_HEAD)
      elsif staff.department_id.present?
        department = Department.find(staff.department_id)
        department.user.present? ? department.user.update(user_type: nil,status: false) : ""
        department.update(user_id: @user.id)
        @user.update(user_type: DEPARTMENT_HEAD)
      elsif staff.branch_id.present?
        branch = Branch.find(staff.branch_id)
        branch.user.present? ? branch.user.update(user_type: nil,status: false) : ""
        branch.update(user_id: @user.id)
        @user.update(user_type: BRANCH_HEAD)
      end
     end    
     flash[:success] = "Reset Successfull"
     redirect_to users_path
  end

  def filter_department
    @departments={}
    Department.where(branch_id: params[:id]).each {|h| @departments[h.personal_detail.name]= h.id }
    return render partial: "department_drop_down"
  end
  
  def edit_details
    @user = current_user
  end  
  def update_personal_detail
      user = current_user
      avatar = params[:avatar].present? ? params[:avatar] : user.avatar
      user.update(first_name: params[:first_name], last_name: params[:last_name], avatar: avatar)
      user.personal_detail.update(name: (user.first_name+" "+user.last_name).strip, gender: params[:gender], address_line1: params[:address_line1], address_line2: params[:address_line2], landmark: params[:landmark], city: params[:city], pincode: params[:pincode], state: params[:state], country: params[:country], contact_number: params[:contact_number])
      flash[:success]="User Created Successfully!"
      redirect_to root_path
  end  

  def set_time
    session[:time] =  DateTime.now
     pd, feedbackquestion = User.get_notifaction_alert(current_user,session[:time])
        @updation_detail = pd.map{|h| {:name => h.name, :time => h.updated_at} }.uniq
        @question_pending = feedbackquestion.count
        @count = @question_pending + @updation_detail.count
    return render partial: "layouts/drop_down_notification"
  end
  private

  def set_user
    @user = User.find(params[:id])
  end

end
