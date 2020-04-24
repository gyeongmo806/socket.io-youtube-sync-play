//socket
var socket = io()

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
  
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '720',
    width: '1280',
    videoId: 'bc1bVOfm2IU',
    events: {
      onReady: onPlayerReady,
      onStateChange: onStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}
function onStateChange(event) {
    console.log('change')
    console.log(event.data)
    if(event.data == 2){
      var time = event.target.getCurrentTime()
      socket.emit('time', {time:time, start : true})
      event.target.pauseVideo();
    }
}
setInterval(() => {
    
},100)
socket.on('play',play => {
    console.log('play')
    player.playVideo()
})
socket.on('res', time => {
    player.seekTo(time)
})
