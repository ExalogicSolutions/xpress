class CreateFeedbackAnswers < ActiveRecord::Migration
  
  def up
    create_table :feedback_answers do |t|
      t.integer :answer
      t.text :comment
      t.integer :feedback_question_id
      t.integer :customer_id
      t.timestamps
    end
    FeedbackAnswer.create_translation_table! comment: :text
  end
  #for Globalization
  def down
    drop_table :feedback_answers
    FeedbackAnswer.drop_translation_table!
  end

end
