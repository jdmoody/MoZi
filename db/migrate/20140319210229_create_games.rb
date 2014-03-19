class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :name
      t.string :logo
      t.string :box
      t.integer :viewers

      t.timestamps
    end
  end
end
