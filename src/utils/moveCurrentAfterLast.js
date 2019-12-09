import moment from "moment";
/**
 * Moves the current object so that it takes place directly after the last
 * @param {object} lastEvent
 * @param {object} currentEvent
 */
export function moveCurrentAfterLast(lastEvent, currentEvent) {
  console.log(lastEvent.end)
  const lastEventEnd = moment(lastEvent.end)
    .format("YYYY-MM-DD hh:mm:ss")
    .toString();
  const currentEventLengthInMillis = moment(currentEvent.start)
    .diff(moment(currentEvent.end))
    .valueOf();

    console.log(lastEvent.end)

  const newCurrentStart = lastEventEnd;
  const newCurrentLength = moment(currentEventLengthInMillis)
    .format("YYYY-MM-DD hh:mm:ss")
    .toString();

  currentEvent.start = newCurrentStart
  currentEvent.end = newCurrentLength + newCurrentStart

  return currentEvent
}
