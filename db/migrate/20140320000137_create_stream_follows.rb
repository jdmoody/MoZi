class CreateStreamFollows < ActiveRecord::Migration
  def change
    create_table :stream_follows do |t|
      t.integer :stream_id
      t.integer :user_id
      
      t.timestamps
    end
  end
end
