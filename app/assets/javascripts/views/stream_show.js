window.MoZi.Views.StreamShow = Backbone.View.extend({
  template: JST["streams/show"],
  
  initialize: function (options) {
    var that = this;
    this.router = options.router;
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.router, "route", this.removeChannel);
    $(window).resize( $.throttle(250, that.resizeChat) );
  },
  
  events: {
    "submit form#message": "sendChat",
    "click .follow": "addFollow",
    "click .unfollow": "removeFollow"
  },
  
  render: function () {
    var renderedContent = this.template({
      stream: this.model
    });
    
    this.$el.html(renderedContent);
    
    this.setUpChat();
    
    return this;
  },
  
  setUpChat: function () {
    var showView = this;
    this.path = window.location.hash
               .substring(2)
               .split("/")
               .join("-")
    
    if (!this.channel) {
      this.pusher = new Pusher(gon.global.pusher_key);
      this.channel = this.pusher.subscribe(this.path);
      this.channel.unbind("message");
      this.channel.bind("message", function(data) {
        var $el = $('<p></p>');
        $el.text(data.user + ": " + data.message)
        $("#chat-display").append($el);
        showView.updateScroll();
      });
    } 
  },
  
  sendChat: function (event) {
    event.preventDefault();
    if (!this.recharge) { this.recharge = 0; }
    if ((Date.now() - this.recharge) > 1500) {
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
      $("#chat-display").append($el);
      this.updateScroll();
    }
  },
  
  removeChannel: function () {
    this.pusher.unsubscribe(this.path);
    this.channel = null;
  },
  
  updateScroll: function () {
    var element = document.getElementById("chat-display");
    element.scrollTop = element.scrollHeight;
  },
  
  resizeChat: function () {
    var videoHeight = $(".stream-player").height();
    $("#chat-display").height(videoHeight - 50);
  },
  
  addFollow: function (event) {
    event.preventDefault();
    
    var showView = this;
    
    $("#followsModalLabel").text("Followed");
    $("#followsModalBody").text("Thanks for following " + this.model.get("name") + "!");
    
    $.ajax({
      type: "POST",
      url: "/api/stream/" + $(event.currentTarget).data("id") + "/follow",
      success: function () {
        showView.switchFollowButton();
      }
    });
  },
  
  removeFollow: function (event) {
    event.preventDefault();
    
    var showView = this;
    
    $("#followsModalLabel").text("Unfollow");
    $("#followsModalBody").text("You are no longer following " + this.model.get("name"));
    
    $.ajax({
      type: "DELETE",
      url: "/api/stream/" + $(event.currentTarget).data("id") + "/unfollow",
      success: function () {
        showView.switchFollowButton();
      }
    });
  },
  
  switchFollowButton: function () {
    var $followLink = $(".stream-viewer a")
    if ($followLink.attr("class") === "follow") {
      $followLink.text("Unfollow");
    } else {
      $followLink.text("Follow");
    }
    $followLink.toggleClass("follow unfollow");
    $("#followsModal").modal("show");
    window.setTimeout(function () {
      $("#followsModal").modal("hide");
    }, 1500);
  }
})