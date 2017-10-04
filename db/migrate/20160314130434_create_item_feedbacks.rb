class CreateItemFeedbacks < ActiveRecord::Migration
  def change
    create_table :item_feedbacks do |t|
      t.integer :customer_id
      t.integer :item_id
      t.boolean :response
      t.text :comment

      t.timestamps null: false
    end
  end
end
