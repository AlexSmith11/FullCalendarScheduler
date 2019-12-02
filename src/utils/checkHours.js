export function checkHours(items) {
  // Use something similar to sorting algo -> check dates via generating Date() obj's
  items.forEach(items => {
    console.log(items.title);

    // If start time < (earlier than) 9am remove and add event to cache. .splace to remove?
    if (items.start) {
      // Get time diff & store event in cache
    } else if (items.end) {
      // Get time diff & store event in cache
    } else {
      return
    }
  });
  return 'hi'
}
