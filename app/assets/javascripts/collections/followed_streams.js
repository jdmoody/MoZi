window.MoZi.Collections.FollowedStreams = Backbone.Collection.extend({
  model: MoZi.Models.Stream,
  
  url: "api/streams/followed"
});

window.MoZi.Collections.followedStreams = new MoZi.Collections.FollowedStreams();