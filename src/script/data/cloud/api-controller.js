import Utils from '../../utils';
import Swal from 'sweetalert2';
const NOTES_BASE_URL = 'https://notes-api.dicoding.dev/v2';
const archivedDataBtn = document.getElementById('archived-notes');
const backArchivedDataBtn = document.getElementById('back-archived');
const title = document.getElementById('isarchived-title');

// Get All Unarchive Data Function
const getData = async () => {
  try {
    const response = await fetch(`${NOTES_BASE_URL}/notes`);
    const responseJson = await response.json();
    if (responseJson.error) {
      showResponseMessage(responseJson.message);
    } else {
      renderNotes(responseJson.data);
      archivedDataBtn.style.display = 'block';
      backArchivedDataBtn.style.display = 'none';
      title.innerText = 'Notes';
    }
  } catch (error) {
    showResponseMessage(error, true);
  }
};

// Get All Archive Data Function
const getArchiveData = async () => {
  try {
    const response = await fetch(`${NOTES_BASE_URL}/notes/archived`);
    const responseJson = await response.json();
    if (responseJson.error) {
      showResponseMessage(responseJson.message);
    } else {
      renderNotes(responseJson.data);
      archivedDataBtn.style.display = 'none';
      backArchivedDataBtn.style.display = 'block';
      title.innerText = 'Archived';
    }
  } catch (error) {
    showResponseMessage(error, true);
  }
};

// Remove Item Data Function
const removeUnarchiveItem = (event) => {
  const notesId = event.target.id;
  deleteData(notesId, false);
};

const removeArchiveItem = (event) => {
  const notesId = event.target.id;
  deleteData(notesId, true);
};

const deleteData = async (noteId, isArchived = true) => {
  try {
    const response = await fetch(`${NOTES_BASE_URL}/notes/${noteId}`, {
      method: 'DELETE',
    });
    const responseJson = await response.json();
    showResponseMessage(responseJson.message);
    const button = document.getElementById('noteId');
    if (!isArchived) {
      getData();
      button.removeEventListener('click', removeUnarchiveItem());
    } else {
      getArchiveData();
      button.removeEventListener('clickk', removeArchiveItem());
    }
  } catch (error) {
    showResponseMessage(error, true);
  }
};

// Submit Item Data Function
const submitData = async (notes) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(notes),
    };
    const response = await fetch(`${NOTES_BASE_URL}/notes`, options);
    const responseJson = await response.json();
    showResponseMessage(responseJson.message);
    getData();
  } catch (error) {
    showResponseMessage(error, true);
  }
};

// Archive Item Function
const archiveData = async (notesId) => {
  try {
    const response = await fetch(`${NOTES_BASE_URL}/notes/${notesId}/archive`, {
      method: 'POST',
    });
    const responseJson = await response.json();
    showResponseMessage(responseJson.message);
    getData();
  } catch (error) {
    showResponseMessage(error, true);
  }
};

// Unarchive Item Function
const unarchiveData = async (notesId) => {
  try {
    const response = await fetch(`${NOTES_BASE_URL}/notes/${notesId}/unarchive`, {
      method: 'POST',
    });
    const responseJson = await response.json();
    showResponseMessage(responseJson.message);
    getArchiveData();
  } catch (error) {
    showResponseMessage(error, true);
  }
};

// Sweet Alert Message
const showResponseMessage = (message = 'Check your internet connection', error) => {
  let isError = null;
  if (error == true) {
    isError = 'error';
  } else {
    isError = 'success';
  }
  Swal.fire({
    title: message,
    icon: isError,
    confirmButtonText: 'Done',
    confirmButtonColor: '#f28d2f',
  });
};

// Render Function
function renderNotes(note) {
  // Loading Before Render
  const loadingElement = document.querySelector('loading-component');
  const isValue = note.length;
  if (isValue) {
    Utils.hideElement(loadingElement);
  } else if (!isValue) {
    loadingElement.innerHTML = `<p>Empty Notes</p>`;
    Utils.showElement(loadingElement);
  }

  // Choose Parent Element
  const notesListElement = document.querySelector('notes-list');
  notesListElement.setNoteList(note);

  // Operator To Archive Item
  const archiveBtn = document.querySelectorAll('.archived-false');
  archiveBtn.forEach((button) => {
    button.addEventListener('click', (event) => {
      const notesId = event.target.id;
      archiveData(notesId);
    });
  });

  // Operator To Unrchive Item
  const unArchiveBtn = document.querySelectorAll('.archived-true');
  unArchiveBtn.forEach((button) => {
    button.classList.replace('fa-box-archive', 'fa-rotate-left');
    button.addEventListener('click', (event) => {
      const notesId = event.target.id;
      unarchiveData(notesId);
    });
  });

  // Operator To Remove Item

  const removeBtn = document.querySelectorAll('.remove-archived-false');
  removeBtn.forEach((button) => {
    button.addEventListener('click', removeUnarchiveItem);
  });

  const archivedRemoveBtn = document.querySelectorAll('.remove-archived-true');
  archivedRemoveBtn.forEach((button) => {
    button.addEventListener('click', removeArchiveItem);
  });
}

export { getData, submitData, getArchiveData, showResponseMessage };
