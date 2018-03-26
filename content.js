function dateify(sDate) {
  var dates = sDate.split("/");
  return dates[2] + dates[0] + dates[1];
}

function untilDate(sDate) {
  var dates = sDate.split("/");
  return dates[2] + dates[0] + (parseInt(dates[1]) - 10);
}

function timeify(sTime) {
  if (sTime.includes("PM")) {
    sTime = sTime.replace("PM", "");
    if (sTime < 1200) sTime = parseInt(sTime) + 1200;
  } else {
    sTime = sTime.replace("AM", "");
    if (parseInt(sTime) < 1000) {
      sTime = "0" + sTime;
    }
  }
  sTime += "00";
  return sTime;
}

function locationFormat(sLoc) {
  var temp = sLoc.replace("LBR", "Library").replace("WESTCAMPUS", "").replace("COMPUTER SCI", "Old Computer Science").replace("HLL", "Hall").split(" ");
  var s = "";
  for (var i = 0; i < temp.length; i++) {
    s += temp[i].charAt(0).toUpperCase();
    for (var j = 1; j < temp[i].length; j++)
      s += temp[i].charAt(j).toLowerCase();
    if (i < temp.length - 1)
      s += " ";
  }
  return s;
}


//var rows = document.getElementsByTagName("table")[0].rows; 
//above for JS Fiddle
//below for Solar
var rows = frames[0].document.getElementById("ACE_STDNT_ENRL_SSV2$0").rows;

var eventString = "BEGIN:VCALENDAR\nPRODID:-//Google Inc//Google Calendar 70.9054//EN\nVERSION:2.0\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\nX-WR-CALNAME:Schedule\nX-WR-TIMEZONE:America/New_York\nX-WR-CALDESC:My Schedule\n";
for (var i = 1; i < rows.length; i += 2) {
  var table = rows[i].getElementsByTagName("table")[0];
  var tablePre = table.rows[1].getElementsByTagName("table")[0].rows[2].getElementsByTagName("table")[0];
  for (var k = 1; k < tablePre.rows.length; k++) {
    var infoTable = tablePre.rows[k].getElementsByTagName("td");
    var nameInfo = table.rows[0].getElementsByTagName("table")[0].getElementsByTagName("table")[0].rows[0].innerHTML.trim();
    var className = nameInfo.substring(nameInfo.indexOf(">") + 1).split(" - ")[0];

    if (infoTable[2].getElementsByTagName("span")[0].innerHTML.trim().includes("Recitation"))
      className += " REC";
    if (infoTable[2].getElementsByTagName("span")[0].innerHTML.trim().includes("Lab"))
      className += " Lab";
    var dateInfo = infoTable[6].getElementsByTagName("span")[0].innerHTML.trim();
    var date = dateify(dateInfo.split(" - ")[0].trim());
    var desc = infoTable[3].getElementsByTagName("span")[0].innerHTML.trim().split(" - ");
    var time = desc[0].replace(":", "");
    time = time.substring(time.length - 6).trim();
    time = timeify(time);
    var dString = date + "T" + time;
    var endTime = desc[1].replace(":", "");
    endTime = timeify(endTime);
    var endTimeString = date + "T" + endTime;
    var uString = untilDate(dateInfo.split(" - ")[1].trim()) + "T010000";
    var days = desc[0].substring(0, desc[0].length - 7).trim();
    var dayString = "";
    for (var j = 0; j < days.length - 1; j += 2) {
      var day = days.substring(j, j + 2);
      if (day.includes("Th"))
        dayString += "TH";
      else if (day.includes("Tu"))
        dayString += "TU";
      else if (day.includes("We"))
        dayString += "WE";
      else if (day.includes("Mo"))
        dayString += "MO";
      else if (day.includes("Fr"))
        dayString += "FR";
      else if (day.includes("Sa"))
        dayString += "SA";
      else if (day.includes("Su"))
        dayString += "SU";
      else
        alert("Unrecognized Date:" + day);
      if (j < days.length - 2) dayString += ",";
    }
    var locString = infoTable[4].getElementsByTagName("span")[0].innerHTML.trim();
    locString = locationFormat(locString);
    var stamp = new Date().toJSON().slice(0, 10).replace(/-/g, '');
    var profName = infoTable[5].getElementsByTagName("span")[0].innerHTML.trim()
    eventString += "BEGIN:VEVENT\nCLASS:PUBLIC\nDTSTART;TZID=America/New_York:" + dString + "\nRRULE:FREQ=WEEKLY;UNTIL=" + uString + ";BYDAY=" + dayString + "\nDTEND;TZID=America/New_York:" + endTimeString + "\nEXDATE;TZID=America/New_York:" + dString + "\nDTSTAMP:" + stamp + "\nLOCATION:" + locString + "\nDESCRIPTION;LANGUAGE=en-us:" + profName + "\nTRANSP:TRANSPARENT\nSUMMARY:" + className.trim() + "\nEND:VEVENT\n";
  }
}
eventString += "END:VCALENDAR"
var element = document.createElement('a');
element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(eventString));
element.setAttribute('download', "schedule.ics");

element.style.display = 'none';
document.body.appendChild(element);

element.click();

document.body.removeChild(element);
