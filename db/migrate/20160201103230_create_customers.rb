class CreateCustomers < ActiveRecord::Migration
  def change
    create_table :customers do |t|
      t.string :email
      t.integer :branch_id

      t.timestamps
    end
  end
end
