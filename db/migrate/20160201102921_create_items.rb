class CreateItems < ActiveRecord::Migration
  
  def up
    create_table :items do |t|
      t.string :name
      t.text :description
      t.decimal :price, precision: 15, scale: 2
      t.integer :category_id
      t.timestamps
    end
    Item.create_translation_table! name: :string, description: :text
  end
  #for Globalization
  def down
    drop_table :items
    Item.drop_translation_table!
  end

end
