class AddPriorityInFeedbackQuestions < ActiveRecord::Migration
  def change
  	add_column :feedback_questions, :priority, :string
  	change_column :feedback_questions, :question, :text
  end
end
