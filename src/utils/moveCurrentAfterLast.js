import moment from "moment";
/**
 * Moves the previous event so that it instead takes place right after the current
 * @param {object} lastEvent
 * @param {object} currentEvent
 */
export function moveLastAfterCurrent(lastEvent, currentEvent) {
  const currentEventEnd = moment(currentEvent.end)
    .format("YYYY-MM-DD hh:mm:ss")
    .toString();
  const lastEventLengthInMillis = moment(lastEvent.start)
    .diff(moment(lastEvent.end))
    .valueOf();

  const newLastStart = currentEventEnd;
  const newLastLength = moment(lastEventLengthInMillis)
    .format("YYYY-MM-DD hh:mm:ss")
		.toString();

	lastEvent.start = newLastStart
	lastEvent.end = newLastLength + newLastStart

	return lastEvent
}