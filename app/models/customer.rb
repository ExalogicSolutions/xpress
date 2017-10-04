class Customer < ActiveRecord::Base

	has_one :personal_detail, dependent: :destroy

	belongs_to :industry

	has_many :feedback_answers, dependent: :destroy

	has_many :item_feedbacks, dependent: :destroy

end
