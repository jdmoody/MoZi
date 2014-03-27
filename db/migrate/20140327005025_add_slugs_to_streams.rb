class AddSlugsToStreams < ActiveRecord::Migration
  def change
    add_column :streams, :slug, :string
    add_index :streams, :slug, unique: :true
  end
end
