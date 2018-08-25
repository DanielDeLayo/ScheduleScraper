http://jsfiddle.net/mvea1mmw/18/();
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
