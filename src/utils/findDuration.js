import moment from "moment";

import { eventTime } from "./utils/eventTime.js";

/**
 * One loop for finding time gaps between events
 * @param {*} events
 */
export function findDuration(events) {
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
}
