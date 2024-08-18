function toggleVideo() {
    var video = document.getElementById("video-container");
    video.classList.toggle("collapsed");
}

var tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('existing-iframe-example', {
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        }
    });
}


var checkTimeInterval;
function onPlayerReady(event) {
    checkTimeInterval = setInterval(checkCurrentTime, 1000); // Check every second
}

let lastElement;

function checkCurrentTime() {
    var currentTime = player.getCurrentTime();
    console.log(Math.floor(currentTime));
    var currentElement = document.getElementById("yt_" + Math.floor(currentTime));
    if(currentElement != null) {
        if(lastElement != null) {
            lastElement.classList.remove("active-animation")

        }
        lastElement = currentElement;
        currentElement.classList.add("active-animation");
        currentElement.scrollIntoView({ behavior: "smooth" });
    }
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        checkTimeInterval = setInterval(checkCurrentTime, 1000);
    } else {
        clearInterval(checkTimeInterval);
    }
}
