class SubDepartmentsController < ApplicationController
  
  def index
  	if current_user.user_type == ADMIN
  	 @industries = current_user.industries.sort
  	elsif current_user.user_type == SUB_DEPARTMENT_HEAD
        @sub_department = current_user.sub_department
      elsif current_user.user_type == BRANCH_HEAD
        @branch = current_user.branch
        sub_department_ids = @branch.departments.map{|d| d.sub_departments.map{|sd| sd.id}}.flatten
        @sub_departments = SubDepartment.where(id: sub_department_ids)
      elsif current_user.user_type == DEPARTMENT_HEAD
        @department = current_user.department
      end
  end

  def new
  	@industry={}
    @branch={}
    @department={}
    current_user.industries.each {|h| @industry[h.name]= h.id}
    if current_user.user_type== BRANCH_HEAD
      current_user.branch.departments.each {|h| @department[h.personal_detail.name]= h.id}
    end
  	return render partial: "new"
  end

  def create
  	if current_user.user_type== BRANCH_HEAD
      @branch=current_user.branch
    elsif current_user.user_type== DEPARTMENT_HEAD
      @branch=current_user.department.branch
      params[:department_id]=current_user.department.id
    else
      @branch=Branch.find(params[:branch_id])
    end
    @sub_department = SubDepartment.create(department_id: params[:department_id])
  	@personal_detail=PersonalDetail.create(name: params[:name],contact_number: params[:contact_number],address_line1: @branch.personal_detail.address_line1,address_line2: @branch.personal_detail.address_line2,landmark: @branch.personal_detail.landmark,city:  @branch.personal_detail.city,pincode:  @branch.personal_detail.pincode,state:  @branch.personal_detail.state,country:  @branch.personal_detail.country,sub_department_id: @sub_department.id)
  	if @sub_department && @personal_detail 
    		flash[:success] = t('.created')
        #redirect_to sub_departments_path
          if params[:avatars].present?
           @sub_department.create_image(avatars: params[:avatars])
          end  
    		case current_user.user_type
         when BRANCH_HEAD
              redirect_to branches_path
         when DEPARTMENT_HEAD
              redirect_to departments_path 
         when ADMIN, SUB_DEPARTMENT_HEAD
              redirect_to sub_departments_path
         end         
    	else
  		flash[:error] = t('.error')
     		redirect_to :back
    	end
  end

  def edit
    @industry = {}
    current_user.industries.each {|h| @industry[h.name]= h.id }
    @branch ={}
    @department = {}
    @sub_department=SubDepartment.find(params[:id])
    @industry_selected = @sub_department.department.branch.industry_id
    Branch.where(industry_id: @sub_department.department.branch.industry_id).each {|h| @branch[h.personal_detail.name]= h.id }
    @branch_selected = @sub_department.department.branch.id
    Department.where(branch_id: @sub_department.department.branch.id).each {|h| @department[h.personal_detail.name]= h.id }
    @department_selected = @sub_department.department.id
    return render partial: "edit"
  end

  def update
    if current_user.user_type!= DEPARTMENT_HEAD
      if params[:department_id]
        sub_department=SubDepartment.find(params[:id]).update(department_id: params[:department_id])
      else
        sub_department=SubDepartment.find(params[:id])
      end
    else
      sub_department=SubDepartment.find(params[:id])
    end
    personal_detail = PersonalDetail.find_by_sub_department_id(params[:id]).update(name: params[:name], contact_number: params[:contact_number]) 
    @sub_department = SubDepartment.find(params[:id])
    if personal_detail  and @sub_department.image.present? ?  @sub_department.image.update(avatars: params[:avatars]) :  @sub_department.create_image(avatars: params[:avatars])
      flash[:success] = t('.updated')
      #redirect_to sub_departments_path
       if params['remove_avatar'] == "true" 
          @sub_department.image.remove_avatars!   
          @sub_department.image.delete   
         end  
      case current_user.user_type
         when BRANCH_HEAD
              redirect_to branches_path
         when DEPARTMENT_HEAD
              redirect_to departments_path 
         when ADMIN, SUB_DEPARTMENT_HEAD
              redirect_to sub_departments_path
      end   
    else
      flash[:error] = t('.error')
      redirect_to :back
    end
  end

  def destroy
    @sub_department = SubDepartment.find(params[:id])
    if @sub_department.destroy
      flash[:success] = t('.deleted')
      #redirect_to sub_departments_path
      case current_user.user_type
         when BRANCH_HEAD
              redirect_to branches_path
         when DEPARTMENT_HEAD
              redirect_to departments_path 
         when ADMIN, SUB_DEPARTMENT_HEAD
              redirect_to sub_departments_path
      end   
    else
      flash[:error] = t('.error')
        redirect_to :back
    end
  end

  def show_sub_department_head
    @head = User.find(params[:head_id])
    return render partial: "show_sub_department_head"
  end

  def sub_department_head_edit_form
    @head = User.find(params[:head_id])
    return render partial: "edit_sub_department_head"
  end

  def edit_sub_department_head
    @head = User.find(params[:head_id])
    @head.update(first_name: params[:first_name], last_name: params[:last_name], user_name: params[:user_name], user_type: BRANCH_HEAD, email: params[:email], password: params[:password])
    personal_detail = PersonalDetail.find_by(user_id: @head.id).update(name: (@head.first_name+" "+@head.last_name).strip, gender: params[:gender], address_line1: params[:address_line1], address_line2: params[:address_line2], landmark: params[:landmark], city: params[:city], pincode: params[:pincode], state: params[:state], country: params[:country], contact_number: params[:contact_number], user_id: @head.id)
    if @head && personal_detail
      flash[:success] = t('.head_updated')
      #redirect_to sub_departments_path
      case current_user.user_type
         when BRANCH_HEAD
              redirect_to branches_path
         when DEPARTMENT_HEAD
              redirect_to departments_path 
         when ADMIN, SUB_DEPARTMENT_HEAD
              redirect_to sub_departments_path
      end    
    else
      flash[:error] = t('.error')
      redirect_to :back
    end
  end

  def get_sub_department
    @sub_department = SubDepartment.find(params[:id])
    return render partial: "delete"
  end

  def find_industry
  	@industry = Industry.find(params[:id])
  	return render partial: 'show_industry_detail'
  end

  def filter_branch_by_sub_dept
    @branch ={}
    Branch.where(industry_id: params[:id]).each {|h| @branch[h.personal_detail.name]= h.id }
    return render partial: "branch_drop_down"
  end 
  def filter_department
    @department={}
    Department.where(branch_id: params[:id]).each {|h| @department[h.personal_detail.name]= h.id }
    return render partial: "department_drop_down"
  end

  def show
  end
   
  def show_images
     @sub_department = SubDepartment.find_by_id(params['id'])
     @images = @sub_department.image.avatars
  return render partial: "show_images"
  end  

  def sub_department_head_form
    @sub_department = SubDepartment.find(params[:id])
    if params[:image]
      @user = @sub_department.user
      return render partial: "add_image"
    else
      @user_listing = {}
      user_listing=User.where(id: Staff.where(sub_department_id: @sub_department.id).pluck(:user_id))
      user_listing.each{|h| @user_listing[h.personal_detail.name] = h.id}
      return render partial: "create_sub_department_head"
    end
  end

  def create_sub_department_head
    sub_department = SubDepartment.find(params[:sub_department_id])
    user = User.find(params[:user_id])
    user.update(user_type:  SUB_DEPARTMENT_HEAD)
    sub_department.update(user_id: user.id, status: true)
    if sub_department && user
      flash[:success] = t('.head_created')
      #redirect_to sub_departments_path
      case current_user.user_type
         when BRANCH_HEAD
              redirect_to branches_path
         when DEPARTMENT_HEAD
              redirect_to departments_path 
         when ADMIN, SUB_DEPARTMENT_HEAD
              redirect_to sub_departments_path
      end    
    else
      flash[:error] = t('.error')
      redirect_to :back
    end
  end

  def assign_image_head
   if User.find_by_id(params[:id]).update(:avatar => params[:user][:avatar])
      flash[:success] = t('.image_uploaded')
      redirect_to sub_departments_path
   else
      flash[:success] = t('.image_uploaded')
      redirect_to :back
   end 
  end

end
