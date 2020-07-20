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
    videoId: 'uR8Mrt1IpXg',
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
    if(event.data == 3){
      var time = event.target.getCurrentTime()
      socket.emit('time', {time:time, start : true})
      event.target.pauseVideo();
    }
    else if(event.data == 2){
      socket.emit('pause', {time:time, start : true})
    }else if(event.data == 1){
      socket.emit('play', {time:time, start : true})
    }
}
setInterval(() => {
    
},100)
//재생
socket.on('play',play => {
    console.log('play')
    player.playVideo()
})
//일시정지
socket.on('pause',pause => {
  console.log('pause')
  player.pauseVideo()
})

//싱크 타임
socket.on('res', time => {
    player.seekTo(time)
})
