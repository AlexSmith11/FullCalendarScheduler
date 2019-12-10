import moment from "moment";
/**
 * Moves an event from out-of-hours to within
 * Keeps the date of the object, just moves it to the start of the next day (9am).
 * @param {object} event
 */
export function moveToWorkHour(event) {
  const tempEvent = event; // To stop .set() from mutating original

  const eventLengthInMillis = moment(tempEvent.start)
    .diff(moment(tempEvent.end))
    .valueOf();

  // Keep the date, just set the time
  const startOfEventInMillis = moment(tempEvent.start)
    .add(1, 'day')
    .set("hour", 9)
    .set("minute", 0)
    .set("second", 0)
    .valueOf();
  const endOfEventInMillis = startOfEventInMillis + eventLengthInMillis;

  console.log(endOfEventInMillis)

  // convert from millis to date strings
  event.start = moment(startOfEventInMillis);
  event.end = moment(endOfEventInMillis);

  return event;
}

// If this is called, we know that the day is either sat or sun. Just add 48 hours
export function moveToWorkDay(event) {
  // So that the event is always set to 9am
  const inWorkHour = this.moveToWorkHour(event)
  const dayOfEvent = moment(inWorkHour.end).toDate()
  var day = dayOfEvent.getDay();

  const millisInDay = 1000 * 60 * 60 * 24
  const startOfEventInMillis = moment(event.start).valueOf()
  const endOfEventInMillis = moment(event.end).valueOf()

  let startOfEvent
  let endOfEvent

  // If Saturday add 48 hours
  if (day === 6) {
    startOfEvent = startOfEventInMillis + (millisInDay*2)
    endOfEvent = endOfEventInMillis + (millisInDay*2)
  }
  // If Sunday add 24 hours
  if (day === 0) {
    startOfEvent = startOfEventInMillis + millisInDay
    endOfEvent = endOfEventInMillis + millisInDay
  }
  // convert from millis to date strings
  event.start = moment(startOfEvent);
  event.end = moment(endOfEvent);

  return event
}

//TODO:
// Skip weekend - do this by adding 48 hours plus whatever is left on the friday plus up to 9am monday