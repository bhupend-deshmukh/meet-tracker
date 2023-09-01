console.log('yes this working');
// window.addEventListener('message', event => {
//   console.log('event', event);
//   if (event.origin !== window.location.origin) return; // Ensure the message comes from the same origin
//   const receivedMessage = event.data;
//   const receivedMessageElement = document.getElementById('receivedMessage');
//   receivedMessageElement.textContent = `Received: ${receivedMessage}`;
// });



// const pop = document.getElementById("row-0")
// pop.addEventListener('click', (record) => {
//   console.log(record)
//   document.getElementById("popup-handler").style.display = "block";
//   // pop.style.display = "block";

// })

// // function openPopup(rowId, rowData) {
// //   console.log(rowData, '---------------')
// //   document.getElementById("popup-handler").style.display = "block";
// // }

// function closePopup() {
//   console.log('close popup')
//   document.getElementById("popup-handler").style.display = "none";
// }

{/* <button type="button" class="btn cancel" onclick="closePopup()">Close</button> */}

// function msToTime(duration) {
//   console.log('76')
//   var milliseconds = Math.floor((duration % 1000) / 100),
//     seconds = Math.floor((duration / 1000) % 60),
//     minutes = Math.floor((duration / (1000 * 60)) % 60),
//     hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

//   hours = hours < 10 ? "0" + hours : hours;
//   minutes = minutes < 10 ? "0" + minutes : minutes;
//   seconds = seconds < 10 ? "0" + seconds : seconds;

//   return hours + ":" + minutes + ":" + seconds;
// }
