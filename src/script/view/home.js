import {
  getData,
  submitData,
  getArchiveData,
  showResponseMessage,
} from '../data/cloud/api-controller';

// DOM Modal Create Data
const addNotes = document.getElementById('add-notes');
addNotes.addEventListener('click', () => {
  const addNotesModal = document.querySelector('notes-modal');
  addNotesModal.style.display = 'flex';
  const closeNotesModal = document.querySelector('.close-modal');
  closeNotesModal.addEventListener('click', () => {
    addNotesModal.style.display = 'none';
  });
});

// Create Data
const submitNotes = document.getElementById('submit-notes');
submitNotes.addEventListener('click', (event) => {
  const inputTitle = document.getElementById('input-title');
  const inputNotes = document.getElementById('input-notes');
  if (inputTitle.value && inputNotes.value) {
    const notes = {
      title: inputTitle.value.toString(),
      body: inputNotes.value.toString(),
    };
    submitData(notes);
    inputTitle.value = null;
    inputNotes.value = null;
  } else {
    showResponseMessage('Data belum lengkap', true);
  }
  event.preventDefault();
});

// Switch Archived or Unarchived
const archivedDataBtn = document.getElementById('archived-notes');
const backArchivedDataBtn = document.getElementById('back-archived');
archivedDataBtn.addEventListener('click', () => {
  getArchiveData();
});

backArchivedDataBtn.addEventListener('click', () => {
  getData();
});

document.addEventListener('DOMContentLoaded', function () {
  // Render
  getData();
});
