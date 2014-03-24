window.MoZi.Views.StreamShow = Backbone.View.extend({
  template: JST["streams/show"],
  
  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
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
               
    var pusher = new Pusher(gon.global.pusher_key);

    if (!this.channel) {
      this.channel = pusher.subscribe(this.path);
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
      $("#chat-display").append($el);
      this.updateScroll();
    }
  },
  
  updateScroll: function () {
    var element = document.getElementById("chat-display");
    element.scrollTop = element.scrollHeight;
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