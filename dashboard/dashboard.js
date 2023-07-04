function updateTotal(sessionLength) {
  console.log(sessionLength);
  const totalTime = parseFloat(localStorage.getItem('totalTime')) || 0;
  const newTotalTime = totalTime + sessionLength;
  localStorage.setItem('totalTime', newTotalTime.toString());
  console.log(newTotalTime);
  document.getElementById('totalTime').textContent = newTotalTime;
}

function PracticeSession(date, pieces, notes, sessionLength, startsAt, endsAt) {
  this.date = date;
  this.pieces = pieces;
  this.notes = notes;
  this.sessionLength = sessionLength;
  this.startsAt = startsAt;
  this.endsAt = endsAt;
}

PracticeSession.prototype.render = function () {
  const card = document.createElement('div');
  card.classList.add('session');
  const [year, month, day] = this.date.split('-').map(Number);
  const localDate = new Date(year, month - 1, day).toLocaleDateString();
  card.innerHTML = `
    <h3>${localDate}: ${this.pieces}</h3>
    <p>${this.sessionLength} minutes</p>
    <p>${this.notes}</p>
    `;
  document.getElementById('sessionsList').appendChild(card);
};

function submitForm(e) {
  const date = document.getElementById('date').value;
  const pieces = document.getElementById('pieces').value;
  const notes = document.getElementById('notes').value;
  const startTime = document.getElementById('startTime').value;
  const endTime = document.getElementById('endTime').value;

  const [year, month, day] = date.split('-').map(Number);
  const sessionDate = new Date(year, month - 1, day);
  const utcDate = sessionDate.toISOString().split('T')[0];

  const now = new Date();
  if (sessionDate > now) {
    alert('The date cannot be in the future.');
    return;
  }

  if (!pieces.trim()) {
    alert('The pieces/songs field cannot be empty.');
    return;
  }

  const sessionStart = new Date(`${date}T${startTime}`);
  const sessionEnd = new Date(`${date}T${endTime}`);
  const sessionLength = calculateSessionLength(sessionStart, sessionEnd);

  updateTotal(sessionLength);

  const session = new PracticeSession(
    utcDate,
    pieces,
    notes,
    sessionLength,
    startTime,
    endTime
  );

  let sessions = JSON.parse(localStorage.getItem('sessions')) || [];
  sessions.push(session);
  localStorage.setItem('sessions', JSON.stringify(sessions));

  session.render();
  document.getElementById('sessionForm').reset();
}

function calculateSessionLength(start, end) {
  const sessionLength = (end.getTime() - start.getTime()) / 1000 / 60;
  return sessionLength;
}

document.addEventListener('DOMContentLoaded', function () {
  const totalTime = parseFloat(localStorage.getItem('totalTime')) || 0;
  document.getElementById('totalTime').textContent = totalTime;

  let sessions = JSON.parse(localStorage.getItem('sessions')) || [];
  sessions = sessions.map(
    (session) =>
      new PracticeSession(
        session.date,
        session.pieces,
        session.notes,
        session.sessionLength,
        session.startsAt,
        session.endsAt
      )
  );
  sessions.forEach((session) => session.render());
});

document.getElementById('sessionForm').addEventListener('submit', submitForm);

let modal = document.getElementById('myModal');
let btn = document.getElementById('myBtn');
let span = document.getElementsByClassName('close')[0];

btn.onclick = function () {
  modal.style.display = 'block';
};

span.onclick = function () {
  modal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
