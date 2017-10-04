class RemoveDepartmentFromCategory < ActiveRecord::Migration
  def change
  	remove_column :categories, :department_id
  end
end
