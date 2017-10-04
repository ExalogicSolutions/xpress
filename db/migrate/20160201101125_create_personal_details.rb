class CreatePersonalDetails < ActiveRecord::Migration
  
  def up
    create_table :personal_details do |t|
      t.string :name
      t.string :gender
      t.string :address_line1
      t.string :address_line2
      t.string :landmark
      t.string :city
      t.string :pincode
      t.string :state
      t.string :country
      t.string :contact_number
      t.string :fax_number
      t.string :website
      t.integer :user_id
      t.integer :customer_id
      t.integer :branch_id
      t.integer :department_id
      t.integer :sub_department_id
      t.timestamps
    end
    PersonalDetail.create_translation_table! name: :string, gender: :string, address_line1: :string, 
        address_line2: :string, landmark: :string, city: :string, pincode: :string, state: :string, 
        country: :string
  end
  #for Globalization
  def down
    drop_table :personal_details
    PersonalDetail.drop_translation_table!
  end

end