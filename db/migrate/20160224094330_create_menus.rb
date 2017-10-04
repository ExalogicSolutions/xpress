class CreateMenus < ActiveRecord::Migration
  def change
    create_table :menus do |t|
      t.integer :department_id

      t.timestamps null: false
    end
  end
end
