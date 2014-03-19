class CreateStreams < ActiveRecord::Migration
  def change
    create_table :streams do |t|
      t.string :name
      t.string :channel_name
      t.string :logo
      t.string :game
      t.integer :viewers
      
      t.timestamps
    end
  end
end
