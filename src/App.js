import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import "./main.scss";
import Axios from "axios";
import { formatParamNames } from "./utils/formatParamNames.js";
import { eventTime } from "./utils/eventTime.js";
import { sortEvents } from "./utils/sortEvents.js";
import { checkHours } from "./utils/checkHours.js";
import { eventsMatch } from "./utils/eventsMatch.js";

/**
 * Notes:
 * Add a toast when events have been added successfully!
 * Create an ENV file to store API keys and addresses?
 */
class App extends Component {
  calendarComponentRef = React.createRef();

  state = {
    weekends: false,
    calendarEvents: []
  };

  componentDidMount() {
    this.getData();
  }

  /**
   * main func to get data
   */
  async getData() {
    const eventsResponse = await this.getEvents();
    const invitesResponse = await this.getInvites();
    const events = eventsResponse.data;
    const invites = invitesResponse.data;

    // Need to rename param names so calendar can display events properly
    const renamedEvents = formatParamNames(events);
    const renamedInvites = formatParamNames(invites);

    // Set events to be the prefered data - dont overwrite with invites
    const eventsPreferred = renamedEvents.map(pr => ({
      ...pr,
      preferred: true
    }));

    // Combine into a collection of all calendar events
    const allEvents = [...eventsPreferred, ...renamedInvites];

    // Sort events
    const sortedEvents = sortEvents(allEvents);

    // Pass data to rename, sort, remove duplicates
    this.schedule(sortedEvents);
  }

  /**
   * func to re-schedule:
   * Sorts, removes duplicates, schedules
   * takes single list of events/invites
   * scheduling via for loop over all data manipulation per event ensures least
   * time complexity
   */
  schedule = events => {
    for (let i = 0; i < events.length; i++) {
      // When first event in array, stop
      if (i === 0) {
        continue;
      }

      // Get the duration of an event
      const lastEvent = events[i - 1];
      const currentEvent = events[i];
      const overlappingTime = eventTime(lastEvent, currentEvent);
      if (overlappingTime > 0) {
        // If there's no overlap with prev event, stop
        continue;
      } else if (overlappingTime == null) {
        // If there are no events to compare to, stop
        continue
      }

      // Remove duplicate event on a match
      if (eventsMatch(lastEvent, currentEvent)) {
        events.splice(i, 1);
        i -= 1;
        continue;
      }

      // Move current event if it is an invite - leave if event
      let moveCurrent = false;
      if (
        (lastEvent.preferred && !currentEvent.moved) ||
        (lastEvent.preferred && !currentEvent.preferred) ||
        (!lastEvent.preferred && !lastEvent.moved && currentEvent.moved)
      ) {
        moveCurrent = true;
      }

      if (moveCurrent) {
        continue;
      }
    }

  };

  /**
   * Make sure events are within business hours
   */
  checkBusinessHours = data => {
    const withinWorkHours = checkHours(data);
    console.log(withinWorkHours);
    return withinWorkHours;
  };

  onResponseFail = () => {};

  // Set the calendars state
  addAllToCalendar = () => {
    this.setState({
      calendarEvents: this.state.sortedEvents
    });
  };

  toggleWeekends = () => {
    this.setState({
      // update a property
      calendarWeekends: !this.state.calendarWeekends
    });
  };

  // Set calendar 'start' date
  gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate("2010-01-01");
  };

  /**
   * Get requests for the API using axios
   * Returns response
   */
  getEvents = async () => {
    return Axios.get(
      "https://dyhm3xstr8.execute-api.us-east-2.amazonaws.com/dev/events/get",
      { headers: { Authorization: "c31912bb-0b58-42d1-a9a0-c521ecc98cdf" } }
    ).then(response => {
      return response;
    });
  };
  getInvites = async () => {
    return Axios.get(
      "https://dyhm3xstr8.execute-api.us-east-2.amazonaws.com/dev/invites/get",
      { headers: { Authorization: "c31912bb-0b58-42d1-a9a0-c521ecc98cdf" } }
    ).then(response => {
      return response;
    });
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

// Calendar Params:
//  plugins={[timeGridPlugin]}
//  weekends={false}
//  allDaySlot={false}
//  height="parent"
//  events='https://fullcalendar.io/demo-events.json'

// Also have: dateClick={this.handleDateClick}

export default App;
