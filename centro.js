let count = 0;

let clientId = "682265920906-vc0mg2l9hvhv36f566ce2mduev2126lf.apps.googleusercontent.com";
let APIkey = "AIzaSyBoanGvwf6KXRyvkH_6OJCuhyonksIYvFI";
let scope = "https://www.googleapis.com/auth/calendar";

let cairaInfoCentro = [
    {
        title: "Get students",
        subtitle: "We make you a setup and we decided on a strategy to get students",
        image: "assets/Recursos/+student.png"
    },{
        title: "A new channel",
        subtitle: "Create content to receive leads. Manage a new uptake channel",
        image: "assets/Recursos/conex.png"
    },{
        title: "We share the success",
        subtitle: "Our work gives its fruits. we don't win if you don't win",
        image: "assets/Recursos/Corona.png"
    }
];

const cambiarInfoCentro = () =>{
    let title = document.getElementById("in-title");
    let sub = document.getElementById("in-sub");
    let img = document.getElementById("in-img");

    let n_title = document.createTextNode(cairaInfoCentro[count].title);
    let n_sub = document.createTextNode(cairaInfoCentro[count].subtitle);
    let n_img = cairaInfoCentro[count].image;

    title.removeChild(title.firstChild);
    sub.removeChild(sub.firstChild);
    img.setAttribute("src",n_img);
    title.appendChild(n_title);
    sub.appendChild(n_sub);
}
window.onload=function(){
    let arrows3 = document.getElementsByClassName("arrow3");
  
    arrows3[0].addEventListener("click", function(){
        count--;
        if(count<0){
            count=cairaInfoCentro.length-1;
        }
        cambiarInfoCentro();
    });
    arrows3[1].addEventListener("click", function(){
        count++;
        if(count==cairaInfoCentro.length){
            count=0;
        }
        console.log(cairaInfoCentro.length)
        cambiarInfoCentro();
    });

    let book = document.getElementById("book");
    book.addEventListener("click", function(ev){    
        ev.preventDefault();
        handleAuthClick();
    });
}

function makeApiCall() {
    let email = document.getElementById("email-book").value;
    let dateTime = new Date().toISOString();

    let event = {
        'summary': 'Caira Meeting',
        'location': 'Google meet',
        'description': 'Know more about Caira',
        'start': {
        'dateTime': dateTime,
        'timeZone': 'Spain/Madrid'
        },
        'end': {
        'dateTime': dateTime,
        'timeZone': 'Spain/Madrid'
        },
        'recurrence': [
        'RRULE:FREQ=DAILY;COUNT=2'
        ],
        'attendees': [
        {'email': 'martisanchis2000@gmail.com'},
        {'email': email}
        ],
        'reminders': {
        'useDefault': false,
        'overrides': [
            {'method': 'email', 'minutes': 24 * 60},
            {'method': 'popup', 'minutes': 10}
        ]
        }
    };

    gapi.client.load('calendar', 'v3', function() {
        let request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
        });
            
      request.execute(function(event) {
        alert('Event created: ' + event.htmlLink);
        });
    });
  }

  function handleClientLoad() {
    gapi.client.setApiKey(APIkey);
    window.setTimeout(checkAuth,1);
    checkAuth();
  }
  
  function checkAuth() {
    gapi.auth.authorize({client_id: clientId, scope: scope, immediate: true},handleAuthResult);
  }
  
  function handleAuthResult(authResult) {
    var authorizeButton = document.getElementById('authorize-button');
    if (authResult) {
      makeApiCall();
    } else {
      authorizeButton.style.visibility = '';
      authorizeButton.onclick = handleAuthClick;
     }
  }
  
  function handleAuthClick(event) {
    gapi.auth.authorize({client_id: clientId, scope: scope, immediate: false},handleAuthResult);
    return false;
  }
