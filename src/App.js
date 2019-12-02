import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import "./main.scss";
import Axios from "axios";
import { formatParamNames } from "./utils/formatParamNames.js";
import { removeDuplicates } from "./utils/removeDuplicates.js";
import { sortObjects } from "./utils/sortObjects";

/**
 * Notes:
 * Add a toast when events have been added successfully!
 * Create an ENV file to store API keys and addresses?
 */

class App extends Component {
  calendarComponentRef = React.createRef();

  state = {
    weekends: false,
    calendarEvents: [],
    sortedEvents: [],
    sortedInvites: []
  };

  componentDidMount() {
    this.getEvent();
  }

  // JSON Stream for EVENTS
  // Get req the API and assign response to state after
  getEvent = () => {
    Axios.get(
      "https://dyhm3xstr8.execute-api.us-east-2.amazonaws.com/dev/events/get",
      { headers: { Authorization: "c31912bb-0b58-42d1-a9a0-c521ecc98cdf" } }
    )
      .then(response => {
        this.renameEvents(response);
      })
      .catch(this.onResopnseFail);
  };

  /**
   * Take response and rename event params
   */
  renameEvents = ({ data }) => {
    const formattedEvents = formatParamNames(data);
    
    // Now remove duplicates
    this.removeDuplicateEvents(formattedEvents);

  };

  /**
   * remove duplicates from the calendar
   */
  removeDuplicateEvents = data => {
    const removed = removeDuplicates(data);

    // Now sort objects (sort after removal of dupes as sort will now be faster)
    this.sortEventObjects(removed)
  };

  /**
   * sort events
   */
  sortEventObjects = data => {
    const sorted = sortObjects(data);
    console.log(sorted);

    // Now for the main bit: validation
    this.validateEvents(sorted)

    // And add sorted events to Cal state
    this.setState({
      sortedEvents: [...this.state.sortedEvents, ...sorted]
    });
    this.addAllToCalendar();
  }

  /**
   * Validate the events with the ruleset provided
   */
  validateEvents = data => {
    //   const [events] // initial array of events from API
    //   const [invites] // initial array of invites from API
    //   const [eventsCache] // removed events that clashed with other events
    //   const [invitesCache] // removed invites that clashed with other invites
    //   const eventIndex  // int to count place in event array we are at
    //   const inviteindex // Same as above for inv
    //   const [sortedEvents] // All events and invites sorted into one array

    /**
     * Want separate functions to: (?)
     * reschedule events with times after/before 5pm/9am
     * reschedule events that clash 
     */

    console.log("validate event function: ", data);
    return data;
  };

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

  onResponseFail = () => {};

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
