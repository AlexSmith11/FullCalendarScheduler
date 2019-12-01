/**
 * Settings for the renaming of events
 * @param {*} items 
 */
export function formatParamNames(items) {
  return items.map(item => ({
    title: item.name,
    end: item.endTime,
    start: item.startTime
  }));
}