import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";

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

    invites.splice(0, 0, invites[0]);
    console.log(events);

    const renamedEvents = formatParamNamesEvent(events);
    const renamedInvites = formatParamNamesInvite(invites);

    const allEvents = [...renamedEvents, ...renamedInvites];

    const sortedEvents = sortEvents(allEvents);

    const done = this.schedule(sortedEvents);

    // turn all moment objects back into strings - try formatting again

    // Then set scheduled events to calendar state
    
  }

  schedule = all => {
    for (let i = 0; i < all.length - 1; i++) {
      let current = all[i];
      let next = all[i + 1];

      // If both are events then we can't move either.
      if (current.isEvent && next.isEvent) {
        continue;
      } else {
        // Remove Duplicates.
        const match = invitesMatch(current, next);
        if (match) {
          if (current.isEvent) {
            // Remove Next.
            all.splice(i + 1, 1);
          } else {
            // Remove Current and decrement count to allow for recheck.
            all.splice(i, 1);
            i -= 1;
          }
          // Removed an index so next iteration.
          continue;
        }

        // Check if overlapping
        const isOverlapping = this.checkOverlapping(current, next);
        if (!isOverlapping) {
          continue;
        }
        // If it overlaps, move the non-event after the event.
        if (current.isEvent) {
          const inviteDuration = next.end.diff(next.start).valueOf();

          next.start = current.end;
          next.end = next.start.clone().add(inviteDuration, "milliseconds");

          // If not in work hours then update to be next day at 9 am.
          if (!isInWorkHours(next)) {
            next = moveToWorkHour(next);
          }

          // If now not in work days then update to be next working day.
          if (!isInWorkDays(next)) {
            next = moveToWorkDay(next);
          }
        } else {
          const inviteDuration = current.end.diff(current.start).valueOf();

          current.start = next.end;
          current.end = current.start
            .clone()
            .add(inviteDuration, "milliseconds");

          // If not in work hours then update to be next day at 9 am.
          if (!isInWorkHours(current)) {
            current = moveToWorkHour(current);
          }

          // If now not in work days then update to be next working day.
          if (!isInWorkDays(current)) {
            current = moveToWorkDay(current);
          }

          // Increment current index by one.
          const removedCurrent = all.splice(i, 1)[0];
          all.splice(i + 1, 0, removedCurrent);
        }
      }
    }
  };

  checkOverlapping = (a, b) => {
    return a.end.isAfter(b.start) && a.start.isBefore(b.end);
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


  // schedule = events => {
  //   for (let i = 0; i < events.length; i++) {
  //     debugger;
  //     if (i === 0) {
  //       // cant use last event as we are at the first event
  //       continue;
  //     }

  //     const currentEvent = events[i];
  //     const lastEvent = events[i - 1];

  //     console.log(currentEvent)

  //     const overlappingTime = eventTime(lastEvent, currentEvent);

  //     // Check if an invite is within work days or hours
  //     // If not, move it so that it is
  //     // if (currentEvent.isEvent = false) {
  //     //   if (!isInWorkHours(currentEvent) && !isInWorkDays(currentEvent)) {
  //     //     // If out of hours and on a weekend:
  //     //     events[i] = moveToWorkDay(currentEvent);
  //     //   }
  //     //   if (!isInWorkHours(currentEvent)) {
  //     //     // If out of hours:
  //     //     events[i] = moveToWorkHour(currentEvent);
  //     //   }
  //     //}

  //     //console.log(currentEvent)

  //     // Overlapping events
  //     if (overlappingTime > 0) {
  //       continue;
  //     }

  //     // Remove invite on match
  //     // BUG IS HERE (or in moveLastAfter's)
  //     // console.log(invitesMatch(lastEvent, currentEvent));
  //     // if (invitesMatch(lastEvent, currentEvent)) {
  //     //   events.splice(i, 1);
  //     //   i -= 1;
  //     //   continue;
  //     // }

  //     //const moveCurrent =
  //     //  currentEvent.event || (!currentEvent.isEvent && !lastEvent.isEvent);

  //     // // If event is original, move the conflicting event (invite)
  //     // if (moveCurrent) {
  //     //   const newLast = moveLastAfterCurrent(lastEvent, currentEvent);
  //     //   events[i - 1] = events[i];
  //     //   events[i] = newLast;
  //     //   i -= 1;
  //     //   continue;
  //     // }
  //     // events[i] = moveCurrentAfterLast(lastEvent, currentEvent);
  //   }
  //   return events;
  // };