import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";

import "./main.scss";
import Axios from "axios";
import { formatParamNames } from "./utils/formatParamNames.js";
import { eventTime } from "./utils/eventTime.js";
import { sortEvents } from "./utils/sortEvents.js";
import { checkHours } from "./utils/checkHours.js";
// import { eventsMatch } from "./utils/eventsMatch.js";
import { moveEvent } from "./utils/moveEvent.js";

/**
 * Notes:
 * Add a toast when events have been added successfully!
 * Create an ENV file to store API keys and addresses?
 * Warning: moment.js is deprecating .valueOf(). Falls back to Date(). May be differences across browsers
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

    // Could take loop out from schedule() and into here, looping once for preferred (events) and again for invites
    // Instead of having the if (preferred) inside the loop
    const allCalendarEvents = this.schedule(sortedEvents);
    console.log(allCalendarEvents);
  }

  /**
   * func to re-schedule:
   * Sorts, removes duplicates, schedules
   * takes single list of events/invites
   * scheduling via for loop over all data manipulation per event ensures least
   * time complexity
   * Will schedule so that all events are as close to their original time as possible. Some original 'events' may be rescheduled
   */
  schedule = events => {
    for (let i = 0; i < events.length; i++) {
      // When first event in array, skip to next event
      if (i === 0) {
        continue;
      }

      // Get the duration of an event
      const lastEvent = events[i - 1];
      const currentEvent = events[i];
      const overlappingTime = eventTime(lastEvent, currentEvent);
      if (overlappingTime > 0) {
        // If there's no overlap with prev event, skip to next event
        continue;
      } else if (overlappingTime == null) {
        // If there are no events to compare to, skip to next event
        continue;
      }

      // Remove duplicate event on a match
      // if (eventsMatch(lastEvent, currentEvent)) {
      //   events.splice(i, 1);
      //   i -= 1;
      //   continue;
      // }

      // Want to first schedule original events (if .preferred = true, call sort func? AND ONLY COMPARE TO OTHER .preferred = true)
      // Then do invites (if .preferred = false, call sort func? Compare to all)

      // if (node2(start) < node1(end)) {                                    // Loop over events -> true if the next node starts before current one ends
      //   node1(end) - node2(start) = nodeConflictDiff                      // We reschedule for after the currrent node
      //   node2(start) + nodeConflictDiff, node2(end) + nodeConflictDiff
      // } else if (node2(start) = node1(end)) {                             // Loop over events -> true of next node starts as current one ends
      //   Do nothing, already sorted
      // } else if (node2(start) > node1(end)) {                             // Loop over events -> true if there is a space between current and next node
      //   node2(start) - node1(end) = nodeDiff                      // This gets the time diff between events - need this for finding events that are the same length of time
      //   // Now add events into the spare slots. Maybe:
      //   insertIntoSpareTime(nodeDiff, node1(end), node2(start))   // Every time there is a spare time slot, try to find an event that will fit
      // }

      // Evertime there is a spare time slot, I can't re-schedule the events. Can only store the timeDiff
      // And try to insert invites between already confirmed events.
      console.log(currentEvent.start, lastEvent.end);

      var j = moment(lastEvent.end).diff(moment(currentEvent.start));
      console.log(j);
      var end = moment(lastEvent.end).valueOf();
      console.log(end);
      var start = moment(currentEvent.start).valueOf();
      console.log(start);

      //https://stackoverflow.com/questions/39980722/moment-js-get-current-time-in-milliseconds
      var diffBetweenEvents = moment(lastEvent.end)
        .diff(moment(currentEvent.start))
        .valueOf();
      console.log(diffBetweenEvents);

      console.log(currentEvent.end)
      currentEvent.end = moment(currentEvent.end).add(1, 'd');
      console.log(currentEvent)

      // Make sure events are within work hours. If not, re-schedule
      // Check event isn't ending after 5pm first, and then send to next day at 9am if it is (can use moment().add(1, day))
      if (moment(currentEvent.end).isAfter("17:00:00")) {
        currentEvent.start = moment(currentEvent.start).add(1, 'd'); // and then make start = 9am, end = 9am + diff
        currentEvent.end = moment(currentEvent.end).add(1, 'd');
      } else if (moment(currentEvent.start).isBefore("9:00:00")) {
        // Set time to 9am + 
      }

      // Use the time difference between events (or between the end of the previous and start of the current) to add to current time
      if (currentEvent.preferred) {
        // If there's a space between events:
        if (diffBetweenEvents > 0) {
          // Store diff to compare to len of invites. Store start/end of diff (aka end of prev, start of current)
          // If there's negative space between events:
        } else if (diffBetweenEvents > 0) {
          // Add diff to the start/end of the current objects time
        }

        // Move current event if it is an invite - leave if event
        // let moveCurrent = false;
        // if (
        //   (lastEvent.preferred && !currentEvent.moved) ||
        //   (lastEvent.preferred && !currentEvent.preferred) ||
        //   (!lastEvent.preferred && !lastEvent.moved && currentEvent.moved)
        // ) {
        //   moveCurrent = true;
        // }

        // if (moveCurrent) {
        //   continue;
        // }
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
