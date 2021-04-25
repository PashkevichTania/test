// //fullscreen toggle

function fullscreen() {
    let isInFullScreen = (document.fullscreenElement) || (document.webkitFullscreenElement) ||
        (document.mozFullScreenElement) || (document.msFullscreenElement);

    let docElm = document.documentElement;
    if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

//const for inputs
const root = document.querySelector(':root');
const rootStyles = getComputedStyle(root);
const input_blur = document.getElementById('input-blur');
const output_blur = document.getElementById('output-blur');
const input_invert = document.getElementById('input-invert');
const output_invert = document.getElementById('output-invert');
const input_sepia = document.getElementById('input-sepia');
const output_sepia = document.getElementById('output-sepia');
const input_saturate = document.getElementById('input-saturate');
const output_saturate = document.getElementById('output-saturate');
const input_hue = document.getElementById('input-hue');
const output_hue = document.getElementById('output-hue');


// change values functions
function func_blur() {
    output_blur.innerHTML = input_blur.value;
    root.style.setProperty('--blur', input_blur.value + 'px');
    drawCanvas();
}

function func_invert() {
    output_invert.innerHTML = input_invert.value;
    root.style.setProperty('--invert', input_invert.value + '%');
    drawCanvas();
}

function func_sepia() {
    output_sepia.innerHTML = input_sepia.value;
    root.style.setProperty('--sepia', input_sepia.value + '%');
    drawCanvas();
}

function func_saturate() {
    output_saturate.innerHTML = input_saturate.value;
    root.style.setProperty('--saturate', input_saturate.value + '%');
    drawCanvas();
}

function func_hue() {
    output_hue.innerHTML = input_hue.value;
    root.style.setProperty('--hue', input_hue.value + 'deg');
    drawCanvas();
}


//image
let image = new Image();
image.src = 'assets/img/img.jpg';
//canvas
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

image.onload = function (e) {
    canvas.width = image.width;
    canvas.height = image.height;
    drawCanvas();
};

function drawCanvas() {
    ctx.filter = `blur(${input_blur.value}px) invert(${input_invert.value}%) sepia(${input_sepia.value}%) 
    saturate(${input_saturate.value}%) hue-rotate(${input_hue.value}deg)`;
    ctx.drawImage(image, 0, 0, image.width, image.height);
}

//reset
function func_reset() {
    input_blur.value = 0;
    output_blur.value = 0;
    input_invert.value = 0;
    output_invert.value = 0;
    input_sepia.value = 0;
    output_sepia.value = 0;
    input_saturate.value = 100;
    output_saturate.value = 100;
    input_hue.value = 0;
    output_hue.value = 0;

    drawCanvas();
}

//save image
function download() {
    image.setAttribute('crossorigin', 'anonymous');
    let data = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    let link = document.createElement('a');
    link.download = 'my-image.png';
    link.href = data;
    link.click();
}


//upload image
let imageLoader = document.getElementById('btnInput');
imageLoader.addEventListener('change', handleImage, false);

function handleImage(e) {
    let reader = new FileReader();
    reader.onload = function (event) {
        image.onload = function () {
            canvas.width = image.width;
            canvas.height = image.height;
            drawCanvas();
        }
        image.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}


//next picture
let current_index = 1;

function nextImage() {
    imageLoader.value = '';
    let current_date = new Date();
    let hours = current_date.getHours();
    let str_index = String(current_index).padStart(2, '0');

    //for testing
    // console.log('hours='+hours);
    // console.log('current_index='+current_index);
    // console.log(str_index);

    if (hours >= 6 && hours < 12) {
        image.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/morning/${str_index}.jpg`;
    }
    if (hours >= 12 && hours < 18) {
        image.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/day/${str_index}.jpg`;
    }
    if (hours >= 18 && hours <= 23) {
        image.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/${str_index}.jpg`;
    }
    if (hours >= 0 && hours < 6) {
        image.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/night/${str_index}.jpg`;
    }
    current_index++;
    if (current_index > 20) {
        current_index = 1;
    }
}
