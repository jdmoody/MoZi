window.MoZi.Views.StreamShow = Backbone.View.extend({
  template: JST["streams/show"],
  
  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
  },
  
  events: {
    "submit form#message": "sendChat"
  },
  
  render: function () {
    var renderedContent = this.template({
      stream: this.model.get("stream")
    });
    
    this.$el.html(renderedContent);
    
    this.setUpChat();
    
    return this;
  },
  
  setUpChat: function () {
    this.path = window.location.hash
               .substring(2)
               .split("/")
               .join("-")
               
    var pusher = new Pusher(gon.global.pusher_key);
    if (!this.channel) {
      this.channel = pusher.subscribe(this.path);
      this.channel.bind("message", function(data) {
        var $el = $('<p></p>');
        $el.text(data.user + ": " + data.message)
        $("#display").append($el);
      });
    }  
  },
  
  sendChat: function (event) {
    event.preventDefault();
    if (!this.recharge) { this.recharge = 0; }
    if ((Date.now() - this.recharge) > 2000) {
      this.recharge = Date.now();
      var $chatbox = $(event.currentTarget).find("input#message-box");
      var msg = $chatbox.val();
      $chatbox.val("");

      $.ajax({
        type: "POST",
        url: "/api/chat",
        data: {text: msg, stream: this.path},
        success: function(response) {}
      });
    } else {
      var $el = $('<p></p>');
      $el.text("Slow down, speedy! You can type another message in a second")
      $("#display").append($el);
    }
  }
})