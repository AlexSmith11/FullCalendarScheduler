/**
 * Settings for the renaming of events
 * @param {*} items 
 */
export const formatParamNamesInvites = (invites) => {
  return invites.map(invite => ({
    title: invite.name,
    end: invite.endTime,
    start: invite.startTime
  }));
}
export const formatParamNamesEvents = (events) => {
  return events.map(event => ({
    title: event.name,
    end: event.endTime,
    start: event.startTime,
    isEvent: true , ...event
  }));
}