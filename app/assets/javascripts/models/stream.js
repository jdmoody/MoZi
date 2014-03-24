window.MoZi.Models.Stream = Backbone.Model.extend({
  urlRoot: "/api/streams",
  
  parse: function (jsonResp) {
    if (jsonResp.streamFollows) {
      this.userFollows = jsonResp.streamFollows;
      delete jsonResp.streamFollows;
    }
    
    return jsonResp;
  }
})