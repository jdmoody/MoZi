class AddIndexToChannelNameStreams < ActiveRecord::Migration
  def change
    add_index :streams, :channel_name, unique: true
  end
end
