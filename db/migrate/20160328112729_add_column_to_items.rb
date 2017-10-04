class AddColumnToItems < ActiveRecord::Migration
  def change
  	 add_column :items, :image_priority, :string
  end
end
