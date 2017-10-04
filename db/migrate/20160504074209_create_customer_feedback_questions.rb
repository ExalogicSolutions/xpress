class CreateCustomerFeedbackQuestions < ActiveRecord::Migration
  def change
    create_table :customer_feedback_questions do |t|
      t.integer :branch_id
      t.integer :feedback_question_id
      t.timestamps null: false
    end
  end
end
