class UpdateColumnInCustomerAndFeedbackAnswer < ActiveRecord::Migration
  def change
  	remove_column :customers, :branch_id , :integer
  	add_column :customers, :industry_id , :integer
  	add_column :feedback_answers, :branch_id, :integer
  	add_column :feedback_answers, :department_id, :integer
  	add_column :feedback_answers, :sub_department_id, :integer
  	add_column :users, :guest_branch_id, :integer
  end
end
