
navigator.getUserMedia = navigator.getUserMedia ||
                        navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia;
                    
let constraints = { audio: false, video: true };

let start = document.getElementById("start");
let snapshot = document.getElementById("snapshot");
let filter = document.getElementById("filter");
let video = document.getElementById("video");
let canvas = document.getElementById("canvas");

let filters  = ['blur', 'brightness', 'contrast', 'grayscale',
                'hue', 'invert', 'saturate', 'sepia'];

start.addEventListener('click', function() {
    console.log("clicked");
    navigator.getUserMedia(constraints, success, error);
});

function success(stream) {
    // hide start button on stream success
    start.getElementsByClassName.display = 'none';

    //show snapshot button
    snapshot.style.display = 'block';

    //show filter button
    filter.style.display = 'block';

    if(window.URL) {
        video.src = window.URL.createObjectURL(URL);
    } else {
        video.src = stream;
    }
}

function error(e) {
    console.log('navigator.getUserMedia error: ', e);
}

// css filters
filter.addEventListener('click', function() {
    let index = (filter.indexOf(canvas.className) + 1) % filters.length;
    video.className = filters[index];
    canvas.className = filters[index];
});

// take a snapshot of the local video stream
snapshot.addEventListener('click', function() {
    canvas.width = 360;
    canvas.height = 270;
    canvas.getContext('2d'.drawImage(video, 0,0, canvas.width, canvas.height));
});