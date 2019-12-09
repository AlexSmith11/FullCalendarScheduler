import moment from "moment";
/**
 * Determines if current event is in work time (9am-5pm, mon-fri)
 * Returns true if so
 * @param {object} event
 */

let inHours = true;
let inDays = true;

// Check hour
export function isInWorkHours(event) {
  console.log('hi')
  const startOfEventInMillis = moment(event.start).valueOf();
  const endOfEventInMillis = moment(event.end).valueOf();
  // Set the current days start/finish times
  const startOfWorkDayInMillis = moment(event.end)
    .set("hour", 9)
    .set("minute", 0)
    .set("second", 0)
    .valueOf();
  const endOfWorkDayInMillis = moment(event.start)
    .set("hour", 17)
    .set("minute", 0)
    .set("second", 0)
    .valueOf();

  if (startOfEventInMillis < startOfWorkDayInMillis) {
    console.log("this event starts before 9am");
    inHours = false;
  } else if (endOfEventInMillis > endOfWorkDayInMillis) {
    console.log("This event finishes after 5pm");
    inHours = false;
  } else {
    inHours = true;
  }
  return inHours;
}

// Check day
export function isInWorkDays(event) {
  const dayOfEvent = moment(event.end).toDate()
  const dayOfCurrentWeek = dayOfEvent.getDay();
  var isWeekend = (dayOfCurrentWeek === 6) || (dayOfCurrentWeek === 0);
  if (isWeekend) {
    inDays = false
  } else {
    inDays = true;
  }
  return inDays
}
