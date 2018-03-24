alert("starting");
var rows = document.getElementsByTagName("table")[0].rows;
var eventString = "BEGIN:VCALENDAR\nPRODID:-//Google Inc//Google Calendar 70.9054//EN\nVERSION:2.0\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\nX-WR-CALNAME:Schedule\nX-WR-TIMEZONE:America/New_York\nX-WR-CALDESC:My Schedule\n";

for (var i = 1; i < rows.length; i++) {
alert(i);
  var className = rows[i].cells[3].innerHTML.trim() + " " + rows[i].cells[4].innerHTML.trim() + " " + rows[i].cells[5].innerHTML.trim().replace("LEC", "").replace("SEM", "");
  var date = new Date().toJSON().slice(0, 10).replace(/-/g, '');
  var desc = rows[i].cells[7].innerHTML.trim().split(" - ");
  var time = desc[0].replace(":", "");
  time = time.substring(time.length - 6).trim();
  if (time.includes("pm")) {
    time = time.replace("pm", "");
    if (time < 1200) time = parseInt(time) + 1200;
  } else {
    time = time.replace("am", "");
    if (parseInt(time) < 1000) {
      time = "0" + time;
    }
  }
  time += "00";
  var dString = date + "T" + time;
  var endTime = desc[1].replace(":", "");
  if (endTime.includes("pm")) {
    endTime = endTime.replace("pm", "");
    if (endTime < 1200) endTime = parseInt(endTime) + 1200;
  } else {
    endTime = endTime.replace("am", "");
    if (parseInt(endTime) < 1000) {
      endTime = "0" + endTime;
    }
  }
  endTime += "00";
  var endTimeString = date + "T" + endTime;
  var eString = "20180506T010000";
  var days = desc[0].split("</span");
  var dayString = "";
  for (var j = 0; j < days.length - 1; j++) {
    var day = days[j].substring(days[j].length - 2);
    if (day.includes("Th"))
      dayString += "TH";
    else if (day.includes("T"))
      dayString += "TU";
    else if (day.includes("W"))
      dayString += "WE";
    else if (day.includes("M"))
      dayString += "MO";
    else if (day.includes("F"))
      dayString += "FR";
    else if (day.includes("Sa"))
      dayString += "SA";
    else if (day.includes("Su"))
      dayString += "SU";
    else
      alert("Unrecognized Date:" + day);
    if (j < days.length - 2) dayString += ",";
  }
  var locString = desc[2].substring(0, desc[2].length - 6);
  var stamp = dString;
  var profName = rows[i].cells[6].innerHTML.trim().substring(5, rows[i].cells[6].innerHTML.trim().length - 6);
  eventString += "BEGIN:VEVENT\nCLASS:PUBLIC\nDTSTART;TZID=America/New_York:" + dString + "\nRRULE:FREQ=WEEKLY;UNTIL=" + eString + ";BYDAY=" + dayString + "\nDTEND;TZID=America/New_York:" + endTimeString + "\nEXDATE;TZID=America/New_York:" + dString + "\nDTSTAMP:" + stamp + "\nLOCATION:" + locString + "\nDESCRIPTION;LANGUAGE=en-us:" + profName + "\nTRANSP:TRANSPARENT\nSUMMARY:" + className.trim() + "\nEND:VEVENT\n";
}
eventString += "END:VCALENDAR"
var element = document.createElement('a');
element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(eventString));
element.setAttribute('download', "schedule.ics");

element.style.display = 'none';
document.body.appendChild(element);

element.click();

document.body.removeChild(element);
