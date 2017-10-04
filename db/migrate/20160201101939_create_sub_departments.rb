class CreateSubDepartments < ActiveRecord::Migration
  def change
    create_table :sub_departments do |t|
      t.integer :department_id
      t.integer :user_id

      t.timestamps
    end
  end
end
