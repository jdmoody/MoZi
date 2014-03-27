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
    this.resizeChat();
    
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
      var that = this;
      this.channel.bind("message", this.writeMessage.bind(that));
    }
    $("#chat-display").append("<b>MoZiBot</b>: Welcome to " + this.model.get("name") + "'s Stream Chat!<br />") 
    $("#chat-display").append("Type '!emotes' to see a list of chat emotes.")
  },
  
  writeMessage: function (data) {
    var $el = $('<p></p>');
    var $user = $('<b></b>').text(data.user);
    var that = this;
    
    if (data.message === "!emotes") {
      $el = $('<p></p>').append("<b>MoZiBot</b>: List of Faces: <br />");
      $el.append(that.getFace("Kappa") + " = Kappa <br />")
      $el.append(that.getFace("FrankerZ") + " = FrankerZ <br />");
      $el.append(that.getFace("BibleThump") + " = BibleThump <br />");
      $el.append(that.getFace("Keepo") + " = Keepo <br />");
      $el.append(that.getFace("ResidentSleeper") + " = ResidentSleeper<br />");
      $el.append(that.getFace("WhatCost") + " = WhatCost<br />");
      $el.append(that.getFace("TableFlip") + " = TableFlip<br />");
      $el.append("** All face emotes are property of Justin.tv, Inc. **")
    } else {
      var faces = ["Kappa", "WhatCost", "TableFlip", "SnipSnip", "FrankerZ",
                   "BibleThump", "ResidentSleeper", "Keepo"];
      $el.append(": ");
      var messageWords = data.message.split(" ");
      _.each(messageWords, function (word) {
        if (faces.indexOf(word) !== -1) {
          $el.append(" " + that.getFace(word))
        } else {
          $word = $("<span></span>").text(" " + word);
          $el.append($word);
        }
      });
      
      $el.prepend($user);
    }
    $("#chat-display").append($el);
    this.updateScroll();
  },
  
  getFace: function (string) {
    if (string === "Kappa") {
      return $('#Kappa').html();
    } else if (string === "FrankerZ") {
      return $('#FrankerZ').html();
    } else if (string === "BibleThump") {
      return $('#BibleThump').html();
    } else if (string === "ResidentSleeper") {
      return $('#ResidentSleeper').html();
    } else if (string === "Keepo") {
      return $('#Keepo').html();
    } else if (string === "WhatCost") {
      return "ლ(ಠ益ಠლ)﻿";
    } else if (string === "TableFlip") {
      return "(╯°□°）╯︵ ┻━┻";
    } else if (string === "SnipSnip") {
      return "( ＾◡＾)っ✂╰⋃╯";
    }
  },
  
  sendChat: function (event) {
    event.preventDefault();
    if (!this.recharge) { this.recharge = 0; }
    if ((Date.now() - this.recharge) > 1500) {
      this.recharge = Date.now();
      var $chatbox = $(event.currentTarget).find("textarea#message-box");
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
    $("#chat-display").height(videoHeight - 100);
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
    
    $("#followsModalLabel").text("Unfollowed");
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