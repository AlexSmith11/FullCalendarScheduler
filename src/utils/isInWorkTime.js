import moment from "moment";
/**
 * Determines if current event is in work time
 * Returns true if so
 * @param {object} event
 */
export function isInWorkTime(event) {
  const startOfEvent = moment(event.start).valueOf();
  const endOfEvent = moment(event.end).valueOf();
  // Set the current days start/finish times
  const startOfWorkDay = moment(event.end)
    .set("hour", 9)
    .set("minute", 0)
    .set("second", 0)
    .valueOf();
  const endOfWorkDay = moment(event.start)
    .set("hour", 17)
    .set("minute", 0)
    .set("second", 0)
    .valueOf();

  let inHours = true;

  if (startOfEvent < startOfWorkDay) {
    console.log("this event starts before 9am");
    inHours = false;
  } else if (endOfEvent > endOfWorkDay) {
    console.log("This event finishes after 5pm");
    inHours = false;
  } else {
    inHours = true;
  }
  return inHours;
}
