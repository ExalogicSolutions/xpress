class FeedbackAnswer < ActiveRecord::Base

	translates :comment

	belongs_to :feedback_question

	belongs_to :customer
	
	belongs_to :branch

	belongs_to :department

	belongs_to :sub_department
	
end
