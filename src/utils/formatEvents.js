/**
 * Settings for the renaming of events
 * @param {*} items 
 */
export function formatEvents(items) {
  return items.map(item => ({
    title: item.name,
    end: item.endTime,
    start: item.startTime
  }));
}