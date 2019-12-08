import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";

import "./main.scss";
import { getEvents, getInvites } from "./utils/api.js";
import { formatParamNames } from "./utils/formatParamNames.js";
import { eventTime } from "./utils/eventTime.js";
import { sortEvents } from "./utils/sortEvents.js";
import { removeDuplicates } from "./utils/removeDuplicates";

/**
 * TODO:
 * Exclude weekends from duration object generation
 */

class App extends Component {
  calendarComponentRef = React.createRef();

  state = {
    weekends: false,
    calendarEvents: [],
    timeGaps: []
  };

  componentDidMount() {
    this.main();
  }

  async main() {
    const eventsResponse = await getEvents();
    const invitesResponse = await getInvites();
    const events = eventsResponse.data;
    const invites = invitesResponse.data;

    const renamedEvents = formatParamNames(events);
    const renamedInvites = formatParamNames(invites);

    const sortedInvites = sortEvents(renamedInvites);

    // temp
    this.setState({
      calendarEvents: renamedEvents
    });

    // Get duration objects of free time gaps
    const timeGaps = this.findDuration(renamedEvents);

    console.log("Duration objects: ", timeGaps);

    const duplicateInvitesRemoved = removeDuplicates(sortedInvites);

    const readyForCalendarInvites = this.schedule(
      duplicateInvitesRemoved,
      timeGaps
    );

    // Then set to calendar state
  }

  // One loop for finding time gaps between events
  findDuration = events => {
    const timeGaps = [];
    for (let i = 0; i < events.length; i++) {
      const currentEvent = events[i];
      const lastEvent = events[i - 1];

      // When first event in array, set the last 'event' to be x, so you can start assigning invites from now.
      if (i === 0) {
        continue;
      }

      const gapDuration = eventTime(lastEvent, currentEvent);

      // If there are no more events, set it to arbitrary point in future, so we can have a certain amount of time free to assign invites
      // This is terrifically terrible, I'm so sorry
      if (currentEvent === null) {
        currentEvent.start = "2030-01-01 09:00:00";
      }

      // When there is no spare time between events
      if (gapDuration === 0) {
        // If there's no overlap with prev event, skip to next event. There's never any clashing between events.
        continue;
      }

      // Then check if within work hours
      let startOfDuration = moment(lastEvent.end);
      let endOfDuration = moment(currentEvent.start);
      let startDurationMillis = moment(lastEvent.end).valueOf();
      let endOfDurationMillis = moment(currentEvent.start).valueOf();

      let startOfWorkDay = moment(lastEvent.end)
        .set("hour", 9)
        .set("minute", 0)
        .set("second", 0);
      let endOfWorkDay = moment(currentEvent.start)
        .set("hour", 17)
        .set("minute", 0)
        .set("second", 0);

      // checks if end is after 5pm
      if (endOfDurationMillis > endOfWorkDay.valueOf()) {
        endOfDuration = endOfWorkDay;
      }
      // Checks if start before 9am
      if (startDurationMillis < startOfWorkDay.valueOf()) {
        startOfDuration = startOfWorkDay;
      }

      // If the events are on different days, create a curation object for each day in-between and push it onto the array
      // PROBLEM: CAN'T USE WEEKENDS
      if (!startOfDuration.isSame(endOfDuration, "day")) {
        console.log("not on the same day");
      }

      timeGaps.push({
        id: i,
        startGapDuration: startOfDuration
          .format("YYYY-MM-DD hh:mm:ss")
          .toString(),
        endGapDuration: endOfDuration.format("YYYY-MM-DD hh:mm:ss").toString(),
        gapDuration: gapDuration
      });
    }
    return timeGaps;
  };

  // one loop for re-assigning invites to times throughout either the same day or if not, that week.
  // If you can't fit one in the week, rollover?
  // There needs to be nested loop to check for gaps and more 'cleverly' assign invites to times (rather than just put them all at the end of the array)
  // time complexity is O(n^2) :c cant use hashes as we aren't using direct comparisons. Also can't use JSON stringify to compare.
  // Currently, complexity is O(n) + O(n^2) >:/
  schedule = (invites, timeGaps) => {
    for (let i = 0; i < invites.length; i++) {
      const lastInvite = invites[i - 1];
      const currentInvite = invites[i];

      // Make sure invites aren't out of work hours. If they are, reassign
      // Wrong way to do this. Just instead have a condition in the function below that blocks assignment before 9, after 5

      // Assign invites to time gaps
      // Now loop over each duration object. first that durationObjDuration > inviteDuration, assign.
      // Then check length of new durationObjDuration (change it to reflect that there's now an invite in it.)

      // before assigning/changing the invites data, do a check to see if what it is about to be changed to is after 5/ before 9.

      //then assign to state

      // invites.forEach(timeGaps) { if(timeGaps[i] != null* && ...){continue;} }
      // *Need this - some iterations wont have gaps, so id's will be like: [2, 3, 5, 7, 8, 9, 11...]

      // Do I need a forEach?
      // https://stackoverflow.com/questions/41603036/get-the-index-of-the-first-element-in-an-array-with-value-greater-than-x
      // So:
      /**
       * Find first index where invDur is smaller than (so can fit inside of) the gapDuration
       * var index = timeGaps.findIndex(inviteDuration => inviteDuration < gapDuration);
       * Then assign vals:
       */

      timeGaps.forEach(element => {
        // Is this the wrong way - loop over gaps or invites first?
        // Need to find first timeGap that has large enough duration for an invite to fit, then assign values.
      });
    }
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

  render() {
    console.log("Events In the render: ", this.state.calendarEvents);

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
export default App;
