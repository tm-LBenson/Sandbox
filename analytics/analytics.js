//* Define the PracticeStats constructor function
function PracticeStats() {
  // Retrieve practice sessions from local storage or initialize to an empty array if none exists
  this.sessions = JSON.parse(localStorage.getItem('sessions')) || [];

  // Group practice sessions by song
  this.groupedSessions = this.groupSessionsBySong();
}

//* Define initialization method for PracticeStats
PracticeStats.prototype.init = function () {
  // Loop through each song in groupedSessions and create a chart for each one
  for (let song in this.groupedSessions) {
    this.addChartForSong(song, this.groupedSessions[song]);
  }
};

//* Define method to group sessions by song
PracticeStats.prototype.groupSessionsBySong = function () {
  let groups = {};
  // Loop through each session
  this.sessions.forEach((session) => {
    // If the song already has a group, add the session to it
    if (groups[session.pieces]) {
      groups[session.pieces].push(session);
    } else {
      // Otherwise, create a new group for the song and add the session to it
      groups[session.pieces] = [session];
    }
  });
  // Return the grouped sessions
  return groups;
};

//* Define method to add a chart for a specific song
PracticeStats.prototype.addChartForSong = function (song, songSessions) {
  // Create a div to contain the chart
  let chartContainer = document.createElement('div');
  chartContainer.style.width = '400px';
  chartContainer.style.height = '400px';

  // Create a canvas element for the chart
  let canvas = document.createElement('canvas');
  chartContainer.appendChild(canvas);

  // Add the chart container to the DOM
  document.getElementById('chartsContainer').appendChild(chartContainer);

  // Get the 2D rendering context for the canvas
  let ctx = canvas.getContext('2d');

  //* Create a new chart
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: songSessions.map((session) => session.date), // Use session dates as labels
      datasets: [
        {
          label: `Practice Time for ${song}`, // Label for the dataset
          data: songSessions.map((session) => session.sessionLength), // Use session lengths as data
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
};

//* Add event listener for the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function () {
  // Instantiate a new PracticeStats object and initialize it
  let practiceStats = new PracticeStats();
  practiceStats.init();
});


