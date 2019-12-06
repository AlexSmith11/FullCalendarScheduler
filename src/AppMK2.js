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


class AppMK2 extends Component {
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
    const timeGaps = this.findGap(renamedEvents);

    const duplicateInvitesRemoved = removeDuplicates(sortedInvites)

    const readyForCalendarInvites = this.schedule(duplicateInvitesRemoved, timeGaps);

    // Then set to calendar state
  }

  // One loop for finding time gaps between events
  findGap = events => {
    const timeGaps = [];
    for (let i = 0; i < events.length; i++) {
      // When first event in array, skip to next event
      if (i === 0) {
        continue;
      }

      const lastEvent = events[i - 1];
      const currentEvent = events[i];

      // When there is no spare time between events
      if (gapDuration === 0) {
        // If there's no overlap with prev event, skip to next event. There's never any clashing between events.
        continue;
      }

      const gapDuration = eventTime(lastEvent, currentEvent);

      // Check this - would it help simplify this
      // https://stackoverflow.com/questions/15130735/how-can-i-remove-time-from-date-with-moment-js

      // Check if the start and finish of the two invites are on the same day
      // This is because times can still be within work hours, just spanning several days.
      var formatDay = 'YYYY-MM-DD'
      let dayOfLastEvent = moment(lastEvent.end, formatDay);
      let dayOfCurrentEvent = moment(currentEvent.start, formatDay);
      if (!dayOfLastEvent.isSame(dayOfCurrentEvent, 'day')) {
        // Set startDuration to 9am of correct day
      }

      // Then check if within work hours
      var formatMinutes = 'hh:mm:ss'
      let startOfDay = moment('09:00:00', formatMinutes);
      let endOfDay = moment('17:00:00', formatMinutes);
      let startOfDuration = moment(lastEvent.start, formatMinutes)
      let endOfDuration = moment(currentEvent.end, formatMinutes)
    
      // checks if end is after 5pm
      if (this.minutesOfDay(endOfDuration) > this.minutesOfDay(endOfDay)) {
        endOfDuration = '5pm + the date'
      }
      // Checks if start before 9am
      if (this.minutesOfDay(startOfDuration) < this.minutesOfDay(startOfDay)) {
        startOfDuration = '9am + date'
      }

      // When there is spare time between events get the times (start and end)
      // Add to array of 'gap' objects, with each obj having a start, end and duration?
      timeGaps.push({
        id: i,
        startGapDuration: startOfDuration,
        endGapDuration: endOfDuration,     // OR 5PM
        gapDuration: gapDuration
      })
    }
    return timeGaps;
  };

  minutesOfDay = (m) => {
    return m.minutes() + m.hours() * 60;
  }

  // one loop for re-assigning invites to times throughout either the same day or if not, that week.
  // If you can't fit one in the week, rollover?
  // There needs to be nested loop to check for gaps and more 'cleverly' assign invites to times (rather than just put them all at the end of the array)
  // time complexity is O(n^2) :c cant use hashes as we aren't using direct comparisons. Also can't use JSON stringify to compare.
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


      timeGaps.forEach(element => {
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
export default AppMK2;
