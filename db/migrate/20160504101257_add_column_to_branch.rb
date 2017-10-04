class AddColumnToBranch < ActiveRecord::Migration
  def change
  	add_column :branches, :no_of_fbq,  :integer, default: 10
  end
end
