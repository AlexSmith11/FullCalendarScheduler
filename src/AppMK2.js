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
import { checkHours } from "./utils/checkHours.js";
import { invitesMatch } from "./utils/invitesMatch.js";
import { moveEvent } from "./utils/moveEvent.js";

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

    const timeGaps = this.schedule(renamedEvents);

    const readyForCalendarInvites = this.schedule(sortedInvites, timeGaps);

    // scratch that, DONT sort again, no point. calendar doesn't care about array order, dummy.
    // Then set to calendar state
  }

  // One loop for finding time gaps between events
  findGap = events => {
    for (let i = 0; i < events.length; i++) {
      // When first event in array, skip to next event
      if (i === 0) {
        continue;
      }

      const lastEvent = events[i - 1];
      const currentEvent = events[i];

      // When there is no spare time between events
      const overlappingTime = eventTime(lastEvent, currentEvent);
      if (overlappingTime === 0) {
        // If there's no overlap with prev event, skip to next event. There's never any clashing between events.
        continue;
      }

			// When there is spare time between events get the times (start and end)
			if (overlappingTime !== 0) {  // Dont need this if statement lol, just here for visualising
        // Add to array of 'gap' objects, with each obj having a start, end and duration?
			}

      // temp - assign each time gap to array
      const gap = 1;
      const timeGaps = [...gap];
      return timeGaps;
    }
  };

	// one loop for re-assigning invites to times throughout either the same day or if not, that week.
	// If you can't fit one in the week, rollover?
  schedule = (invites, timeGaps) => {
    for (let i = 0; i < invites.length; i++) {
      // When first event in array, skip to next event
      if (i === 0) {
        continue;
      }

      const lastInvite = invites[i - 1];
      const currentInvite = invites[i];

      // Remove duplicate invite on a match
      if (invitesMatch(lastInvite, currentInvite)) {
        invites.splice(i, 1);
        i -= 1;
        continue;
      }

      // Make sure invites aren't out of work hours. If they are, reassign
      // Wrong way to do this. Just instead have a condition in the function below that blocks assignment before 9, after 5

      
      // Assign invites to time gaps 
      // before assigning/changing the invites data, do a check to see if what it is about to be changed to is after 5/ before 9. 

      //then assign to state
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
