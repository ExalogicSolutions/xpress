class CreateDepartments < ActiveRecord::Migration
  def change
    create_table :departments do |t|
      t.integer :branch_id
      t.integer :user_id

      t.timestamps
    end
  end
end
