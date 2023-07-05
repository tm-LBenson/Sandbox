function DayCard(date, dayOfWeek, sessionLength) {
  this.date = new Date(date).getDate();
  this.dayOfWeek = dayOfWeek;
  this.sessionLength = sessionLength;
}

DayCard.prototype.render = function () {
  const card = document.createElement('div');
  card.className = 'calendar-card';

  if (this.getDots()) {
    card.dataset.hasSession = 'true';
  } else {
    card.dataset.hasSession = 'false';
  }

  card.innerHTML = `
    <div>${this.date}</div>
    <div>${this.dayOfWeek}</div>
    <div class="dots">${this.getDots()}</div>
  `;

  document.getElementById('timeline').appendChild(card);
};

DayCard.prototype.getDots = function () {
  if (this.sessionLength === 0) {
    return '';
  }

  let dots = '';

  if (this.sessionLength > 0 && this.sessionLength <= 15) {
    dots = '•';
  } else if (this.sessionLength > 15 && this.sessionLength <= 30) {
    dots = '••';
  } else if (this.sessionLength > 30 && this.sessionLength <= 60) {
    dots = '••••';
  } else if (this.sessionLength > 60) {
    dots = '•••••';
  }

  return dots;
};

function PracticeTimeline() {
  this.sessions = JSON.parse(localStorage.getItem('sessions')) || [];
  this.uniqueDates = this.extractUniqueDates();
  this.groupedSessions = this.groupSessionsByDate();
}

PracticeTimeline.prototype.extractUniqueDates = function () {
  const uniqueDates = this.sessions.reduce((acc, session) => {
    const date = session.date.split('T')[0]; // split to get only the date
    if (!acc.includes(date)) {
      acc.push(date);
    }
    return acc;
  }, []);

  uniqueDates.sort();

  return uniqueDates;
};

PracticeTimeline.prototype.groupSessionsByDate = function () {
  const grouped = {};

  for (let i = 0; i < this.sessions.length; i++) {
    const session = this.sessions[i];
    const date = session.date.split('T')[0];
    if (!grouped[date]) {
      grouped[date] = session.sessionLength;
    } else {
      grouped[date] += session.sessionLength;
    }
  }

  return grouped;
};

PracticeTimeline.prototype.init = function () {
  let start = this.uniqueDates[0].split('-');
  let end = this.uniqueDates[this.uniqueDates.length - 1].split('-');

  let startDate = new Date(start[0], start[1] - 1, start[2]);
  let endDate = new Date(end[0], end[1] - 1, end[2]);

  for (
    let day = new Date(startDate);
    day <= endDate;
    day.setDate(day.getDate() + 1)
  ) {
    const sessionLength =
      this.groupedSessions[day.toISOString().split('T')[0]] || 0;

    let dayCard = new DayCard(
      day,
      day.toLocaleString('default', { weekday: 'short' }),
      sessionLength
    );

    dayCard.render();
  }
};

document.addEventListener('DOMContentLoaded', function () {
  let practiceTimeline = new PracticeTimeline();
  practiceTimeline.init();
});
