class AddPreviewsToStreams < ActiveRecord::Migration
  def change
    add_column :streams, :preview, :string
  end
end
