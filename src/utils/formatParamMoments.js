/**
 * Re-format the moment values to be date strings, in order for the calendar to read them.
 * Strip unneeded data.
 * @param {object} scheduledEvents 
 */
export function formatParamMoments(scheduledEvents) {
    return scheduledEvents.map(scheduledEvents => ({
      title: scheduledEvents.name,
      end: moment(scheduledEvents.endTime).format("YYYY-MM-DD hh:mm:ss")
      .toString(),
      start: moment(scheduledEvents.startTime).format("YYYY-MM-DD hh:mm:ss")
      .toString(),
    }));
  }
