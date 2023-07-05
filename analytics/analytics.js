function PracticeStats() {
  this.sessions = JSON.parse(localStorage.getItem('sessions')) || [];
  this.groupedSessions = this.groupSessionsBySong();
}

PracticeStats.prototype.init = function () {
  for (let song in this.groupedSessions) {
    this.addChartForSong(song, this.groupedSessions[song]);
  }
};

PracticeStats.prototype.groupSessionsBySong = function () {
  let groups = {};
  this.sessions.forEach((session) => {
    if (groups[session.pieces]) {
      groups[session.pieces].push(session);
    } else {
      groups[session.pieces] = [session];
    }
  });
  return groups;
};

PracticeStats.prototype.addChartForSong = function (song, songSessions) {
  let chartContainer = document.createElement('div');
  chartContainer.style.width = '400px';
  chartContainer.style.height = '400px';

  let canvas = document.createElement('canvas');
  chartContainer.appendChild(canvas);

  document.getElementById('chartsContainer').appendChild(chartContainer);

  let ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: songSessions.map((session) => session.date),
      datasets: [
        {
          label: `Practice Time for ${song}`,
          data: songSessions.map((session) => session.sessionLength),
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

document.addEventListener('DOMContentLoaded', function () {
  let practiceStats = new PracticeStats();
  practiceStats.init();
});
