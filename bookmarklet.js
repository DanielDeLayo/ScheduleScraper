javascript:void function(){function e(e,n){for(e=""+e;e.length<n;)e="0"+e;return e}function n(n,t){var r=n.split("/"),a=r[2],l=r[0],s=r[1],i=new Date(a,l,parseInt(s,10)+t);return console.log(parseInt(s,10)+t),console.log(i.getMonth()),console.log(i.getDate()),""+e(i.getFullYear(),4)+e(i.getMonth(),2)+e(i.getDate(),2)}function t(e){var n=e.split("/");return n[2]+n[0]+(parseInt(n[1])-10)}function r(e){return e.includes("PM")%3F(e=e.replace("PM",""),1200>e%26%26(e=parseInt(e)+1200)):(e=e.replace("AM",""),parseInt(e)<1e3%26%26(e="0"+e)),e+="00"}function a(e){for(var n=e.replace("LBR","Library").replace("WESTCAMPUS","").replace("COMPUTER SCI","Old Computer Science").replace("HLL","Hall").split(" "),t="",r=0;r<n.length;r++){t+=n[r].charAt(0).toUpperCase();for(var a=1;a<n[r].length;a++)t+=n[r].charAt(a).toLowerCase();r<n.length-1%26%26(t+=" ")}return t}for(var l=frames[0].document.getElementById("ACE_STDNT_ENRL_SSV2$0").rows,s="BEGIN:VCALENDAR\nPRODID:-//Google Inc//Google Calendar 70.9054//EN\nVERSION:2.0\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\nX-WR-CALNAME:Schedule\nX-WR-TIMEZONE:America/New_York\nX-WR-CALDESC:My Schedule\n",i=1;i<l.length;i+=2)for(var o=l[i].getElementsByTagName("table")[0],c=o.rows[1].getElementsByTagName("table")[0].rows[2].getElementsByTagName("table")[0],g=1;g<c.rows.length;g++){var m=c.rows[g].getElementsByTagName("td"),T=o.rows[0].getElementsByTagName("table")[0].getElementsByTagName("table")[0].rows[0].innerHTML.trim(),E=T.substring(T.indexOf(">")+1).split(" - ")[0];m[2].getElementsByTagName("span")[0].innerHTML.trim().includes("Recitation")%26%26(E+=" REC"),m[2].getElementsByTagName("span")[0].innerHTML.trim().includes("Lab")%26%26(E+=" Lab");for(var u=7,N=m[3].getElementsByTagName("span")[0].innerHTML.trim().split(" - "),p=N[0].substring(0,N[0].length-7).trim(),d="",A=0;A<p.length-1;A+=2){var L=p.substring(A,A+2);L.includes("Th")%3F(d+="TH",u=3>u%3Fu:3):L.includes("Tu")%3F(d+="TU",u=1>u%3Fu:1):L.includes("We")%3F(d+="WE",u=2>u%3Fu:2):L.includes("Mo")%3F(d+="MO",u=0>u%3Fu:0):L.includes("Fr")%3F(d+="FR",u=4>u%3Fu:4):L.includes("Sa")%3F(d+="SA",u=5>u%3Fu:5):L.includes("Su")%3F(d+="SU",u=6>u%3Fu:6):alert("Unrecognized Date:"+L),A<p.length-2%26%26(d+=",")}var S=m[6].getElementsByTagName("span")[0].innerHTML.trim(),R=n(S.split(" - ")[0].trim(),u),C=N[0].replace(":","");C=C.substring(C.length-6).trim(),C=r(C);var I=R+"T"+C,M=N[1].replace(":","");M=r(M);var h=R+"T"+M,D=t(S.split(" - ")[1].trim())+"T010000",y=m[4].getElementsByTagName("span")[0].innerHTML.trim();y=a(y);var B=(new Date).toJSON().slice(0,10).replace(/-/g,""),b=m[5].getElementsByTagName("span")[0].innerHTML.trim();s+="BEGIN:VEVENT\nCLASS:PUBLIC\nDTSTART;TZID=America/New_York:"+I+"\nRRULE:FREQ=WEEKLY;UNTIL="+D+";BYDAY="+d+"\nDTEND;TZID=America/New_York:"+h,s+="\nDTSTAMP:"+B+"\nLOCATION:"+y+"\nDESCRIPTION;LANGUAGE=en-us:"+b+"\nTRANSP:TRANSPARENT\nSUMMARY:"+E.trim()+"\nEND:VEVENT\n"}s+="END:VCALENDAR";var f=document.createElement("a");f.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(s)),f.setAttribute("download","schedule.ics"),f.style.display="none",document.body.appendChild(f),f.click(),document.body.removeChild(f)}();
