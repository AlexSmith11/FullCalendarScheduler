/**
 * Settings for the renaming of events
 * @param {*} items 
 */
export function formatParamNamesInvite(invites) {
  return invites.map(invite => ({
    title: invite.name,
    end: invite.endTime,
    start: invite.startTime
  }));
}

export function formatParamNamesEvent(events) {
  return events.map(event => ({
    title: event.name,
    end: event.endTime,
    start: event.startTime,
    isEvent: true
  }));
}