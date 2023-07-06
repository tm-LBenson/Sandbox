// Define the PracticeTracker constructor function
function PracticeTracker() {
  this.modal = document.getElementById('myModal');
  this.addMusicPracticeBtn = document.getElementById('myBtn');
  this.modalCloseBtn = document.getElementsByClassName('close')[0];
  this.musicPracticeForm = document.getElementById('sessionForm');
}
// Define the initialization method for the PracticeTracker
PracticeTracker.prototype.initializeTracker = function () {
  // Bind click and submit events
  this.bindEvents();
  // Load any saved music practice data from localStorage
  this.loadSavedMusicPractices();
};
// Define the method to bind events
PracticeTracker.prototype.bindEvents = function () {
  let self = this; // Store context for callback functions

  // Show the modal when the "Add Music Practice" button is clicked
  this.addMusicPracticeBtn.onclick = function () {
    self.modal.style.display = 'block';
  };
  // Hide the modal when the close button is clicked
  this.modalCloseBtn.onclick = function () {
    self.modal.style.display = 'none';
  };

  // Hide the modal if clicked outside of it
  window.onclick = function (event) {
    if (event.target === self.modal) {
      self.modal.style.display = 'none';
    }
  };
  // Handle the form submission
  this.musicPracticeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    self.handleMusicPracticeFormSubmit(e);
  });
};

// Define the method to update the total practice time stored in localStorage
PracticeTracker.prototype.updateTotalPracticeTime = function (
  musicPracticeLength
) {
  let totalTime = parseFloat(localStorage.getItem('totalTime')) || 0;
  let newTotalTime = totalTime + musicPracticeLength;
  localStorage.setItem('totalTime', newTotalTime.toString());
  document.getElementById('totalTime').textContent = newTotalTime;
};

// Define the method to handle the form submission
PracticeTracker.prototype.handleMusicPracticeFormSubmit = function (e) {
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
  const musicPracticeLength = this.calculateMusicPracticeLength(
    sessionStart,
    sessionEnd
  );

  this.updateTotalPracticeTime(musicPracticeLength);

  const musicPractice = new MusicPractice(
    utcDate,
    pieces,
    notes,
    musicPracticeLength,
    startTime,
    endTime
  );

  let musicPractices = JSON.parse(localStorage.getItem('sessions')) || [];
  musicPractices.push(musicPractice);
  localStorage.setItem('sessions', JSON.stringify(musicPractices));

  musicPractice.renderMusicPracticeCard();
  document.getElementById('sessionForm').reset();
};

// Define the method to calculate the length of a music practice session
PracticeTracker.prototype.calculateMusicPracticeLength = function (start, end) {
  let musicPracticeLength = (end.getTime() - start.getTime()) / 1000 / 60;
  return musicPracticeLength;
};

// Define the method to load saved music practices from localStorage
PracticeTracker.prototype.loadSavedMusicPractices = function () {
  let totalTime = parseFloat(localStorage.getItem('totalTime')) || 0;
  document.getElementById('totalTime').textContent = totalTime;

  let musicPracticesData = JSON.parse(localStorage.getItem('sessions')) || [];
  let musicPractices = [];
  for (let i = 0; i < musicPracticesData.length; i++) {
    let musicPractice = new MusicPractice(
      musicPracticesData[i].date,
      musicPracticesData[i].pieces,
      musicPracticesData[i].notes,
      musicPracticesData[i].sessionLength,
      musicPracticesData[i].startTime,
      musicPracticesData[i].endTime
    );
    musicPractices.push(musicPractice);
  }

  for (let i = 0; i < musicPractices.length; i++) {
    musicPractices[i].renderMusicPracticeCard();
  }
};

// Define the MusicPractice constructor function
function MusicPractice(
  date,
  pieces,
  notes,
  musicPracticeLength,
  startsAt,
  endsAt
) {
  this.date = date;
  this.pieces = pieces;
  this.notes = notes;
  this.musicPracticeLength = musicPracticeLength;
  this.startsAt = startsAt;
  this.endsAt = endsAt;
}

// Define the method to render a music practice card
MusicPractice.prototype.renderMusicPracticeCard = function () {
  let card = document.createElement('div');
  card.classList.add('session');
  let [year, month, day] = this.date.split('-').map(Number);
  let localDate = new Date(year, month - 1, day).toLocaleDateString();
  card.innerHTML = `
    <h3>${localDate}: ${this.pieces}</h3>
    <p>${this.musicPracticeLength} minutes</p>
    <p>${this.notes}</p>
    `;
  document.getElementById('musicPracticesList').prepend(card);
};

// Instantiate the PracticeTracker and initialize it
let practiceTracker = new PracticeTracker();
practiceTracker.initializeTracker();
