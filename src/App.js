import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import "./main.scss";
import Axios from "axios";
import { formatParamNames } from "./utils/formatParamNames.js";
import {removeDuplicates} from "./utils/removeDuplicates.js";

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
    renamedInvites: [],
    renamedEvents: []
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
        this.renameEvents(response)})
      .catch(this.onResopnseFail);
  };

  /**
   * Take response and rename event params
   */
  renameEvents = ({ data }) => {
    // Rename date object properties
    const formattedEvents = formatParamNames(data);
    // Add events to the state via spread operator - preserves original state (immutability and all that).
    this.setState({
      renamedEvents: [...this.state.renamedEvents, ...formattedEvents]
    });
    
    const tmpRenamedEvents = this.state.renamedEvents
    this.removeDuplicateEvents(tmpRenamedEvents)
    
    this.addAllToCalendar()
  };

  /**
   * remove duplicates from the calendar
   */
  removeDuplicateEvents = (data) => {

    console.log(data)
    const removed = removeDuplicates(data);
    // set state...
    console.log(removed)
  }

  /**
   * Validate the events with the ruleset provided
   */
  validateEvents = allEvents => {
    //   const [events] // initial array of events from API
    //   const [invites] // initial array of invites from API
    //   const [eventsCache] // removed events that clashed with other events
    //   const [invitesCache] // removed invites that clashed with other invites
    //   const eventIndex  // int to count place in event array we are at
    //   const inviteindex // Same as above for inv
    //   const [sortedEvents] // All events and invites sorted into one array

    console.log("validate event function: ", allEvents);
    return allEvents;
  };

  // Set the calendars state
  addAllToCalendar = () => {
    this.setState({
      calendarEvents: this.state.renamedEvents
    })
  }

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

  onResponseFail = () => {};

  render() {
    console.log("In the render: ", this.state.renamedEvents);

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
