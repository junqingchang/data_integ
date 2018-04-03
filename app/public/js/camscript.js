
window.onload = () => {
    let video = document.getElementById('camdemo');
    let verifyBtn = document.getElementById('verify');
    let imageCapture;
  
    navigator.mediaDevices.getUserMedia({ video: true, audio: false, fps: 15 })
      .then(function(stream) {
        video.srcObject = stream;
        video.play();
        let vs = stream.getVideoTracks()[0];
        imageCapture = new ImageCapture(vs);
  
        verifyBtn.onclick = verify;
      })
      .catch(function(err) {
        console.log(err);
        alert('Failed to access webcam.');
      })
  
    function verify(event) {
      imageCapture.takePhoto()
        .then(blob => {
          let reader = new FileReader();
          reader.onloadend = (event) => {
            // TODO: send the information back to the server to verify face
            console.log(reader.result.substr(0, 100));
            // request.open("POST", "face", true);
            // request.setRequestHeader("Content-type", "text/plain");

            let xhttp = new XMLHttpRequest();
            xhttp.open("POST", "face", true);
            xhttp.setRequestHeader("Content-type", "text/plain;charset=utf8");
            xhttp.send(reader.result);
            console.log("request has worked");
          };
          reader.readAsDataURL(blob);
          
        //   window.location.href = '/submitdoc.html';
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
// document.getElementById("savefile").addEventListener('click', function () {
//     if (enabled) {
//         WebCamera.snap(function (data_uri) {
//             // Save the image in a variable
//             var imageBuffer = processBase64Image(data_uri);
//             // Start the save dialog to give a name to the file
//             dialog.showSaveDialog({
//                 filters: [
//                     { name: 'Images', extensions: ['jpg'] },
//                 ]
//             }, function (fileName) {
//                 if (fileName === undefined) {
//                     console.log("You didn't save the file because you exit or didn't give a name");
//                     return;
//                 }   
//                 // If the user gave a name to the file, then save it
//                 // using filesystem writeFile function
//                 fs.writeFile(fileName, imageBuffer.data, function(err){
//                     if (err) {
//                         console.log("Cannot save the file :'( time to cry !");
//                     } else {
//                         alert("Image saved succesfully");
//                     }
//                 });
//             });
//         });
//     } else {
//         console.log("Please enable the camera first to take the snapshot !");
//     }
// }, false);

// document.getElementById("verify").addEventListener('click', function () {
//     dialog.showMessageBox({ message: 'test', buttons: ['OK'] });
// }, false);