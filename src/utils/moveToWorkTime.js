import moment from "moment";
/**
 * Moves an event from out-of-hours to within
 * Keeps the date of the object, just moves it to the start of the day
 * @param {object} event
 */
export function moveToWorkTime(event) {
  const tempEvent = event; // To stop .set() from mutating original

  const eventLengthInMillis = moment(tempEvent.start)
    .diff(moment(tempEvent.end))
    .valueOf();

  // Keep the date, just set the time
  const startOfEventInMillis = moment(tempEvent.start)
    .set("hour", 9)
    .set("minute", 0)
    .set("second", 0)
    .valueOf();
  const endOfEventInMillis = startOfEventInMillis + eventLengthInMillis;

  // convert from millis to date strings
  if (event.event) {
    return event
  } else {
  event.start = moment(startOfEventInMillis)
    .format("YYYY-MM-DD hh:mm:ss")
    .toString();
  event.end = moment(endOfEventInMillis)
    .format("YYYY-MM-DD hh:mm:ss")
    .toString();

  return event;
  }
}
