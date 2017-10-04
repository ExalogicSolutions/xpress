class CreateStaffs < ActiveRecord::Migration
  def change
    create_table :staffs do |t|
      t.integer :user_id
      t.integer :industry_id
      t.integer :branch_id
      t.integer :department_id
      t.integer :sub_department_id

      t.timestamps null: false
    end
  end
end
