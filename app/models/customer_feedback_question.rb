class CustomerFeedbackQuestion < ActiveRecord::Base
	belongs_to :branch
	belongs_to :feedback_question
#	before_create :check_record

	def check_record
	  binding.pry
	end

end
