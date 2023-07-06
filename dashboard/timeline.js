// Define the DayCard class. This represents a single day on the calendar.
// It takes a date, day of the week, and session length as input.
function DayCard(date, dayOfWeek, sessionLength) {
  // The date of the DayCard instance.
  this.date = new Date(date).getDate();

  // The day of the week of the DayCard instance.
  this.dayOfWeek = dayOfWeek;

  // The session length of the DayCard instance.
  this.sessionLength = sessionLength;
}

// Method to render the DayCard instance as a calendar card in HTML.
DayCard.prototype.render = function () {
  // Create a new 'div' element for the card.
  const card = document.createElement('div');

  // Set the card's class name.
  card.className = 'calendar-card';

  // Check if there are any sessions on the DayCard instance.
  // If there are, mark the card as having a session. Otherwise, mark it as not having a session.
  if (this.getDots()) {
    card.dataset.hasSession = 'true';
  } else {
    card.dataset.hasSession = 'false';
  }

  // Set the card's HTML content.
  card.innerHTML = `
    <div>${this.date}</div>
    <div>${this.dayOfWeek}</div>
    <div class="dots">${this.getDots()}</div>
  `;

  // Append the card to the 'timeline' element in the document.
  document.getElementById('timeline').appendChild(card);
};

// Method to return a visual representation of the session length.
DayCard.prototype.getDots = function () {
  // If the session length is 0, return an empty string.
  if (this.sessionLength === 0) {
    return '';
  }

  // Create a variable to store the visual representation of the session length.
  let dots = '';

  // Depending on the session length, set the value of 'dots' to a different number of bullet points.
  if (this.sessionLength > 0 && this.sessionLength <= 15) {
    dots = '•';
  } else if (this.sessionLength > 15 && this.sessionLength <= 30) {
    dots = '••';
  } else if (this.sessionLength > 30 && this.sessionLength <= 60) {
    dots = '••••';
  } else if (this.sessionLength > 60) {
    dots = '•••••';
  }

  // Return the visual representation of the session length.
  return dots;
};

// Define the PracticeTimeline class. This represents the overall timeline of practice sessions.
function PracticeTimeline() {
  // Retrieve the sessions from local storage and parse them as JSON. If there are no sessions, use an empty array.
  this.sessions = JSON.parse(localStorage.getItem('sessions')) || [];

  // Get the unique dates from the sessions.
  this.uniqueDates = this.extractUniqueDates();

  // Group the sessions by their dates.
  this.groupedSessions = this.groupSessionsByDate();
}

// Method to extract the unique dates from the sessions.
PracticeTimeline.prototype.extractUniqueDates = function () {
  // Use the reduce function to create an array of unique dates.
  const uniqueDates = this.sessions.reduce((acc, session) => {
    const date = session.date.split('T')[0];
    if (!acc.includes(date)) {
      acc.push(date);
    }
    return acc;
  }, []);

  // Sort the unique dates in ascending order.
  uniqueDates.sort();

  // Return the array of unique dates.
  return uniqueDates;
};

// Method```javascript
// Method to group the sessions by their dates.
PracticeTimeline.prototype.groupSessionsByDate = function () {
  // Create an object to store the grouped sessions.
  const grouped = {};

  // Iterate over the sessions.
  for (let i = 0; i < this.sessions.length; i++) {
    const session = this.sessions[i];
    const date = session.date.split('T')[0];

    // If the current date is not in the 'grouped' object, add it.
    // Otherwise, add the session length to the existing entry.
    if (!grouped[date]) {
      grouped[date] = session.sessionLength;
    } else {
      grouped[date] += session.sessionLength;
    }
  }

  // Return the 'grouped' object.
  return grouped;
};

// Method to initialize the PracticeTimeline instance.
PracticeTimeline.prototype.init = function () {
  // Get the start and end dates from the 'uniqueDates' array.
  let start = this.uniqueDates[0].split('-');
  let end = this.uniqueDates[this.uniqueDates.length - 1].split('-');

  // Create Date objects for the start and end dates.
  let startDate = new Date(start[0], start[1] - 1, start[2]);
  let endDate = new Date(end[0], end[1] - 1, end[2]);

  // Iterate over each day between the start date and the end date.
  for (
    let day = new Date(startDate);
    day <= endDate;
    day.setDate(day.getDate() + 1)
  ) {
    // Get the session length for the current day. If there are no sessions, use 0.
    const sessionLength =
      this.groupedSessions[day.toISOString().split('T')[0]] || 0;

    // Create a new DayCard instance for the current day and render it.
    let dayCard = new DayCard(
      day,
      day.toLocaleString('default', { weekday: 'short' }),
      sessionLength
    );

    dayCard.render();
  }
};

// When the document is loaded, create a new PracticeTimeline instance and initialize it.
document.addEventListener('DOMContentLoaded', function () {
  let practiceTimeline = new PracticeTimeline();
  practiceTimeline.init();
});
