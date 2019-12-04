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




remove duplicates

remove clashes - add to seperate array
Sort arrays by start time
	go through both main eve, inv lists linearly:
	(two lists. one with events the other with invites)
		Need one for each (eve, inv) because we will first re-schedule these events, then invs:

		    const [events] // initial array of events from API (after duplicates have been removed)
    		const [invites] // initial array of invites from API (after duplicates have been removed)
    		const [eventsCache] // removed events that clashed with other events
    		const [invitesCache] // removed invites that clashed with other invites

			take first node in [events] and check if next event clashes (compare end time with next nodes start time)
				if it doesn't, add this to MAIN (final) array

	Look up quick sort. modify it to use both start and end times.
		Take original event array, sort into cache/back into main array?
		Add condition in quick sort that: if time clash, add the clashing obj (both eve and inv) to seperate array.
		sort this second array
		append this array back onto main array.
		https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
		https://stackoverflow.com/questions/46052484/order-events-in-fullcalendar-by-start-date-and-end-date
		https://stackoverflow.com/questions/10153846/sorting-an-array-of-objects-by-two-properties

		sort by start time -> 

		OR (once sorted by start time):
		Node#1 end - start = Node#1_diff
		Add Node#1_diff to Node#2 start & end
		Repeat:
		Node#2 end - start = Node#2_diff
		Add Node#2_diff to Node#3 start & end
		Repeat:
			Until:
			Node#n end >= 17:00:00 (5pm)
			Then: next day







// THIS IS FOR ONE SINGLE ARRAY (I.E. THE EVENTS ARRAY):

//node = a json object

// node1 = obj1
// nodeDiff = 
// nodePositiveDiff = space of time between events
// cachedNode = a node that has been taken out of the event or invite arrays due to it overunning 5pm
// cachedNodeDiff = length of time of a cached event (cachedNodeDiff = len of event)

// Get JSON
use axios with auth header 

// Then need to rename object parameter names so they work with the calendar plugin
Use map() to do this, just assigning the data to new property names in new array 

// Then need to remove dupes
Used a filter with map

// Then sort
just a simple sort via object start param

// Then we start rescheduling on event timings
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

// Then after each node sorted, check no events are after 5pm. If there are, remove and add to cache
if(node1(end) > 17:00:00) {                
  cachedNodeX concat or [...] or whatever. Add to cache.
  // Increment to next day
}
// OR make the event start at 9am the next day and sort from there

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

then check next event/invite and see if it overlaps with the next event/invite.

have chache var to store overlaps. after each node see if there is space between current node and the next one


HAVE:
- descriptive function names so you dont need to look at the code to know what it does.


TEST DATA:
      var test = [
        {
          title: "Meeting with Marketing",
          start: "2019-10-28 09:30:00",
          end: "2019-10-28 10:30:00"
        },
        {
          title: "Canidate Interview",  // Clashes with 3
          start: "2019-10-28 10:30:00",
          end: "2019-10-28 12:00:00"
        },
        {
          title: "Canidate Interview",  // Clashes with 2
          start: "2019-10-28 10:30:00",
          end: "2019-10-28 12:00:00"
        },
        {
          title: "Canidate Interview 2",  // Time clashes with 2 & 3
          start: "2019-10-28 10:30:00",
          end: "2019-10-28 12:00:00"
        },
        {
          title: "Canidate Interview",
          start: "2019-10-28 11:30:00",   // This isn't a duplicate
          end: "2019-10-28 12:00:00"
        },
        {
          title: "FDSE SCRUM",
          start: "2019-10-30 14:15:00",
          end: "2019-10-28 14:45:00"
        }
      ];

How to make this all better:
Differentiate between the event and invite arrays. Append an empty obj to the end and scan for it?