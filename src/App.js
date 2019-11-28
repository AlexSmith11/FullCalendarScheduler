import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';

import './main.scss'
import Axios from 'axios';

/**
 * Code for the calendar component
 * I hope you don't mind but I'm using JS classes instead of functional components for now.
 * I'm learning FC's & Hooks, it's just that all my work so far has been using classes,
 * so I feel more comfortable this way :)
 * If I have enough time, I'll try converting whatever can be into FC's.
 */

export default class DemoApp extends React.Component {
  calendarComponentRef = React.createRef();

  state = {
    calendarWeekends: true,
    calendarEvents: [
      // initial event data
      { title: "Event Now", start: new Date() }
    ]
  };

  // JSON Stream for EVENTS
  // Use Axios http request handler to GET req the API...
  // Then add events to the state.
  // Use seperate function to validate?
  // Add a toast when events have been added successfully!
  getEvent = () => {
    Axios.get('https://jsonplaceholder.typicode.com/todos'
    // , {
    //   headers: {
    //     Authorization: 'token'
    //   }
    // }
    )
      .then(response => {
        // Add events to the API via spread operator - preserves original state (immutability and all that).
        const { events } = response
        // If I want to do something with the event obj, nows the time. 
        validateEvents(events)
        // If not:
        this.setState({
        // Could edit what gets put into state via forEach and:
        // calendarEvents: [...this.state.calendarEvents, event.(OBJECT_ID)]
          calendarEvents: [...this.state.calendarEvents, events]
        })
        console.log(this.state.calendarEvents)
      })
  }

  // Validate the events
  validateEvents = (events) => {
  }


  // Can get events as a JSON stream but need to validate them...
  // Create a new event/invite
  // Definitely probably not the best way...
  handleNewDate = arg => {

    var newDateEvent = true
    var newDateInvite = true

    if (newDateEvent) {
      // Call some validation func here
      this.setState({
        // add new event
        calendarEvents: this.state.calendarEvents.concat({
          // creates a new obj
          title: "New Event",
          start: arg.date,
          allDay: arg.allDay
        })
      });
    }
    if (newDateInvite) {
      // Call some validation func here
    }
  };

  toggleWeekends = () => {
    this.setState({
      // update a property
      calendarWeekends: !this.state.calendarWeekends
    });
  };

  // Set calendar start date
  gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate("2010-01-01");
  };

  render() {
    return (
      <div className="demo-app">
        <div className="demo-app-top">
          <button onClick={this.toggleWeekends}>toggle weekends</button>&nbsp;
          <button onClick={this.gotoPast}>go to a date in the past</button>
        </div>
        <div className="demo-app-calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }}
            plugins={[dayGridPlugin, timeGridPlugin]}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.state.calendarEvents}
            dateClick={this.handleDateClick}
          />
        </div>
      </div>
    );
  }
}

// function App() {

//   return (
//     <FullCalendar 
//       defaultView="timeGridWeek"
//       plugins={[timeGridPlugin]}
//       weekends={false}
//       allDaySlot={false}
//       height="parent"
//       events='https://fullcalendar.io/demo-events.json'
//     />
//   );
// }

// export default App;
