React app for Splunk Interview/Exercise.

----------------------------------------------------------------------------------------------------
Notes
----------------------------------------------------------------------------------------------------
Note conflicts:
Meetings with marketing & HR conflict. As event is here first, reschedule the invite to a later time.

Implement validation: Some meetings have impossible times, such as the one with FDSE SCRUM. Can't finish before it's started.
    Use js Date() or smth. 
    New rule: If this happens, assume meeting takes place over the course of the startTime date & overwrite endTime with startTime date...
    ...OR do not use and throw error...
    Decide or ask Splunk guys.

----------------------------------------------------------------------------------------------------
Process
----------------------------------------------------------------------------------------------------
API:
First: Import the events. Assume these can be in conflict with each other - check rules provided by instructions.
    Sort conflicts by re-scheduling events throughout work week & within work hours.
Second: Import invites. Assume conflicts - check rules provided by instructions.
    Sort conflicts by same method as above.

----------------------------------------------------------------------------------------------------
Implementation
----------------------------------------------------------------------------------------------------
Create a basic calendar app in React
Import events from API
    Run validation on these to prevent bad dates/conflicts
    Reschedule these
    Display events
Import invites from API (Press button event to do so or just automatically?)
    Run Validation as before but also on pre-existing events
    Reschedule
    Display invites
Button to refresh? Do this after...

Events:

[
    {
        "name": "Meeting with Marketing",
        "startTime": "2019-10-28 09:30:00",
        "endTime": "2019-10-28 10:30:00"
    },
    {
        "name": "Canidate Interview",
        "startTime": "2019-10-28 10:30:00",
        "endTime": "2019-10-28 12:00:00"
    },
    {
        "name": "FDSE SCRUM",
        "startTime": "2019-10-30 14:15:00",
        "endTime": "2019-10-28 14:45:00"
    },
    {
        "name": "Engineering Party",
        "startTime": "2019-10-31 22:00:00",
        "endTime": "2019-10-31 24:30:00"
    },
    {
        "name": "Coffee with Joe",
        "startTime": "2019-11-01 08:00:00",
        "endTime": "2019-11-01 10:00:00"
    }
]

Invites:

[
    {
        "name": "Meeting with HR",
        "startTime": "2019-10-28 09:30:00",
        "endTime": "2019-10-28 10:30:00"
    },
    {
        "name": "Machine Learning TedTalk",
        "startTime": "2019-10-29 10:30:00",
        "endTime": "2019-10-29 12:30:00"
    },
    {
        "name": "Sales QBR",
        "startTime": "2019-10-30 16:00:00",
        "endTime": "2019-10-30 17:45:00"
    }
]
