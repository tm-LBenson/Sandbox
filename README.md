# Practice Session Tracker

Practice Session Tracker is a JavaScript application that allows musicians to log and track their practice sessions. This application uses the browser's local storage to save the practice session data, and Chart.js to create visual representations of the data.

## Features

1. **Log Practice Sessions**: The application enables users to log a practice session with the following details: date of the session, pieces/songs practiced, any notes made during the session, start and end times.

2. **Track Total Time**: The application keeps track of the total time spent on all practice sessions.

3. **Session Details**: Each practice session is displayed with all its details for easy reference. The application also prevents users from setting a session in the future or a session with the start time being later than the end time.

4. **Persistent Data**: The application saves all practice session data in the browser's local storage, allowing the user to access their session history even after closing the browser.

5. **UTC Support**: The application stores session dates in UTC, but displays them according to the user's local time zone.

6. **Data Visualization with Chart.js**: The application uses Chart.js to create bar graphs that display a visual breakdown of each practice session compiled per song. This feature provides users with an at-a-glance overview of their practice history.

## Future Enhancements

- **Option to Delete a Practice Session**: This feature will enable the user to delete a specific practice session if it's no longer needed.
- **Option to Edit a Practice Session**: This will allow the user to modify the details of a previously recorded practice session.
- **Grouping of Practice Session Cards**: This will enhance the user experience by grouping practice sessions by each day onto a parent card, making it easier to view and manage multiple practice sessions from the same day.
- **Enhanced User Interface**: Plan to upgrade the UI/UX using a modern UI library/framework for better user experience.
- **Data Persistence Across Devices**: Currently, the data is only stored locally and available only on the same browser. Future enhancements will include storing the data in a remote database so it can be accessed across different browsers and devices.

These enhancements will make the Practice Session Tracker more flexible and user-friendly, and provide a more robust solution for tracking practice sessions.
