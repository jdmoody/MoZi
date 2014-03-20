# == Schema Information
#
# Table name: stream_follows
#
#  id         :integer          not null, primary key
#  stream_id  :integer
#  user_id    :integer
#  created_at :datetime
#  updated_at :datetime
#

class StreamFollow < ActiveRecord::Base
  belongs_to :stream
  belongs_to :user
end
