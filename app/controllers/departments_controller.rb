class DepartmentsController < ApplicationController
  
  before_action :set_department, only: [:show, :edit, :update, :destroy]

  # GET /departments
  # GET /departments.json
  def index
    # @departments_list = current_user.industries.map{|a| {id: a.id, name: a.name, industry_type: a.industry_type, branch_count: a.branches.count, department: a.branches.map{|h| h.departments.map{|h| {}}}}}
    # @departments_list =
    case current_user.user_type
      when ADMIN
        @industries = current_user.industries.sort
        list_industry = current_user.industries
        #admin_branch_tree(list_industry)
        @tree = Industry.get_tree(list_industry)
      when BRANCH_HEAD
        list_branch = [] << current_user.branch
        @tree = Branch.get_tree(list_branch)
        #admin_branch_tree(list_industry)
      when DEPARTMENT_HEAD 
        @department = Department.department_list_tree(current_user.department)
        @sub_department = SubDepartment.sub_department_list_tree(current_user.department)   
    end  
  end

  # GET /departments/1
  # GET /departments/1.json
  def show
  end

  # GET /departments/new
  def new
    @industry = {}
    @branch ={}
    case current_user.user_type
    when ADMIN
            drop_industry = current_user.industries
    when BRANCH_HEAD
         drop_industry = [] << current_user.branch.industry         
    when DEPARTMENT_HEAD
         drop_industry = [] << current_user.department.branch.industry         
    end  
    drop_industry.each {|h| @industry[h.name]= h.id }
    if current_user.user_type == BRANCH_HEAD
       @branch_id = current_user.branch.id
       @industry_id = current_user.branch.industry.id
        @branch[current_user.branch.personal_detail.name] = current_user.branch.id 
       @prop = true
    else
       @branch_id = nil
       @industry_id = nil   
       @prop = false
    end  
    # @industries = current_user.industries.map{|h| {h.id = h.name}
    return render partial: "new"
  end
   

  def filter_branch
    @branch ={}
    Branch.where(industry_id: params[:id]).each {|h| @branch[h.personal_detail.name]= h.id }
    return render partial: "departments/branch_drop_down"
  end  

  # GET /departments/1/edit
  def edit
     @industry = {}
     @branch ={}
       case current_user.user_type
    when ADMIN
            drop_industry = current_user.industries
    when BRANCH_HEAD
         drop_industry = [] << current_user.branch.industry
    when DEPARTMENT_HEAD
         drop_industry = [] << current_user.department.branch.industry         
    end  
     @department = Department.find(params[:id])
     drop_industry.each {|h| @industry[h.name]= h.id }
     @industry_selected = @department.branch.industry_id
     Branch.where(industry_id: @department.branch.industry_id).each {|h| @branch[h.personal_detail.name]= h.id }
     @branch_selected = @department.branch.id

      if current_user.user_type == BRANCH_HEAD
       @branch_selected = current_user.branch.id
       @industry_selected = current_user.branch.industry.id
       @prop = true
    else
       @prop = false
    end  
     return render partial: "edit"

  end

  # POST /departments
  # POST /departments.json
  def create
    @department = Department.create(branch_id: params[:branch_id])
     department_detail = PersonalDetail.new(name: params[:name], contact_number: params[:contact_number], department_id: @department.id)
     if department_detail.save  
        flash[:success] = t('.created')
         if params[:avatars].present?
           @department.create_image(avatars: params[:avatars])
        end  
        redirect_to departments_path
      else
        @department.delete
        flash[:error] = t('.error')
        redirect_to :back
      end

  end

  # PATCH/PUT /departments/1
  # PATCH/PUT /departments/1.json
  def update
   personal_detail = PersonalDetail.find_by_department_id(params[:id]).update(name: params[:name], contact_number: params[:contact_number]) 
   if personal_detail and @department.image.present? ?  @department.image.update(avatars: params[:avatars]) :  @department.create_image(avatars: params[:avatars])
        flash[:success] = t('.updated')
         if params['remove_avatar'] == "true" 
          @department.image.remove_avatars!   
          @department.image.delete   
         end  
        redirect_to departments_path
      else
        flash[:error] = t('.error')
        redirect_to :back
      end
  end


  def get_department_delete
    @department = Department.find(params[:id])
  return render partial: "delete"
  end  

  # DELETE /departments/1
  # DELETE /departments/1.json
  def destroy
    @department = Department.find(params[:id])
    if @department.destroy
      flash[:success] = t('.deleted')
      redirect_to departments_path
    else
      flash[:error] = t('.error')
        redirect_to :back
    end
  end

  def assign_department_head
     @department = Department.find(params[:id])
     @user_listing = {}   
     if params[:image].present?
      @user = @department.user
      return render partial: "add_image"
     else
        user_listing=User.where(id: Staff.where(department_id: @department.id,sub_department_id: nil).pluck(:user_id))
        user_listing.each{|h| @user_listing[h.personal_detail.name] = h.id}   
       return render partial: "department_head"
     end 
  end 
   
  def create_department_head
    department = Department.find(params[:department_id])
    user = User.find(params[:user_id])
    user.update(user_type: DEPARTMENT_HEAD, status: true)
    department.update(user_id: user.id)
    if department && user
      flash[:success] = t('.head_created')
      redirect_to departments_path
    else
      flash[:error] = t('.error')
      redirect_to :back
    end
  end 

  def assign_image_head
   if User.find_by_id(params[:id]).update(:avatar => params[:user][:avatar])
      flash[:success] = t('.image_uploaded')
      redirect_to departments_path
   else
      flash[:success] = t('.image_uploaded')
      redirect_to :back
   end 
  end 

   def view_details
      list_branch = Industry.find(params[:id])
     # @tree_sub_depart = Branch.get_branches_tree(list_branch.branches)  #Method on branch model to get tree structure 
     @tree_sub_depart, @industry_name = Department.get_view_details(current_user, list_branch)
    return render partial: "list_details"
   end
   
  def show_department_head
     @department = Department.find(params[:id])
    @user = @department.user
    return render partial: "show"
  end  
   

  def edit_department_head
     @department = Department.find(params[:id])
    @user =     @department.user
    return render partial: "edit_head"
  end 
   
  def update_department_head
    @department = Department.find(params[:department_id])
     user_update = @department.user.update(first_name: params[:first_name], last_name: params[:last_name])
     detail_update = @department.user.personal_detail.update(gender: params[:gender], address_line1: params[:address_line1], address_line2: params[:address_line2], landmark: params[:landmark], city: params[:city], pincode: params[:pincode], state: params[:state], country: params[:country], contact_number: params[:contact_number]) 
           
            if user_update && detail_update 
              flash[:success] = t('.head_updated')
              redirect_to departments_path
            else
              flash[:error] = t('.error')
              redirect_to :back
            end         
  end

   def show_images
     @department = Department.find_by_id(params['id'])
     @images = @department.image.avatars
  return render partial: "show_images"
  end  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_department
      @department = Department.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def department_params
      params.fetch(:department, {})
    end
    
    def admin_branch_tree(list_industry)
        @tree = Industry.get_tree(list_industry) #Methon on Industry model to get tree structure 
    end  
end
