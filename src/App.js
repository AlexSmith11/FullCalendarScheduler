import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';

import './main.scss'
import Axios from 'axios';

export default class DemoApp extends React.Component {
  calendarComponentRef = React.createRef();

  state = {
    calendarWeekends: true,
    calendarEvents: [
      // initial event data
      { // this object will be "parsed" into an Event Object
        title: 'The Title', // a property!
        start: '2018-09-01', // a property!
        end: '2018-09-02' // a property! ** see important note below about 'end' **
      }
    ]
  };

  componentDidMount() {
    this.getEvent()
  }

  // JSON Stream for EVENTS
  // Use Axios http request handler to GET req the API...
  // Then add events to the state.
  // Use seperate function to validate?
  // Add a toast when events have been added successfully!
  getEvent = function() {
    Axios.get('https://jsonplaceholder.typicode.com/todos' // Use proper add, this wont work
    // , {
    //   headers: {
    //     Authorization: 'token'
    //   }
    // }
    )
      .then(response => {
        // Add events to the API via spread operator - preserves original state (immutability and all that).
        console.log(response)
        const { events } = response
        // If I want to do something with the event obj, nows the time. 
        this.validateEvents(events)

        
        // If not, set state:
        // Also:
        // Could edit what gets put into state via forEach and:
        // calendarEvents: [...this.state.calendarEvents, event.(OBJECT_ID)]

        console.log([...this.state.calendarEvents, { title: 'request', start: '2019-11-27' }])

        this.setState({
          calendarEvents: [...this.state.calendarEvents, events]
        })
      })
  }

  // Validate the events with the ruleset provided
  validateEvents = (events) => {
    console.log(events, 'in func')
    return events
  }


  // // Can get events as a JSON stream but need to validate them...
  // // Create a new event/invite
  // // Definitely probably not the best way...
  // handleNewDate = arg => {

  //   var newDateEvent = true
  //   var newDateInvite = true

  //   if (newDateEvent) {
  //     // Call some validation func here
  //     this.setState({
  //       // add new event
  //       calendarEvents: this.state.calendarEvents.concat({
  //         // creates a new obj
  //         title: "New Event",
  //         start: arg.date,
  //         allDay: arg.allDay
  //       })
  //     });
  //   }
  //   if (newDateInvite) {
  //     // Call some validation func here
  //   }
  // };

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
    console.log(this.state.calendarEvents)

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
            events={[{ title: 'erik test', start: '2019-11-28' }, { title: 'test 2', start: '2019-11-29' }]}
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
