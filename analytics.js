document.addEventListener('DOMContentLoaded', function () {
  let sessions = JSON.parse(localStorage.getItem('sessions')) || [];
  let groupedSessions = groupSessionsBySong(sessions);

  for (let song in groupedSessions) {
    addChartForSong(song, groupedSessions[song]);
  }
});

function groupSessionsBySong(sessions) {
  let groups = {};
  sessions.forEach((session) => {
    if (groups[session.pieces]) {
      groups[session.pieces].push(session);
    } else {
      groups[session.pieces] = [session];
    }
  });
  return groups;
}

function addChartForSong(song, songSessions) {
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
}
