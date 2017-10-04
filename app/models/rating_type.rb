class RatingType < ActiveRecord::Base

	translates :name

	has_many :industries

end
