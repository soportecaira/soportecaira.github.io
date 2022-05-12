

const reservar = () =>{

    let email = document.getElementById("email-book").value;
    let dateTime = "2022-05-28T09:00:00-07:00";

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
        {'email': 'caira@caira.io'},
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
    
    let request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
    });
    
    request.execute(function(event) {
        appendPre('Event created: ' + event.htmlLink);
    });
}

window.onload = function(){
    let book = document.getElementById("book");
    book.addEventListener("click", function(ev){    
        ev.preventDefault();
        handleAuthClick();
    });
}
