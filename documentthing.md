Deconstructing props
react cloneElement

Process:
1# Remove duplicates
2# reschedule events that are outside of work hours (Go over invites (for loop) & check if time is free or not. if free add to event list.)
	- external list of unused events
3# add possible invites to time slots
	- external list of unsused invites
4# fill in unused events
5# fill in unused invites


SO (summary):

this.validateEvents(events);

  /**Validate the events with the ruleset provided
  Class Proceeding {
    String name;
    String startTime;
    String endTime;
  };
  */
  validateEvents = allEvents => {
    const [events] // initial array of events from API
    const [invites] // initial array of invites from API
    const [eventsCache] // removed events that clashed with other events
    const [invitesCache] // removed invites that clashed with other invites
    const eventIndex  // int to count place in event array we are at
    const inviteindex // Same as above for inv
    const [sortedEvents] // All events and invites sorted into one array


    console.log("validate event function: ", allEvents);
    return allEvents;
  };




go through both lists linearly:
(two lists. one with events the other with invites)
take first node and check if there is an event that clashes.
	if it doesn't, add this to new array
then check next event/invite and see if it overlaps with the next event/invite.

have chache var to store overlaps. after each node see if there is space between current node and the next one

Have vars:
Array<Proceeding> events; 
Array<Proceeding> invites; 
Array<Proceeding> eventsCache, 
Array<Proceeding>invitesCache, 
Int eventIndex, 
Int inviteIndex, 
Array<Proceeding> proceedings;
Class Proceeding {
  String name;
  String startTime;
  String endTime;
};

HAVE:
- descriptive function names so you dont need to look at the code to know what it does.


