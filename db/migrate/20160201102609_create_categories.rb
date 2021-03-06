class CreateCategories < ActiveRecord::Migration
  
  def up
    create_table :categories do |t|
      t.string :name
      t.text :description
      t.integer :department_id
      t.timestamps
    end
    Category.create_translation_table! name: :string, description: :text
  end
  #for Globalization
  def down
    drop_table :categories
    Category.drop_translation_table!
  end

end
