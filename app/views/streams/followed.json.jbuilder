json.array!(@streams) do |stream|
  json.partial!("streams/stream", stream: stream)
end