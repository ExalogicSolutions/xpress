class AddColumnToCategory < ActiveRecord::Migration
  def change
  	add_column :categories, :menu_id ,:integer
  end
end
