class AddPriceToItemTranslation < ActiveRecord::Migration
  def change
  	add_column :item_translations, :price, :decimal , precision: 15, scale: 2
  end
end
