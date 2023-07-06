// Define the PracticeStats constructor function
function PracticeStats() {
  // Retrieve practice sessions from local storage or initialize to an empty array if none exists
  this.sessions = JSON.parse(localStorage.getItem('sessions')) || [];

  // Group practice sessions by song
  this.groupedSessions = this.groupSessionsBySong();
}

// Define initialization method for PracticeStats
PracticeStats.prototype.init = function () {
  // Loop through each song in groupedSessions and create a chart for each one
  for (let song in this.groupedSessions) {
    this.addChartForSong(song, this.groupedSessions[song]);
  }
};

// Define method to group sessions by song
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

// Define method to add a chart for a specific song
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

  // Create a new chart
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

// Add event listener for the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function () {
  // Instantiate a new PracticeStats object and initialize it
  let practiceStats = new PracticeStats();
  practiceStats.init();
});
[{"date":"2023-06-24","pieces":"Serene Serenade","notes":"Started learning","sessionLength":10,"startTime":"14:30","endTime":"14:40"},{"date":"2023-06-25","pieces":"Rocking Rhapsody","notes":"Difficult rhythm sections","sessionLength":15,"startTime":"09:00","endTime":"09:15"},{"date":"2023-06-26","pieces":"Rocking Rhapsody","notes":"Practiced rhythm sections separately","sessionLength":10,"startTime":"13:00","endTime":"13:10"},{"date":"2023-06-28","pieces":"Rocking Rhapsody","notes":"Full piece run-through, some mistakes","sessionLength":5,"startTime":"18:00","endTime":"18:05"},{"date":"2023-06-27","pieces":"Mystic Melody","notes":"Learned first half","sessionLength":20,"startTime":"11:00","endTime":"11:20"},{"date":"2023-06-28","pieces":"Mystic Melody","notes":"Practice second half","sessionLength":15,"startTime":"15:00","endTime":"15:15"},{"date":"2023-06-29","pieces":"Mystic Melody","notes":"Full run-through, need to work on transitions","sessionLength":5,"startTime":"17:30","endTime":"17:35"},{"date":"2023-06-28","pieces":"Jazzy Journey","notes":"Work on rhythm pattern","sessionLength":15,"startTime":"12:00","endTime":"12:15"},{"date":"2023-06-29","pieces":"Jazzy Journey","notes":"More comfortable with rhythm","sessionLength":10,"startTime":"14:00","endTime":"14:10"},{"date":"2023-06-30","pieces":"Jazzy Journey","notes":"Full run-through of the piece","sessionLength":5,"startTime":"16:45","endTime":"16:50"},{"date":"2023-06-30","pieces":"Moonlit Sonata","notes":"Practice scales and arpeggios","sessionLength":30,"startTime":"10:00","endTime":"10:30"},{"date":"2023-07-02","pieces":"Moonlit Sonata","notes":"Slow tempo practice","sessionLength":25,"startTime":"19:30","endTime":"19:55"},{"date":"2023-07-02","pieces":"Moonlit Sonata","notes":"Improved tempo, smoother transitions","sessionLength":10,"startTime":"18:10","endTime":"18:20"},{"date":"2023-07-03","pieces":"New Song","notes":"This was an easy song to song","sessionLength":60,"startTime":"18:39","endTime":"19:39"}]