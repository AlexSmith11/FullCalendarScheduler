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
import { invitesMatch } from "./utils/invitesMatch";
import { isInWorkHours, isInWorkDays } from "./utils/isInWorkTime";
import { moveToWorkHour, moveToWorkDay } from "./utils/moveToWorkTime";
import { formatParamMoments } from "./utils/formatParamMoments";

/**
 * TODO:
 * Test moment toString mapper
 * Create ENV file for API details
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

		// For testing duplicates:
		// invites.splice(0, 0, invites[0]);

		const renamedEvents = formatParamNamesEvent(events);
		const renamedInvites = formatParamNamesInvite(invites);

		const allEvents = [...renamedEvents, ...renamedInvites];

		const sortedEvents = sortEvents(allEvents);

		const scheduledEvents = this.schedule(sortedEvents);

		// Untested:
		// The following has NOT been tested
		const scheduledFinal = formatParamMoments(scheduledEvents)
		console.log(scheduledFinal)

		// Then set scheduled events to calendar state
		this.setState({
			calendarEvents: scheduledFinal
		});


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

				// Check if current and next events are overlapping
				const isOverlapping = this.checkOverlapping(current, next);
				if (!isOverlapping) {
					continue;
				}
				// If it overlaps, move the (next) non-event(inv) after the event.
				if (current.isEvent) {
					const inviteDuration = next.end.diff(next.start).valueOf();

					next.start = current.end;
					next.end = next.start.clone().add(inviteDuration, "milliseconds");
					// this.moveToEnd(current, next)

					// If not in work hours then update to be next day at 9 am.
					if (!isInWorkHours(next)) {
						next = moveToWorkHour(next);
					}

					// If now not in work days then update to be next working day.
					if (!isInWorkDays(next)) {
						next = moveToWorkDay(next);
					}
					// If current is an invite and so is next, or next is event, move current after next
				} else {
					const inviteDuration = current.end.diff(current.start).valueOf();

					current.start = next.end;
					current.end = current.start
						.clone()
						.add(inviteDuration, "milliseconds");
					// this.moveToEnd(next, current)

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

	// Rules for checking if current and next events are overlapping.
	checkOverlapping = (current, next) => {
		return current.end.isAfter(next.start) && current.start.isBefore(next.end);
	};

	// Move an event to the end of another.
	// Not in use dude to debugging elsewhere. Will get round to this later.
	// moveToEnd = (current, next) => {
	// 	next.start = current.end;
	// 	next.end = next.start.clone().add(inviteDuration, "milliseconds");
	// }

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
