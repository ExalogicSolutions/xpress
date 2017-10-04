class IndustriesController < ApplicationController
  
  def index
  	@industries = current_user.industries
  end

  def new
  	@rating_types = RatingType.all
  	return render partial: "new"
  end

  def create
  	@industry = Industry.create(name: params[:name], industry_type: params[:industry_type], rating_type_id: params[:rating_type_id].to_i, user_id: current_user.id)
  	if @industry and @industry.create_image(avatars: params[:avatars])
  		flash[:success] = t('.created')
  		redirect_to industries_path
  	else
   		flash[:error] = t('.error')
   		redirect_to :back
  	end
  end

  def edit
  	@rating_types = RatingType.all
  	@industry = Industry.find(params[:id])
  	return render partial: "edit"  	
  end

 def update
    @industry = Industry.find(params[:id])
   @industry.update(name: params[:name], industry_type: params[:industry_type], rating_type_id: params[:rating_type_id].to_i, user_id: current_user.id)
    if @industry and  @industry.image.present? ? @industry.image.update(avatars: params[:avatars]) : @industry.create_image(avatars: params[:avatars])
  		flash[:success] = t('.updated')
      if params['remove_avatar'] == "true" 
          @industry.image.remove_avatars!   
          @industry.image.delete   
      end  
  		redirect_to industries_path
  	else
   		flash[:error] = t('.error')
   		redirect_to :back
  	end
 end

 def destroy
 	@industry = Industry.find(params[:id])
 	if @industry.destroy
 		flash[:success] = t('.deleted')
	 	redirect_to industries_path
	else
		flash[:error] = t('.error')
   		redirect_to :back
	end
 end

 def get_industry
  @industry = Industry.find(params[:id])
 	return render partial: "delete"
 end
 
 def show
   @industry = Industry.find(params[:id])
   @branches = @industry.branches.map{|a| {id: a.id, name: a.personal_detail.name, head_id: a.user.try(:id), head_name: a.user.try(:personal_detail).try(:name), city: a.personal_detail.city, contact_number: a.personal_detail.contact_number, website: a.personal_detail.website, department_count: a.departments.try(:count)}}
 end

 def get_detail
  @industries=current_user.industries.sort
 end
 
 def show_images
  @industry = Industry.find_by_id(params['id'])
  @images = @industry.image.avatars
  return render partial: "show_images"
 end 
end
