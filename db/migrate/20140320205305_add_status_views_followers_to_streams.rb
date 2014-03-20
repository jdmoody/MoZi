class AddStatusViewsFollowersToStreams < ActiveRecord::Migration
  def change
    add_column :streams, :status, :string
    add_column :streams, :views, :integer
    add_column :streams, :follows, :integer
  end
end