# Splunk FDSE React Exercise
This is an exercise designed to test your ability to add features that integrate an API into an existing application, while designing an appropriate algorithm to schedule new events.

Documentation for the API's you must connect to can be found [here](https://documenter.getpostman.com/view/731059/SW11VxZR?version=latest)

Tasks to complete:
- Show the meetings coming from the /events route on the calendar
- Retrieve the meetings coming from the /invites route on the calendar.
    - If the invited calendar events can be added to the existing calendar without a conflict, add them
    - If there are events with the same name but at different times, add them.
    - If there are events with the same name and same times, do not add them. Do not add exact duplicate events
    - Invites that have no conflicts, but are partially or fully outside business hours should be rescheduled.
    - You can assume that there will be a free day on the calendar
    - Invites can have conflicts with other invites


You can implement this using any method you see fit, using any external systems or libraries.  That being said, we are more concerned with your ability to write clean code and succint algorithims.

If you run into any issues, feel free to reach out via email at `fdse@splunk.com`.

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
