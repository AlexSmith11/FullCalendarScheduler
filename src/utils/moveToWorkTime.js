import moment from "moment";
/**
 * Moves an event from out-of-hours to within
 * Keeps the date of the object, just moves it to the start of the day
 * @param {object} event
 */
export function moveToWorkHour(event) {
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
  event.start = moment(startOfEventInMillis)
    .format("YYYY-MM-DD hh:mm:ss")
    .toString();
  event.end = moment(endOfEventInMillis)
    .format("YYYY-MM-DD hh:mm:ss")
    .toString();

  return event;

}

// If this is called, we know that the day is either sat or sun. Just add 48 hours
export function moveToWorkDay(event) {
  inWorkHour = this.moveToWorkHour(event)
  const dayOfEvent = moment(event.end).toDate()
  var day = dayOfEvent.getDay();

  // If Sat add 48 hours
  if (day === 6) {
    const newEventSat = new Date(dayOfEvent.getTime() + (2 * 24 * 60 * 60 * 1000));
    const newEventMomentSat = moment(newEventSat).format("YYYY-MM-DD hh:mm:ss")
      .toString();
    return newEventMomentSat
  }

  // If Sun add 24 Hours
  if (day === 0) {
    const newEventSun = new Date(dayOfEvent.getTime() + (1 * 24 * 60 * 60 * 1000));
    const newEventMomentSun = moment(newEventSun).format("YYYY-MM-DD hh:mm:ss")
      .toString();
    return newEventMomentSun
  }
}

//TODO:
// Skip weekend - do this by adding 48 hours plus whatever is left on the friday plus up to 9am monday