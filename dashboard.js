function calculateSessionLength(startTime, endTime) {
  const start = new Date(`1970-01-01T${startTime}`);
  const end = new Date(`1970-01-01T${endTime}`);
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
  const date = document.getElementById('date').value;
  const pieces = document.getElementById('pieces').value;
  const notes = document.getElementById('notes').value;
  const startTime = document.getElementById('startTime').value;
  const endTime = document.getElementById('endTime').value;
  const [year, month, day] = date.split('-').map(Number);
  const sessionDate = new Date(Date.UTC(year, month - 1, day));
  const utcDate = sessionDate.toISOString().split('T')[0];
  const start = new Date(`1970-01-01T${startTime}`);
  const end = new Date(`1970-01-01T${endTime}`);

  const now = new Date();
  if (sessionDate > now) {
    alert('The date cannot be in the future.');
    return;
  }

  if (start >= end) {
    alert('The start time must be before the end time.');
    return;
  }

  if (!pieces.trim()) {
    alert('The pieces/songs field cannot be empty.');
    return;
  }

  const sessionLength = calculateSessionLength(startTime, endTime);
  updateTotal(sessionLength);

  const session = {
    date: utcDate,
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
  const localDate = new Date(session.date).toLocaleDateString();
  sessionDiv.innerHTML = `
    <h3>${localDate}: ${session.pieces}</h3>
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
