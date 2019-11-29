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





go through both lists linearly:
(two lists. one with events the other with invites)
take first node and check if there is an event that clashes.
	if it doesn't, add this to new array
then check next event/invite and see if it overlaps with the next event/invite.

have chache var to store overlaps. after each node see if there is space between current node and the next one


HAVE:
- descriptive function names so you dont need to look at the code to know what it does.


