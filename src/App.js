import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import "./main.scss";
import Axios from "axios";

class App extends Component {
  calendarComponentRef = React.createRef();

  state = {
    weekends: false,
    calendarEvents: [
      // initial event data (Remove on production - this is for testing)
      {
        // this object will be "parsed" into an Event Object
        title: "The Title", // a property!
        start: "2018-09-01", // a property!
        end: "2018-09-02" // a property! ** see important note below about 'end' **
      },
      {
        name: "Meeting with Marketing",
        startTime: "2019-11-27",
        endTime: "2019-11-27"
      },
      {
        title: "erik test",
        startTime: "09:30",
        endTime: "10:30"
      },
      {
        title: "test 2",
        start: "2019-11-29 10:30:00"
      }
    ]
  };
  // Do I wanna do this..?
  // https://stackoverflow.com/questions/51125456/how-to-rename-object-data-response-in-react
  // What I get: https://fullcalendar.io/docs/duration-object, https://fullcalendar.io/docs/recurring-events
  // What I want: https://fullcalendar.io/docs/date-parsing

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
        headers: { Authorization: "c31912bb-0b58-42d1-a9a0-c521ecc98cdf" }
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

    });
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
            events={this.state.calendarEvents}
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
//       plugins={[timeGridPlugin]}
//       weekends={false}
//       allDaySlot={false}
//       height="parent"
//       events='https://fullcalendar.io/demo-events.json'
//     />
//   );
// }

// Also have: dateClick={this.handleDateClick}

export default App;
