class CreateIndustries < ActiveRecord::Migration
  
  def up
    create_table :industries do |t|
      t.string :name
      t.string :industry_type
      t.integer :rating_type_id
      t.integer :user_id
      t.timestamps
    end
    Industry.create_translation_table! name: :string
  end
  #for Globalization
  def down
    drop_table :industries
    Industry.drop_translation_table!
  end

end
