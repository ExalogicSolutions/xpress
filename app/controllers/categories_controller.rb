class CategoriesController < ApplicationController
  def index
  	@image = Image.all
  end

  def new
  	@items = Item.new()
  end
   
  def create
  	redirect_to categories_path
  end	
  def edit
  end

  def destroy
  end
    
  private
end
