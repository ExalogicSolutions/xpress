class CreateRatingTypes < ActiveRecord::Migration
  
  def up
    create_table :rating_types do |t|
      t.string :name
      t.timestamps
    end
    RatingType.create_translation_table! name: :string
  end
  #for Globalization
  def down
    drop_table :rating_types
    RatingType.drop_translation_table!
  end

end
