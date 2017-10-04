class AddColumnItemIdToFeedbackQuestions < ActiveRecord::Migration
  def change
  	add_column :feedback_questions, :item_id,  :integer
  end
end
