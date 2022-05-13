let count = 0;

const CLIENT_ID = "682265920906-vc0mg2l9hvhv36f566ce2mduev2126lf.apps.googleusercontent.com";
const API_KEY = "AIzaSyBoanGvwf6KXRyvkH_6OJCuhyonksIYvFI";
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar";
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
let tokenClient;
let gapiInited = false;
let gisInited = false;


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

function createEvent() {
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
            
      request.execute(function(resp) {
        console.log('Event created: ' + resp.htmlLink);
        });
    });
  }

  function gapiLoaded() {
    gapi.load('client', intializeGapiClient);
  }

  /**
   * Callback after the API client is loaded. Loads the
   * discovery doc to initialize the API.
   */
  async function intializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
  }

  /**
   * Callback after Google Identity Services are loaded.
   */
  function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '', // defined later
    });
    gisInited = true;
  }

  /**
   *  Sign in the user upon button click.
   */
  function handleAuthClick() {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      await createEvent();
    };

    if (gapi.client.getToken() === null) {
      // Prompt the user to select an Google Account and asked for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({prompt: ''});
    }
  }

  
