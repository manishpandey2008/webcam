startSream();
var videoArea = document.querySelector("video");

var takeProfileImageButton = document.querySelector("#takeProfileImage");
var videoTag = document.querySelector("#videoTag");
var pictureProfileCanvas = document.querySelector("#pictureProfileCanvas");
var profilePictureOutput = document.querySelector("#profilePictureOutput");

var finalImage = document.querySelector("#finalImage");

let allColorCollection=document.querySelector("#allColorCollection");
allColorCollection.setAttribute('hidden',true)

let functionCollection=document.querySelector("#functionCollection");
functionCollection.removeAttribute('hidden')


var width = 240;
var height = 0;
var streaming = false;
var imageColorClass='hue-rotate2-scale_filter'
var brightness=0.8

videoTag.style.filter='brightness('+brightness+')';

function chageColor(imageCollor){
  videoArea.style.removeProperty('filter');
  videoArea.className=imageCollor
  profilePictureOutput.style.removeProperty('filter');
  profilePictureOutput.className=imageCollor
}

takeProfileImageButton.addEventListener( "click",function (ev) {
    finalImage.style.display = "inline";
    takePicture();
    ev.preventDefault();
  },false);

videoTag.addEventListener("canplay",function (ev) {
    if (!streaming) {
      height = videoTag.videoHeight / (videoTag.videoWidth / width);
    }
    if (isNaN(height)) {
      height = width / (4 / 3);
    }
  },false);

function takePicture() {
  var context = pictureProfileCanvas.getContext("2d");
  if (width && height) {
    pictureProfileCanvas.width = width;
    pictureProfileCanvas.height = height;
    context.drawImage(videoTag, 0, 0, width, height);

    var data = pictureProfileCanvas.toDataURL("image/png");
    profilePictureOutput.setAttribute("src", data);
  }
}

function startSream() {
  navigator.getUserMedia =navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  var constraints = {
    audio: false,
    video: true,
  };
  navigator.getUserMedia(constraints, onSuccess, onError);
}

function onSuccess(stream) {
  console.log("Success !! no we have steam you video");
  videoArea.srcObject = stream;
  videoArea.className=imageColorClass
  profilePictureOutput.className=imageColorClass
  videoArea.play();
}

function onError(err) {
  console.log("Error with getUserMedia is: ", err);
}

function shaowAllColor(){
  functionCollection.setAttribute('hidden',true)
  allColorCollection.removeAttribute('hidden')
}

function hideAllColor(){
  functionCollection.removeAttribute('hidden')
  allColorCollection.setAttribute('hidden',true)
}

function increaseBight(){
  brightness=brightness+0.1
  videoTag.style.filter='brightness('+brightness+')';
  profilePictureOutput.style.filter='brightness('+brightness+')';
}

function decreaseBrightness(){
  brightness=brightness-0.1
  videoTag.style.filter='brightness('+brightness+')';
  profilePictureOutput.style.filter='brightness('+brightness+')';
}