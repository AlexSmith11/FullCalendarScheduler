/**
 * Return time in millis of duration of event overlap
 * If pos, no overlap
 * @param {*} items
 */
export function eventTime(a, b) {
  
  var prev = new Date(a.end);
  var current = new Date(b.start);
  console.log(current - prev)

  return current - prev;
}
