var myPlayerState, loaded = false;

$.getScript("https://www.youtube.com/iframe_api", function() {
    loadVideos();
});

function loadVideos() {
  var player;
  var playerInfoList = [];
  var obj = {};

  $(".press-release-carousel .youtube-video").each(function() {
    var id = $(this).attr("id");
    var videoId = $(this).data("video-id");
    obj = {
        id: id,
        videoId: videoId
    }
    playerInfoList.push(obj);
  });

  $(".videos-carousel .youtube-video").each(function() {
    var id = $(this).attr("id");
    var videoId = $(this).data("video-id");
    obj = {
        id: id,
        videoId: videoId
    }
    playerInfoList.push(obj);
  });

  window.onYouTubeIframeAPIReady = function() {
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
            },
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
        });
      }   
  }

  function onPlayerReady(event) {
    loaded = true;
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
}

window.onload = function() {
    parent.iframeLoaded();
}


function iframeLoaded() {
  pressRelease();
  videosCarousel();
}



  



