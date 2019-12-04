/**
 * Return time in millis of duration of event overlap
 * Attempt to avoid using moment(because it uses 42kb). 
 * If pos, no overlap
 * @param {*} items
 */
export function eventTime(a, b) {
  var prev = new Date(a.end);
  var current = new Date(b.start);

  return current - prev;
}
