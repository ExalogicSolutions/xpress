class CreateBranches < ActiveRecord::Migration
  def change
    create_table :branches do |t|
      t.integer :industry_id
      t.integer :user_id

      t.timestamps
    end
  end
end
