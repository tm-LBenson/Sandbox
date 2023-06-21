function calculateSessionLength(startTime, endTime) {
  const start = new Date(`1970-01-01T${startTime}Z`);
  const end = new Date(`1970-01-01T${endTime}Z`);
  const sessionLength = (end - start) / 1000 / 60;
  return sessionLength;
}

function updateTotal(sessionLength) {
  const totalTime = localStorage.getItem('totalTime') || '0';
  const newTotalTime = parseFloat(totalTime) + sessionLength;
  localStorage.setItem('totalTime', newTotalTime.toString());
  document.getElementById('totalTime').textContent = newTotalTime;
}

function submitForm(e) {
  e.preventDefault();

  const date = document.getElementById('date').value;
  const pieces = document.getElementById('pieces').value;
  const notes = document.getElementById('notes').value;
  const startTime = document.getElementById('startTime').value;
  const endTime = document.getElementById('endTime').value;

  const sessionLength = calculateSessionLength(startTime, endTime);
  updateTotal(sessionLength);

  const session = {
    date: date,
    pieces: pieces,
    notes: notes,
    sessionLength: sessionLength,
  };

  let sessions = JSON.parse(localStorage.getItem('sessions')) || [];
  sessions.push(session);
  localStorage.setItem('sessions', JSON.stringify(sessions));

  addSessionToDOM(session);
  document.getElementById('sessionForm').reset();
}

function addSessionToDOM(session) {
  const sessionDiv = document.createElement('div');
  sessionDiv.classList.add('session');
  sessionDiv.innerHTML = `
    <h3>${session.date}: ${session.pieces}</h3>
    <p>${session.sessionLength} minutes</p>
    <p>Notes: ${session.notes}</p>
  `;
  document.getElementById('sessionsList').appendChild(sessionDiv);
}

document.addEventListener('DOMContentLoaded', function () {
  const totalTime = parseFloat(localStorage.getItem('totalTime')) || 0;
  document.getElementById('totalTime').textContent = totalTime;

  let sessions = JSON.parse(localStorage.getItem('sessions')) || [];
  sessions.forEach((session) => addSessionToDOM(session));
});

document.getElementById('sessionForm').addEventListener('submit', submitForm);
