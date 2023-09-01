let studentDetails = new Map();
let studentsNameSet = new Set();
let ui_buttons;
let totalClassDuration = 0;
let goingToStop = 0;
let isAttendanceWorking = false;
let buttonClickInd = 0;
let startTime;
let flag = true; // make if false to block non-meraki classes
let meetingDuration;
let profileDetails = []

async function start() {
  startTime = new Date();
  console.log(startTime,'11111111111111111111111');
  startAttendanceTracker = setInterval(attendanceTracker, 1000);
}

// to get the meeting name/title
const getMeetingName = () => {
  const elm = document.querySelector("[data-meeting-title]");
  if (elm && elm.dataset.meetingTitle) {
    return elm.dataset.meetingTitle;
  }
  return document.title;
};

const redirectUrl = "http://127.0.0.1:5500/background.html";
// const redirectUrl = '/home/bhupend/Downloads/meet2/meet-attendance-tracker-messup2/options.html'

let stop = (STOP = () => {
  console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
  let newWindow1 = window.open(redirectUrl);

  clearInterval(startAttendanceTracker);
  let meetingCode = window.location.pathname.substring(1);
  let date = new Date();
  let dd = date.getDate();
  let mm = date.toLocaleString("default", { month: "short" });
  let yyyy = date.getFullYear();
  console.log(dd, mm, yyyy, "date");
  date = dd + "-" + mm + "-" + yyyy;
  let sortedtstudentsNameSet = [];
  let studentsAttendedDuration = [];
  //   let studentsJoiningTime = [];
  let mapKeys = studentDetails.keys();
  console.log(mapKeys, "mapKeys");
  for (i = 0; i < studentDetails.size; i++) {
    let studentName = mapKeys.next().value;
    sortedtstudentsNameSet.push(studentName);
  }
  sortedtstudentsNameSet.sort();
  for (studentName of sortedtstudentsNameSet) {
    let data = studentDetails.get(studentName);
    studentsAttendedDuration.push(data[0].toString());
    // studentsJoiningTime.push(data[1]);
  }
  const end_time = new Date();
  var record = {
    profiles: JSON.stringify(profileDetails),
    attendee_names: JSON.stringify(sortedtstudentsNameSet),
    attendedDurationInSec: JSON.stringify(studentsAttendedDuration),
    meet_code: meetingCode,
    meeting_title: getMeetingName().replace("Meet - ", ""),
    meeting_time: startTime.toISOString(),
    end_time,
  };
  record.meet_duration = meetingDuration;

  console.log(record, "Attendance Record......");
  setTimeout(function () {
    newWindow1.postMessage(JSON.stringify(record), redirectUrl);
  }, 6000);
});

function attendanceTracker() {
  let currentlyPresentStudents = document.getElementsByClassName("zWGUib");
  let profileData = document.getElementsByClassName("KjWwNd");
  for(let profile of profileData) { 
    let url = profile.attributes.src.value
    console.log(url, 'url');
    if(!profileDetails.includes(url)){
      profileDetails.push(url)
    }
    // profileDetails.push(url.attributes.src.value)

  }
  // console.log(currentlyPresentStudents1,'pppppppppppppppppppppppppp');
  // console.log(currentlyPresentStudents.length, "currentlyPresentStudents");
  if (currentlyPresentStudents.length > 0) {
    studentsNameSet.clear();
    let numberOfjoinedStudents = -1;
    try {
      numberOfjoinedStudents = Number(
        document.getElementsByClassName("uGOf1d")[1].innerHTML
      );
      numberOfjoinedStudents =
        Number.isInteger(numberOfjoinedStudents) &&
        numberOfjoinedStudents > 0 &&
        numberOfjoinedStudents != -1
          ? numberOfjoinedStudents
          : currentlyPresentStudents.length;
    } catch (e) {
      numberOfjoinedStudents = currentlyPresentStudents.length;
    }
    for (i = 0; i < numberOfjoinedStudents; i++) {
      try {
        studentsNameSet.add(
          currentlyPresentStudents[i].innerHTML.toUpperCase()
        );
      } catch (exception) {}
    }
    for (studentName of studentsNameSet) {
      if (studentDetails.has(studentName)) {
        let data = studentDetails.get(studentName);
        data[0] += 1;
        studentDetails.set(studentName, data);
      } else {
        let joiningTime = new Date().toLocaleTimeString();
        let currStatus = 1;
        let data = [];
        data.push(currStatus);
        data.push(joiningTime);
        studentDetails.set(studentName, data);
      }
    }
    if (studentsNameSet.size - 1 == -1) {
      goingToStop += 1;
    } else {
      meetingDuration = toTimeFormat(totalClassDuration);
      newButton.innerHTML = toTimeFormat(totalClassDuration);
      totalClassDuration += 1;
      goingToStop = 0;
    }
    if (goingToStop == 2) {
      isAttendanceWorking = false;
      newButton.innerHTML = "Track Attendance";
      newButton.style.border = "2px solid #C5221F";
      goingToStop = 0;
      stop();
    }
  } else {
    try {
      // ui_buttons[buttonClickInd % ui_buttons.length].click();
      ui_buttons[1].click();
      buttonClickInd += 1;
      goingToStop = 0;
    } catch (error) {
      goingToStop += 1;
      if (goingToStop == 2) {
        isAttendanceWorking = false;
        newButton.innerHTML = "Track Attendance";
        newButton.style.border = "2px solid #C5221F";
        goingToStop = 0;
        stop();
      }
    }
  }
}

setInterval(insertButton, 1000);

// Adding button to meet ui
let newButton = document.createElement("button");
newButton.id = "newButton";
newButton.className = "Jyj1Td CkXZgc";
newButton.type = "button";
newButton.innerHTML = "Record";
newButton.style.border = "none";
newButton.style.backgroundColor = "#ea4335";
newButton.style.color = "white";
newButton.style.height = "2.5rem";
newButton.style.width = "4.2rem";
newButton.style.borderRadius = "30px";
newButton.style.marginLeft = "10px";
newButton.style.fontWeight = "bold";

function insertButton() {
  try {
    console.log("inserting button");
    ui_buttons = document.getElementsByClassName("VfPpkd-kBDsod NtU4hc");
    // ui_buttons[1].click();
    document.getElementsByClassName("Tmb7Fd")[0].appendChild(newButton);
    if (!isAttendanceWorking) {
      isAttendanceWorking = true;
      newButton.style.backgroundColor = "#dc2626";
      StartTime = new Date().toLocaleTimeString();
      studentDetails.clear();
      studentsNameSet.clear();
      totalClassDuration = 0;
      start();
    }

    document
      .getElementsByClassName("Gt6sbf QQrMi")
      .addEventListener("click", function () {
        if (isAttendanceWorking) {
          stop();
        }
      });
    clearInterval(tryInsertingButton);
  } catch (error) {}
}

function toTimeFormat(time) {
  const SECONDS_IN_HOUR = 3600;
  const SECONDS_IN_MINUTE = 60;

  let hours = Math.floor(time / SECONDS_IN_HOUR);
  let minutes = Math.floor((time % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
  let seconds = time % SECONDS_IN_MINUTE;

  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");

  return hours === "00"
    ? `${minutes}:${seconds}`
    : `${hours}:${minutes}:${seconds}`;
}
