Deconstructing props
react cloneElement
<!-- 
Process:
1# Remove duplicates
2# reschedule events that are outside of work hours (Go over invites (for loop) & check if time is free or not. if free add to event list.)
	- external list of unused events
3# add possible invites to time slots
	- external list of unsused invites
4# fill in unused events
5# fill in unused invites
 -->

SO (summary):
<!-- 
process:
-Remove duplicates
-Sort events array and inv array according to date and time
-main algo
  -Push overlapping events to a latter time
  -Do nothing for back-to-back events
  -Store time differences between events
  -
-if event is after 5pm add to eventCache. Seperate caches as we will merge events back into main array before invites
-End up with two arrays. Events and Invites. These have no clashing nodes with time spaces between events.
-First loop through eventCache to merge events back in.


- Main algorithm:
   This will sort events into the main array by comparing times
   - events will be merged into main first as these have been confirmed
   - 
- Once main array finalised, display events -->



// THIS IS FOR ONE SINGLE ARRAY (I.E. THE EVENTS ARRAY):

//node = a json object

// node1 = obj1
// nodeDiff = 
// nodePositiveDiff = space of time between events
// cachedNode = a node that has been taken out of the event or invite arrays due to it overunning 5pm
// cachedNodeDiff = length of time of a cached event (cachedNodeDiff = len of event)

// First need to rename object parameter names so they work with the calendar plugin

// Then need to remove dupes

// Then sort
just a simple sort via object start param

// Then we start validation on event timings
// This is for the individual event or invite arrays. Once gone through one of the conditions, add to main array. 
if (node2(start) < node1(end)) {                                    // Loop over events -> true if the next node starts before current one ends
  node1(end) - node2(start) = nodeConflictDiff                      // We reschedule for after the currrent node
  node2(start) + nodeConflictDiff, node2(end) + nodeConflictDiff
} else if (node2(start) = node1(end)) {                             // Loop over events -> true of next node starts as current one ends
  Do nothing, already sorted
} else if (node2(start) > node1(end)) {                             // Loop over events -> true if there is a space between current and next node
  node2(start) - node1(end) = nodeDiff                      // This gets the time diff between events - need this for finding events that are the same length of time
  // Now add events into the spare slots. Maybe:
  insertIntoSpareTime(nodeDiff, node1(end), node2(start))   // Every time there is a spare time slot, try to find an event that will fit
}

if(node1(end) > 17:00:00) {                // Then after each node sorted, check no events are after 5pm. If there are, remove and add to cache
  cachedNodeX concat or [...] or whatever. Add to cache.
  // Increment to next day
}

insertIntoSpareTime(nodeDiff, node1(end), node2(start)) {               // This will try to insert cached events into free time slots.
  cachedNodeDiff = cachedNode1(start) - cachedNode(end)                 // Get the length of a cached node
  If (cachedNodeDiff = nodeDiff) {                                      // If the cachedNode length is = the spare time slot length, set its start and end times to 
  cachedNode1(start) = node1(end) && cachedNode1(end) = node2(start)    // the end of the prev node and start of the next node, respectively
  } else if (cachedNodeDiff < nodeDiff) {                               // If the len of the cached node is < len of spare time slot, make cachedNode(start) = node1end and
    cachedNode1(start) = node1(end) && cachedNode1(end) = cachedNode1(start) + cachedNodeDiff   // cachedNode(end) = node1(end) + cachedNodeDiff
  } else if (cachedNodeDiff > nodeDiff) {                               // If cached event is too long for nodeDiff (time slot), do nothing? Move to next time slot?

  }
}
Now the events have been sorted. Need to move onto invites.
  Problem: Do we push all invites to back of the whole que?
  However, because all events are 'confirmed' with the event runner, you should not push these back
  Thee is no priority system so those wanting to speak with you will have to wait.

Invites are already sorted so we can just loop over the main array and either
  insert into any remaining free time slots
  or add to back of main array.
  Q: can we re-use code? Almost definitely.
  i.e. find a way to tell when all events have been finished. When done, call function to start invites. 

Once invites have been inserted, done.

Notes:
// what if no time slots big enough for rescheduled event? Move to next day. MAKE SURE to implement check between last event and 5pm


  // So lets say that we have node 1:
  {
    "name": "Meeting with Marketing",
    "startTime": "2019-10-28 09:30:00",
    "endTime": "2019-10-28 10:30:00"
  }
  // and node 2:
  {
    "name": "Canidate Interview",
    "startTime": "2019-10-28 11:30:00",
    "endTime": "2019-10-28 12:00:00"
  }
  // We have an hr gap between 1 & 2
  // How do we find an invite and put it in this space?

  // Would need to loop through events/invites and see if their (i.e. cachedNode1(start)- cachedNode(end)) diff is =< the nodePositiveDiff


this.validateEvents(events);

  /**Validate the events with the ruleset provided
  Class Proceeding {
    String name;
    String startTime;
    String endTime;
  };
  */

go through both lists linearly:
(two lists. one with events the other with invites)
take first node and check if there is an event that clashes.
	if it doesn't, add this to new array
then check next event/invite and see if it overlaps with the next event/invite.

have chache var to store overlaps. after each node see if there is space between current node and the next one


HAVE:
- descriptive function names so you dont need to look at the code to know what it does.


