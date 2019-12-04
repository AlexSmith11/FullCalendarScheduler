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





	Then re introduce events back into main array, then the same with invites

then check next event/invite and see if it overlaps with the next event/invite.

have chache var to store overlaps. after each node see if there is space between current node and the next one


HAVE:
- descriptive function names so you dont need to look at the code to know what it does.


