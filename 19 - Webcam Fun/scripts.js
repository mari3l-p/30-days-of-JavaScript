const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const redBtn = document.getElementById('red-btn');
const rgbBtn = document.getElementById('rgb-btn');
const drawBtn = document.getElementById('draw-btn');

function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            console.log(localMediaStream)
            video.srcObject = localMediaStream;
            video.play()
        })
        .catch(error => {
            console.log('You denied the use of a web cam!!!', error)
        })
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    let currentEffect = null;
    redBtn.addEventListener('click', () => {
      currentEffect = 'red';
    });
    rgbBtn.addEventListener('click', () => {
      currentEffect = 'rgb';
    });
    drawBtn.addEventListener('click', () => {
      currentEffect = 'draw';
    });


    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);

        let pixels = ctx.getImageData(0, 0, width, height);

        if (currentEffect === 'red') {
        pixels = redEffect(pixels);
      } else if (currentEffect === 'rgb') {
        pixels = rgbEffect(pixels);
      } else if (currentEffect === 'draw') {
        pixels = drawEffect(pixels);
      }
        // pixels = redEffect(pixels);

        // pixels = rgbEffect(pixels)
        // pixels = greenScreen(pixels)

        // pixels = drawEffect(pixels)
        ctx.putImageData(pixels, 0, 0)
    }, 16);
    
}


function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    // take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'cool_photo');
    link.innerHTML = `<img src="${data}" alt="cool photos">`;
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

function rgbEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 100] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 200] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}


function drawEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        if (pixels.data[i] > 120) {
          pixels.data[i] = 255;
          pixels.data[i + 1] = 255;
          pixels.data[i + 2] = 255;
        } else {
          pixels.data[i] = 50;
          pixels.data[i + 1] = 50;
          pixels.data[i + 2] = 50;
        }
    }

    return pixels;
}


getVideo()


video.addEventListener('canplay', paintToCanvas)