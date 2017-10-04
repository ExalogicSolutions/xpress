class CreateFeedbackQuestions < ActiveRecord::Migration
  
  def up
    create_table :feedback_questions do |t|
      t.string :question
      t.integer :branch_id
      t.integer :department_id
      t.integer :sub_department_id
      t.boolean :status, :default => false
      t.timestamps
    end
    FeedbackQuestion.create_translation_table! question: :string
  end
  #for Globalization
  def down
    drop_table :feedback_questions
    FeedbackQuestion.drop_translation_table!
  end

end
