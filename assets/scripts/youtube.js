var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.onYouTubeIframeAPIReady = function() {
  $(".press-release-carousel .youtube-video").each(function() {
      var player;
      var playerInfoList = [];
      var obj = {};
      var id = $(this).attr("id");
      var videoId = $(this).data("video-id");
      obj = {
          id: id,
          videoId: videoId
      }
      playerInfoList.push(obj);

      if(typeof playerInfoList === 'undefined')
         return; 

      for(var i = 0; i < playerInfoList.length;i++) {
        player = new YT.Player(playerInfoList[i].id, {
           videoId: playerInfoList[i].videoId,
           playerVars: { 
              'autoplay': 0,
              'controls': 0, 
              'rel' : 0,
              'fs' : 0
            }
        });
      }   
  });
}

window.onload = function() {
    parent.iframeLoaded();
}

function iframeLoaded() {
  pressRelease();
}

var player, oldPlayer, myPlayerState, newId, oldId, videoId;

$(".videos-carousel .swiper-container .swiper-slide").each(function() {
  var id = $(this).find(".youtube-video").attr("id");

  $(this).find(".video-thumb[data-player='"+id+"']").click(function() {
      newId = $(this).siblings(".youtube-video").attr("id");
      videoId = $(this).siblings(".youtube-video[id='"+newId+"']").data("video-id");
      oldId = $(".old-player").prop("data-old");
      oldPlayer = YT.get(oldId);
      $(".old-player").prop("data-old", newId);   
      
      player = new YT.Player(newId, {
        videoId: videoId,
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange 
        }
      });

      $(this).fadeOut();
  });

  $(this).find(".play-video").click(function() {
      oldId = $(".old-player").prop("data-old");
      newId = $(this).data("player");
      oldPlayer = YT.get(oldId);
      videoId = $(this).parents(".swiper-slide").find(".youtube-video").data("video-id");
      $(".old-player").prop("data-old", newId);
      if($(this).parents(".swiper-slide").find(".video-thumb").is(":visible")) {
        $(this).parents(".swiper-slide").find(".video-thumb").fadeOut();
        player = new YT.Player(newId, {
          videoId: videoId,
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange 
          }
        });
      }
  })      
});
     
function onPlayerReady() {
  if(myPlayerState == 1 && oldId != newId) {
    oldPlayer.pauseVideo();
    player.playVideo();
  } else {
    player.playVideo();
  }
}

var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {

  }
  myPlayerState = event.data;
}

if (myPlayerState == 1){
  // PAUSE SLIDER
}