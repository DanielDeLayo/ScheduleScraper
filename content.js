function pad(num, len){
	num = "" + num;
  while (num.length < len)
  {
 		num = "0" + num;
  }
	return num;
}

function dateify(sDate, dayOffset) {
  var dates = sDate.split("/");
  var year = dates[2];
  var month = dates[0];
  var day = dates[1];
  var dateObj = new Date(year, month, parseInt(day,10) + dayOffset)
  console.log(parseInt(day,10) + dayOffset);
  console.log(dateObj.getMonth());
  console.log(dateObj.getDate());
  return "" + pad(dateObj.getFullYear(), 4) + pad(dateObj.getMonth(), 2) + pad(dateObj.getDate(), 2);
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
  var temp = sLoc.replace("LBR", "Library").replace("WESTCAMPUS", "").replace("COMPUTER SCI", "Old Computer Science").replace("HLL", "Hall").replace("ONLINE ONLINE", "ONLINE").split(" ");
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


//var rows = document.getElementById("ACE_STDNT_ENRL_SSV2$0").rows;
//above for JS Fiddle
//below for Solar
var rows = frames[0].document.getElementById("ACE_STDNT_ENRL_SSV2$0").rows;

var eventString = "BEGIN:VCALENDAR\nPRODID:-//Google Inc//Google Calendar 70.9054//EN\nVERSION:2.0\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\nX-WR-CALNAME:Schedule\nX-WR-TIMEZONE:America/New_York\nX-WR-CALDESC:My Schedule\n";
for (var i = 1; i < rows.length; i += 2) {
  var table = rows[i].getElementsByTagName("table")[0];
  var tablePre = table.rows[1].getElementsByTagName("table")[0].rows[2].getElementsByTagName("table")[0];
  //alert(tablePre.rows.length)
  for (var k = 0; k < tablePre.rows.length; k++) {
    var infoTable = tablePre.rows[k].getElementsByTagName("td");
    var nameInfo = table.rows[0].getElementsByTagName("table")[0].getElementsByTagName("table")[0].rows[0].innerHTML.trim();
    var className = nameInfo.substring(nameInfo.indexOf(">") + 1).split(" - ")[0];
		  //alert(className)
    if (infoTable[3].getElementsByTagName("span")[0].innerHTML.trim().includes("Recitation"))
      className += " REC";
    if (infoTable[3].getElementsByTagName("span")[0].innerHTML.trim().includes("Lab"))
      className += " Lab";

    var earliestDayOffset = 7; //used to determine start date relative to the first day of class (assumed monday)
    
		var desc = infoTable[4].getElementsByTagName("span")[0].innerText.trim().split(" - ");
    
    if (desc.length < 2)
    	continue
    
    var days = desc[0].substring(0, desc[0].length - 7).trim();
    
    var dayString = "";
    for (var j = 0; j < days.length - 1; j += 2) {
      var day = days.substring(j, j + 2);
      if (day.includes("Th")) {
        dayString += "TH";
        earliestDayOffset = earliestDayOffset < 3 ? earliestDayOffset : 3;
      } else if (day.includes("Tu")) {
        dayString += "TU";
        earliestDayOffset = earliestDayOffset < 1 ? earliestDayOffset : 1;
      } else if (day.includes("We")) {
        dayString += "WE";
        earliestDayOffset = earliestDayOffset < 2 ? earliestDayOffset : 2;
      } else if (day.includes("Mo")) {
        dayString += "MO";
        earliestDayOffset = earliestDayOffset < 0 ? earliestDayOffset : 0;
      } else if (day.includes("Fr")) {
        dayString += "FR";
        earliestDayOffset = earliestDayOffset < 4 ? earliestDayOffset : 4;
      } else if (day.includes("Sa")) {
        dayString += "SA";
        earliestDayOffset = earliestDayOffset < 5 ? earliestDayOffset : 5;
      } else if (day.includes("Su")) {
        dayString += "SU";
        earliestDayOffset = earliestDayOffset < 6 ? earliestDayOffset : 6;
      } else
        alert("Unrecognized Date:" + day);
      if (j < days.length - 2) dayString += ",";
    }

    var dateInfo = infoTable[7].getElementsByTagName("span")[0].innerHTML.trim();
    var date = dateify(dateInfo.split(" - ")[0].trim(), earliestDayOffset);
    //alert("date: " + date);
    var time = desc[0].replace(":", "");
    time = time.substring(time.length - 6).trim();
    time = timeify(time);
    var dString = date + "T" + time;
    var endTime = desc[1].replace(":", "");
    endTime = timeify(endTime);
    var endTimeString = date + "T" + endTime;
    var uString = untilDate(dateInfo.split(" - ")[1].trim()) + "T010000";


    var locString = infoTable[5].getElementsByTagName("span")[0].innerText;
    locString = locationFormat(locString);
    var stamp = new Date().toJSON().slice(0, 10).replace(/-/g, '');
    var profName = infoTable[6].getElementsByTagName("span")[0].innerHTML.trim()
    eventString += "BEGIN:VEVENT\nCLASS:PUBLIC\nDTSTART;TZID=America/New_York:" + dString + "\nRRULE:FREQ=WEEKLY;UNTIL=" + uString + ";BYDAY=" + dayString + "\nDTEND;TZID=America/New_York:" + endTimeString;

    eventString += "\nDTSTAMP:" + stamp + "\nLOCATION:" + locString + "\nDESCRIPTION;LANGUAGE=en-us:" + profName + "\nTRANSP:TRANSPARENT\nSUMMARY:" + className.trim() + "\nEND:VEVENT\n";
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
