document.addEventListener('DOMContentLoaded', () => {
    const videoElement = document.getElementById('cameraStream');
    const captureButton = document.getElementById('captureButton');
    let mediaStream;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                // Assign the camera stream to the video element
                videoElement.srcObject = stream;
                mediaStream = stream;
            })
            .catch((error) => {
                console.error('Error accessing camera:', error);
            });

        captureButton.addEventListener('click', () => {
            if (mediaStream) {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                // Set canvas dimensions to match the video stream
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;

                // Draw the current video frame onto the canvas
                context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

                // Convert the canvas content to a data URL
                const capturedImage = canvas.toDataURL('image/png');

                // Create an anchor element to trigger the download
                const downloadLink = document.createElement('a');
                downloadLink.href = capturedImage;
                downloadLink.download = 'captured_image.png';
                downloadLink.click();
            } else {
                console.error('Camera stream not available.');
            }
        });
    } else {
        console.error('getUserMedia is not supported in this browser');
    }
});