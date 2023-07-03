function DayCard(date, dayOfWeek, sessionLength) {
  this.date = new Date(date).getDate();
  this.dayOfWeek = dayOfWeek;
  this.sessionLength = sessionLength;
}

DayCard.prototype.render = function () {
  const card = document.createElement('div');
  card.className = 'calendar-card';
  card.dataset.hasSession = getDots(this.sessionLength) ? 'true' : 'false';
  card.innerHTML = `
    <div>${this.date}</div>
    <div>${this.dayOfWeek}</div>
    <div class="dots">${getDots(this.sessionLength)}</div>
  `;

  document.getElementById('timeline').appendChild(card);
};

function getDots(length) {
  if (length === 0) {
    return '';
  }

  let dots = '';

  if (length > 0 && length <= 15) {
    dots = '•';
  } else if (length > 15 && length <= 30) {
    dots = '••';
  } else if (length > 30 && length <= 60) {
    dots = '••••';
  } else if (length > 60) {
    dots = '•••••';
  }

  return dots;
}

function groupSessionsByDate(sessions) {
  const grouped = {};

  for (let i = 0; i < sessions.length; i++) {
    const session = sessions[i];
    const date = session.date.split('T')[0];
    if (!grouped[date]) {
      grouped[date] = session.sessionLength;
    } else {
      grouped[date] += session.sessionLength;
    }
  }

  return grouped;
}

document.addEventListener('DOMContentLoaded', function () {
  let sessions = JSON.parse(localStorage.getItem('sessions')) || [];
  let groupedSessions = groupSessionsByDate(sessions);

  const sortedDates = Object.keys(groupedSessions).sort();

  let startDate = new Date(sortedDates[0]);
  let endDate = new Date(sortedDates[sortedDates.length - 1]);

  for (
    let day = new Date(startDate);
    day <= endDate;
    day.setDate(day.getDate() + 1)
  ) {
    const sessionLength = groupedSessions[day.toISOString().split('T')[0]] || 0;
    let dayCard = new DayCard(
      new Date(day + 1),
      day.toLocaleString('default', { weekday: 'short' }),
      sessionLength
    );
    dayCard.render();
  }
});
[{"date":"2023-06-24","pieces":"Serene Serenade","notes":"Started learning","sessionLength":10,"startTime":"14:30","endTime":"14:40"},{"date":"2023-06-25","pieces":"Rocking Rhapsody","notes":"Difficult rhythm sections","sessionLength":15,"startTime":"09:00","endTime":"09:15"},{"date":"2023-06-26","pieces":"Rocking Rhapsody","notes":"Practiced rhythm sections separately","sessionLength":10,"startTime":"13:00","endTime":"13:10"},{"date":"2023-06-28","pieces":"Rocking Rhapsody","notes":"Full piece run-through, some mistakes","sessionLength":5,"startTime":"18:00","endTime":"18:05"},{"date":"2023-06-27","pieces":"Mystic Melody","notes":"Learned first half","sessionLength":20,"startTime":"11:00","endTime":"11:20"},{"date":"2023-06-28","pieces":"Mystic Melody","notes":"Practice second half","sessionLength":15,"startTime":"15:00","endTime":"15:15"},{"date":"2023-06-29","pieces":"Mystic Melody","notes":"Full run-through, need to work on transitions","sessionLength":5,"startTime":"17:30","endTime":"17:35"},{"date":"2023-06-28","pieces":"Jazzy Journey","notes":"Work on rhythm pattern","sessionLength":15,"startTime":"12:00","endTime":"12:15"},{"date":"2023-06-29","pieces":"Jazzy Journey","notes":"More comfortable with rhythm","sessionLength":10,"startTime":"14:00","endTime":"14:10"},{"date":"2023-06-30","pieces":"Jazzy Journey","notes":"Full run-through of the piece","sessionLength":5,"startTime":"16:45","endTime":"16:50"},{"date":"2023-06-30","pieces":"Moonlit Sonata","notes":"Practice scales and arpeggios","sessionLength":30,"startTime":"10:00","endTime":"10:30"},{"date":"2023-07-02","pieces":"Moonlit Sonata","notes":"Slow tempo practice","sessionLength":25,"startTime":"19:30","endTime":"19:55"},{"date":"2023-07-02","pieces":"Moonlit Sonata","notes":"Improved tempo, smoother transitions","sessionLength":10,"startTime":"18:10","endTime":"18:20"}]