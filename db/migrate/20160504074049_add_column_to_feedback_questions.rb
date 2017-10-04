class AddColumnToFeedbackQuestions < ActiveRecord::Migration
  def change
  	add_column :feedback_questions, :fq_enabled,  :boolean, default: false
  	# add_column :customer_feedback_questions, :branch_id,  :integer
  end
end
