import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import "./main.scss";
import { getEvents, getInvites } from "./utils/api.js";
import {
  formatParamNamesInvite,
  formatParamNamesEvent
} from "./utils/formatParamNames.js";
import { sortEvents } from "./utils/sortEvents.js";
import { eventTime } from "./utils/eventTime";
import { invitesMatch } from "./utils/invitesMatch";
import { isInWorkHours, isInWorkDays } from "./utils/isInWorkTime";
import { moveToWorkHour, moveToWorkDay } from "./utils/moveToWorkTime";
import { moveLastAfterCurrent } from "./utils/moveLastAfterCurrent";
import { moveCurrentAfterLast } from "./utils/moveCurrentAfterLast";

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

    console.log(events);

    const renamedEvents = formatParamNamesEvent(events);
    const renamedInvites = formatParamNamesInvite(invites);
    console.log("renamed events: ", renamedEvents);
    console.log("renamed invites: ", renamedInvites);

    const allEvents = [...renamedEvents, ...renamedInvites];
    console.log("all events: ", allEvents);

    const sortedEvents = sortEvents(allEvents);
    console.log("Sorted events: ", sortedEvents);

    const scheduledEvents = this.schedule(sortedEvents);
    console.log("Scheduled events: ", scheduledEvents);
    // Then set scheduled events to calendar state
  }

  // Moment is destroying dates ???
  // https://stackoverflow.com/questions/43101278/how-to-handle-deprecation-warning-in-momentjs
  schedule = events => {
    for (let i = 0; i < events.length; i++) {
      if (i === 0) {
        // cant use last event as we are at the first event
        continue;
      }

      const currentEvent = events[i];
      const lastEvent = events[i - 1];

      console.log(currentEvent)

      const overlappingTime = eventTime(lastEvent, currentEvent);

      // Check if an invite is within work days or hours
      // If not, move it so that it is
      if (currentEvent.isEvent = false) {
        if (!isInWorkHours(currentEvent) && !isInWorkDays(currentEvent)) {
          // If out of hours and on a weekend:
          events[i] = moveToWorkDay(currentEvent);
        }
        if (!isInWorkHours(currentEvent)) {
          // If out of hours:
          events[i] = moveToWorkHour(currentEvent);
        }
      }

      console.log(currentEvent)

      // Overlapping events
      if (overlappingTime > 0) {
        continue;
      }

      // Remove invite on match
      // BUG IS HERE (or in moveLastAfter's)
      // console.log(invitesMatch(lastEvent, currentEvent));
      // if (invitesMatch(lastEvent, currentEvent)) {
      //   events.splice(i, 1);
      //   i -= 1;
      //   continue;
      // }

      const moveCurrent =
        currentEvent.event || (!currentEvent.event && !lastEvent.event);

      // // If event is original, move the conflicting event (invite)
      // if (moveCurrent) {
      //   const newLast = moveLastAfterCurrent(lastEvent, currentEvent);
      //   events[i - 1] = events[i];
      //   events[i] = newLast;
      //   i -= 1;
      //   continue;
      // }
      // events[i] = moveCurrentAfterLast(lastEvent, currentEvent);
    }
    return events;
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
