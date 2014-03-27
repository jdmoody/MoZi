class AddIndecesToGameNameAndStreamGame < ActiveRecord::Migration
  def change
    add_index :games, :name
    add_index :streams, :game
  end
end
