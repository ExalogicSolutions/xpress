class PersonalDetail < ActiveRecord::Base

	translates :name, :gender, :address_line1, :address_line2, :landmark, :city, :pincode, :state, :country

	belongs_to :user

	belongs_to :branch

	belongs_to :department

	belongs_to :sub_department

	belongs_to :customer

end
