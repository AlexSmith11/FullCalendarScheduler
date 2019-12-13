# Full Calendar Event Scheduler
This is essentially a binary sort of an array of event objects for full calendar
It is for a specific use case, where you have two API's that supply:
    - Already confirmed 'events' that you do not wish to move
    - Invites that you wish to merge into your list of original events, sorted so there are no clashes.
It also performs other minor functions, such as sorting so that the new invites are within work hours.

The following are a list of tasks I set myself to to complete:
- Show the meetings coming from the /events route on the calendar
- Retrieve the meetings coming from the /invites route on the calendar.
    - If the invited calendar events can be added to the existing calendar without a conflict, add them
    - If there are events with the same name but at different times, add them.
    - If there are events with the same name and same times, do not add them. Do not add exact duplicate events
    - Invites that have no conflicts, but are partially or fully outside business hours should be rescheduled.
    - You can assume that there will be a free day on the calendar
    - Invites can have conflicts with other invites

# Todo's:
- convert moment objects in the start and end parameters back into Date() string format.
- Then add these to the calendar state.
- Create an iterface where users can make their own events, which then get sorted/merged into the calendar state.
- Display this all on my website.

## Available Scripts

In the project directory, you can run:

### `yarn`

**Run this before you begin as it loads required packages**

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
