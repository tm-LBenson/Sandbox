function DayCard(date, dayOfWeek, sessionLength) {
  this.date = new Date(date).getDate();
  this.dayOfWeek = new Date(date).toLocaleString('default', {
    weekday: 'short',
  });
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

  for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
    const sessionLength = groupedSessions[day.toISOString().split('T')[0]] || 0;
    let dayCard = new DayCard(
      day,
      day.toLocaleString('default', { weekday: 'short' }),
      sessionLength
    );
    dayCard.render();
  }
});
