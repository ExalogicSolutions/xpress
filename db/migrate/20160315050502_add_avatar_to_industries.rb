class AddAvatarToIndustries < ActiveRecord::Migration
  def change
    add_column :industries, :avatar, :string
  end
end
