class Item < ActiveRecord::Base

	translates :name, :description, :price

	belongs_to :category
    

    	#has_many :images, as: :imageable

   	has_many :images, as: :imageable


   	mount_uploaders :avatars, AvatarUploader

   	has_many :item_feedbacks, dependent: :destroy

   	has_many :feedback_questions
    

    def self.get_fbq_item id
    	Item.includes(:feedback_questions).where(id: id)
      #Item.where(id: id).includes(:feedback_questions).where("feedback_questions.status = true").references(:feedback_questions)
    end

  
end
