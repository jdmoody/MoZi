json.(
  stream,
  :id,
  :name,
  :channel_name,
  :status,
  :views,
  :follows,
  :logo,
  :game,
  :preview,
  :viewers,
)

streamFollows ||= nil
unless streamFollows.nil?
  json.partial!("stream_follows/stream_follow", streamFollows: streamFollows)
end