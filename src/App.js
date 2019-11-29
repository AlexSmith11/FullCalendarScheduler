import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import "./main.scss";
import Axios from "axios";

export default class App extends React.Component {
  calendarComponentRef = React.createRef();

  state = {
    weekends: false,
    calendarEvents: [
      // initial event data
      {
        // this object will be "parsed" into an Event Object
        title: "The Title", // a property!
        start: "2018-09-01", // a property!
        end: "2018-09-02" // a property! ** see important note below about 'end' **
      },
      {
        name: "Meeting with Marketing",
        startTime: "2019-11-27 09:30:00",
        endTime: "2019-11-27 10:30:00"
      }
    ]
  };

  componentDidMount() {
    this.getEvent();
  }

  // JSON Stream for EVENTS
  // Use Axios http request handler to GET req the API...
  // Then add events to the state.
  // Use seperate function to validate?
  // Add a toast when events have been added successfully!
  // Create an ENV file to store API keys and addresses?
  // Use await/async to prevent load before GET returned (when using hooks)
  getEvent = () => {
    Axios.get(
      "https://dyhm3xstr8.execute-api.us-east-2.amazonaws.com/dev/events/get",
      {
        headers: {
          Authorization: "c31912bb-0b58-42d1-a9a0-c521ecc98cdf"
        }
      }
    ).then(response => {
      if (response.status === 200 && response != null) {
        var events = response.data;
        this.setState({
          // Add events to the API via spread operator - preserves original state (immutability and all that).
          calendarEvents: [...this.state.calendarEvents, ...events]
        });
      } else {
        throw new Error("Something's wrong - Check your API feed or server");
      }

      console.log("calendar state: ", this.state.calendarEvents);

      this.validateEvents(events);
    });
  };

  // Validate the events with the ruleset provided
  validateEvents = events => {
    console.log("validate event function: ", events);
    return events;
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
    console.log("In the render: ", this.state.calendarEvents);

    return (
      <div className="demo-app">
        <div className="demo-app-top">
          <button onClick={this.toggleWeekends}>toggle weekends</button>&nbsp;
          <button onClick={this.gotoPast}>go to a date in the past</button>
        </div>
        <div className="demo-app-calendar">
          <FullCalendar
            defaultView="timeGridWeek"
            plugins={[dayGridPlugin, timeGridPlugin]}
            ref={this.calendarComponentRef}
            weekends={this.state.weekends}
            allDaySlot={false}
            height="parent"
            // events={this.state.calendarEvents}
            events={[
              { title: "erik test", startTime: "2019-11-28t09:30:00" },
              { title: "test 2", start: "2019-11-29" }
            ]}
            header={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }}
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

// Also have: dateClick={this.handleDateClick}

// export default App;
