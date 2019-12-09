import moment from "moment";

import { eventTime } from "./eventTime.js";

/**
 * One loop for finding time gaps between events
 * There is an absolute ton of var assignment here because moment js functions mutates data
 * Think there is a pluhin for this but seems very buggy and functionality depends on the browser
 * @param {array} events
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
    // if (currentEvent === null) {
    //   currentEvent.start = "2030-01-01 09:00:00";
    // }

    // When there is no spare time between events
    if (gapDuration === 0) {
      // If there's no overlap with prev event, skip to next event. There's never any clashing between events.
      continue;
    }
    
    // Then check if within work hours
    const startOfDuration = moment(lastEvent.end);
    const endOfDuration = moment(currentEvent.start);
    const startDurationMillis = moment(lastEvent.end).valueOf();
    const endOfDurationMillis = moment(currentEvent.start).valueOf();
    const startOfWorkDay = moment(lastEvent.end)
      .set("hour", 9)
      .set("minute", 0)
      .set("second", 0);
    const endOfWorkDay = moment(currentEvent.start)
      .set("hour", 17)
      .set("minute", 0)
      .set("second", 0);

    // If the events are on different days, create a curation object for each day in-between and push it onto the array
    // PROBLEM: CAN'T USE WEEKENDS
    // moment().set() mutates the moment it operates on, so make temp vars for it to mutate instead
    const tempStartOfDuration = startOfDuration;
    const tempEndOfDuration = endOfDuration;

    // If the duration takes place over more than one day:
    if (!startOfDuration.isSame(endOfDuration, "day")) {
      // Make sure the duration ends/starts on the same day as the last event and current event, respectively
      // Make a duration for the remainder of the day

      const endOfDurationSameDay = tempStartOfDuration
        .set("hour", 17)
        .set("minute", 0)
        .set("second", 0);

      // Push the first duration obj (from i.e. 3pm -> 5pm) to timeGaps
      createDuration(
        timeGaps,
        i,
        startOfDuration,
        endOfDurationSameDay,
        gapDuration
      );

      // And then fill in for the days between
      const daysBetweenEvents =
        Math.abs(startOfDuration.diff(endOfDuration, "days")) - 1;

      // for each daysBetweenEvents, create duration obj and push to timGaps
      for (let j = 0; j < daysBetweenEvents; j++) {
        const startOfDurationNoEventsInDay = startOfDuration;
        startOfDurationNoEventsInDay
          .set("hour", 9)
          .set("minute", 0)
          .set("second", 0)
          .add(j, "d");

        const endOfDurationNoEventsInDay = endOfDuration;
        endOfDurationNoEventsInDay
          .set("hour", 17)
          .set("minute", 0)
          .set("second", 0)
          .add(j, "d");

        createDuration(
          timeGaps,
          i,
          startOfDurationNoEventsInDay,
          endOfDurationNoEventsInDay,
          gapDuration
        );
      }

      // Then push the end duration object (i.e. 9am to 11:30am) to timeGaps
      const startOfDurationSameDay = tempEndOfDuration
        .set("hour", 9)
        .set("minute", 0)
        .set("second", 0);

      createDuration(
        timeGaps,
        i,
        startOfDurationSameDay,
        endOfDuration,
        gapDuration
      );

      // Need to skip weekends

      // And finally, continue, as we have already dealt with all duration between the two events:
      continue;
    }

    // Need to make sure durations end at the end of the work day
    // checks if end is after 5pm
    let endOfDurationWorkDay = endOfDuration;
    let startOfDurationWorkDay = startOfDuration;

    if (endOfDurationMillis > endOfWorkDay.valueOf()) {
      endOfDurationWorkDay = endOfWorkDay;
    }
    // Checks if start before 9am
    if (startDurationMillis < startOfWorkDay.valueOf()) {
      startOfDurationWorkDay = startOfWorkDay;
    }

    createDuration(
      timeGaps,
      i,
      startOfDurationWorkDay,
      endOfDurationWorkDay,
      gapDuration
    );
  }
  return timeGaps;
}

/**
 * Creates a duration object
 * @param {array} timeGaps
 * @param {int} i
 * @param {String} startOfDuration
 * @param {String} endOfDuration
 * @param {String} gapDuration
 */
const createDuration = (
  timeGaps,
  i,
  startOfDuration,
  endOfDuration,
  gapDuration
) => {
  timeGaps.push({
    id: i,
    startGapDuration: startOfDuration.format("YYYY-MM-DD hh:mm:ss").toString(),
    endGapDuration: endOfDuration.format("YYYY-MM-DD hh:mm:ss").toString(),
    gapDuration: gapDuration
  });
};
