class BranchesController < ApplicationController

  before_action :set_branch, only: [:edit, :update, :destroy, :get_branch, :branch_head_form, :show]
  
  def index
  	if current_user.user_type == ADMIN
  		@industries = current_user.industries.map{|a| {id: a.id, name: a.name, industry_type: a.industry_type, branch_count: a.branches.count, branch_head_count: a.branches.where.not(user_id: nil).count, avatar: a.image}}
  	elsif current_user.user_type == BRANCH_HEAD
  		@branch = current_user.branch
  		@departments = @branch.departments
      @head = @branch.user
  	end
  end

  def new
    if params[:industry_id]
      @industry = Industry.find(params[:industry_id])
    end
  	@industries = current_user.industries
  	return render partial: "new"
  end

  def create
  	branch = Branch.create(industry_id: params[:industry_id],no_of_fbq: params[:no_of_fbq])
  	personal_detail = PersonalDetail.create(name: params[:name], address_line1: params[:address_line1], address_line2: params[:address_line2], landmark: params[:landmark], city: params[:city], pincode: params[:pincode], state: params[:state], country: params[:country], contact_number: params[:contact_number], fax_number: params[:fax_number], website: params[:website], branch_id: branch.id)
    if branch && personal_detail
      User.create(first_name: personal_detail.name,last_name: personal_detail.name,user_name: personal_detail.name,user_type: GUEST_USER,email: (personal_detail.name.downcase.gsub(' ',"")+"@"+branch.industry.name.downcase.gsub(' ',"")+".com").downcase,password: "password",status: true,guest_branch_id: branch.id)
  		flash[:success] = t('.created')
      if params[:avatars].present?
        branch.create_image(avatars: params[:avatars])
      end  
  		redirect_to branches_path
  	else
   		flash[:error] = t('.error')
   		redirect_to :back
  	end
  end

  def show
    return render partial: "show"
  end

  def edit
  	@industries = current_user.industries
  	return render partial: "edit"
  end

 def update
 	  @branch.update(industry_id: params[:industry_id],no_of_fbq: params[:no_of_fbq])
  	personal_detail = PersonalDetail.find_by(branch_id: @branch.id).update(name: params[:name], address_line1: params[:address_line1], address_line2: params[:address_line2], landmark: params[:landmark], city: params[:city], pincode: params[:pincode], state: params[:state], country: params[:country], contact_number: params[:contact_number], fax_number: params[:fax_number], website: params[:website], branch_id: @branch.id)
  	if @branch && personal_detail && @branch.image.present? ? @branch.image.update(avatars: params[:avatars]) : @branch.create_image(avatars: params[:avatars])
  		flash[:success] = t('.updated')
       if params['remove_avatar'] == "true" 
          @branch.image.remove_avatars!   
          @branch.image.delete   
      end  
  		redirect_to branches_path
  	else
   		flash[:error] = t('.error')
   		redirect_to :back
  	end
 end

 def destroy
 	if @branch.destroy
 		flash[:success] = t('.deleted')
	 	redirect_to branches_path
	else
		flash[:error] = t('.error')
   		redirect_to :back
	end
 end

 def get_branch
 	return render partial: "delete"
 end

 def list
 	@industry = Industry.find(params[:id])
 	@branches = @industry.branches.map{|a| {id: a.id, name: a.personal_detail.name,head_id: a.user.try(:id), head_name: a.user.try(:personal_detail).try(:name), city: a.personal_detail.city, contact_number: a.personal_detail.contact_number, website: a.personal_detail.website, head_ph_no: a.user.try(:personal_detail).try(:contact_number), head_email: a.user.try(:email)}}
   	return render partial: "list"
 end

 def branch_head_form
    if params[:image]
      @user = @branch.user
      return render partial: "add_image"
    else
      @user_listing = {}
      user_listing = User.where(id: Staff.where(department_id: nil, branch_id: @branch.id).pluck(:user_id))
      user_listing.each{|h| @user_listing[h.personal_detail.name] = h.id}
      return render partial: "create_branch_head"
    end
 end

 def create_branch_head
    branch = Branch.find(params[:branch_id])
    user = User.find(params[:user_id])
    user.update(user_type:  BRANCH_HEAD, status: true)
    branch.update(user_id: user.id) 	
 	if branch && user
  		flash[:success] = t('.head_created')
  		redirect_to branches_path
  	else
   		flash[:error] = t('.error')
   		redirect_to :back
  	end
 end

 def show_branch_head
 	@head = User.find(params[:head_id])
 	return render partial: "show_branch_head"
 end

 def branch_head_edit_form
 	@head = User.find(params[:head_id])
 	return render partial: "edit_branch_head"
 end

 def edit_branch_head
 	@head = User.find(params[:head_id])
 	@head.update(first_name: params[:first_name], last_name: params[:last_name], user_name: params[:user_name], user_type: BRANCH_HEAD, email: params[:email], password: params[:password])
 	personal_detail = PersonalDetail.find_by(user_id: @head.id).update(name: (@head.first_name+" "+@head.last_name).strip, gender: params[:gender], address_line1: params[:address_line1], address_line2: params[:address_line2], landmark: params[:landmark], city: params[:city], pincode: params[:pincode], state: params[:state], country: params[:country], contact_number: params[:contact_number], user_id: @head.id)
 	if @head && personal_detail
  		flash[:success] = t('.head_updated')
  		redirect_to branches_path
  	else
   		flash[:error] = t('.error')
   		redirect_to :back
  	end
 end

 def assign_image_head
   if User.find_by_id(params[:id]).update(:avatar => params[:user][:avatar])
      flash[:success] = t('.image_uploaded')
      redirect_to branches_path
   else
      flash[:success] = t('.image_uploaded')
      redirect_to :back
   end 
  end
  
  def show_images
     @branch = Branch.find_by_id(params['id'])
  @images = @branch.image.avatars
  return render partial: "show_images"
  end  
 private

 	def set_branch
 		@branch = Branch.find(params[:id])
 	end

end
