class MenusController < ApplicationController
  
  def index
    @industries={}
    @branches={}
    @departments={}
    @sub_departments={}
    @categories={}
    @industries, @branches, @departments,  @categories, @sub_departments, @industry_id, @branch_id, @department_id, @sub_department_id  = Menu.drop_filter_module(current_user)
    @menus = Menu.get_menu_list(current_user)
    @menus = @menus.flatten
  end

  def new
    @industries={}
    @branches={}
    @departments={}
    @sub_departments={}
    @categories={}
    @industries, @branches, @departments,  @categories, @sub_departments, @industry_id, @branch_id, @department_id, @sub_department_id,@categories  = Menu.drop_filter_module(current_user)
    @menu = Menu.new     
    0.times do 
      category=@menu.categories.build
      0.times {category.items.build}
    end
  end

  def create
    params.permit!
    @menu = Department.find(params[:department_id]).menus.new(params[:menu])
    @menu.save
    redirect_to menus_path
  end

  def edit
    @menu = Menu.find(params[:id])
    @industries={}
    @branches={}
    @departments={}
    @industry_id = @menu.department.branch.industry.id
    @branch_id = @menu.department.branch.id
    @department_id = @menu.department.id    
    @industries, @branches,  @departments = Menu.get_drop_down(current_user.user_type,@industry_id, @branch_id, @department_id )
    0.times do 
      category=@menu.categories.build
      0.times {category.items.build}
    end
  end

  def update
    params.permit!
    @menu = Menu.find(params[:id])
    department_ids = params[:department_id].present?  ? params[:department_id] :  @menu.department_id
    if @menu.update_attributes(params[:menu]) && @menu.update_attributes(department_id: department_ids)
      redirect_to menus_path 
    else
      render "edit"
    end
  end

  def show_menu
    @menu=Menu.find(params[:id])
    return render partial: "menu_listing"
  end

  def get_menu
    @menu=Menu.find(params[:id])
    return render partial: "delete"
  end

  def get_categories
    @categories={}
    @department=Department.find(params[:id])
    if !@department.menus.blank?
      @department.menus.first.categories.each {|h| @categories[h.name]= h.id}
    else
      @categories={}
    end
    return render partial: "category_drop_down"
  end

  def get_items
    @category=Category.find(params[:id])

    return render partial: "item_listing"
  end

  def get_menus
    @menu=Department.find(params[:id]).menus.first
    if @menu.blank?
      render json: {result: ["blank"]}
    else
      render partial: "menu_listing"
    end
  end

  def destroy
    @menu = Menu.find(params[:id])
    if @menu.destroy
      flash[:success] = "Menu deleted Successfully!"
      redirect_to menus_path
    else
      flash[:error] = "Something went wrong!"
        redirect_to :back
    end
  end

  def filter_branch_by_industry
    @branches ={}
    Branch.where(industry_id: params[:id]).each {|h| @branches[h.personal_detail.name]= h.id }
    return render partial: "branch_drop_down"
  end

  def filter_department
    @departments={}
    Department.where(branch_id: params[:id]).each {|h| @departments[h.personal_detail.name]= h.id }
    return render partial: "department_drop_down"
  end

  def show_images
    @item = [] << Item.find_by_id(params[:id])    
    return render partial: "category_images"
  end 

  private
    def menus_params
      params.require(:menu).permit(categories_attributes: [:id, :name, :_destroy],items_attributes: [:id, :name, :price, :_destroy, {avatars: []}])
    end  
 
end
