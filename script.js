//selector
const screenshareElement = document.getElementById("screen-share");
const webcamElement = document.getElementById("webcam");
const startBtn = document.getElementById("start-button");
const mediaBtn = document.getElementById("media-button");
const webcamBtn = document.getElementById("webcam-button");

//Global
let streamPIP = false;
let screenShare = false;

//Enable webcam
const enableWebcam = async (constraints) => {
  const webcamStream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: { min: 1024, ideal: 1280, max: 1920 },
      height: { min: 576, ideal: 720, max: 1080 },
    },
  });
  webcamElement.srcObject = webcamStream;
  webcamElement.onloadedmetadata = () => webcamElement.play();
  webcamElement.hidden = false;
};

// Select media
const selectMediaStream = async () => {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    screenshareElement.srcObject = mediaStream;
    screenshareElement.onloadedmetadata = () => screenshareElement.play();
    screenshareElement.hidden = false;
    screenShare = true;
    streamState(mediaStream);
  } catch (err) {
    alert(err);
  }
};

//Request PIP
const requestPIP = async () => {
  if (screenShare) {
    const PIP = await screenshareElement.requestPictureInPicture();
    screenshareElement.hidden = !!PIP;
    streamPIP = true;
    screenshareElement.addEventListener("leavepictureinpicture", () => {
      screenshareElement.hidden = false;
      streamPIP = false;
    });
  } else {
    alert('Click on "Media" to select a stream!');
  }
};

//event listeners
mediaBtn.addEventListener("click", selectMediaStream);
startBtn.addEventListener("click", requestPIP);
webcamBtn.addEventListener("click", enableWebcam);

const streamState = (stream) => {
  stream.getVideoTracks()[0].onended = () => {
    screenshareElement.hidden = true;
    if (streamPIP) {
      document.exitPictureInPicture();
    }
    streamPIP = false;
    screenShare = false;
  };
};
