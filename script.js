//selector

const videoElement = document.getElementById('video')
const startBtn = document.getElementById('start-button')
const mediaBtn = document.getElementById('media-button')

//Global
let streamPIP = false;
let screenShare = false;

// Select media

const selectMediaStream = async () => {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia()
        videoElement.srcObject = mediaStream
        videoElement.onloadedmetadata = () => videoElement.play()
        videoElement.hidden = false
        screenShare = true
        streamState(mediaStream)
    } catch (err) {
        alert(err)
    }
}

//Request PIP

const requestPIP = async () => {
    if (screenShare) {
        const PIP = await videoElement.requestPictureInPicture()
        videoElement.hidden = !!PIP;
        streamPIP = true;
        videoElement.addEventListener('leavepictureinpicture', () => {
            videoElement.hidden = false
        })

    } else {
        alert('Click on "Media" to select a stream!')
    }


}

//event listeners
mediaBtn.addEventListener('click', selectMediaStream)
startBtn.addEventListener('click', requestPIP)


const streamState = (stream) => {
    stream.getVideoTracks()[0].onended = () => {
        videoElement.hidden = true
        if (streamPIP) {
            document.exitPictureInPicture()
        }
        streamPIP = false
        screenShare = false
    };
}
