class notesModal extends HTMLElement {
  constructor() {
    super();

    this._style = document.createElement('style');
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
notes-modal {
  background-color: rgba(0, 0, 0, 0.4196078431);
  display: none;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

notes-modal .modal .top-modal {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
}
notes-modal .modal .top-modal h2 {
  margin: 0;
}
notes-modal .modal .top-modal .close-modal {
  cursor: pointer;
  font-size: 1.5em;
}
notes-modal .modal form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

notes-modal .modal form label{
  font-weight: 900;
  margin-top: 25px;
}
notes-modal .modal form input[type=text] {
  padding: 10px;
  border-radius: 0.5rem;
}
notes-modal .modal form textarea {
  padding: 10px;
  border-radius: 0.5rem;
  max-width: 100%;
  min-width: 100%;
  max-height: 300px;
}
notes-modal .modal form input[type=submit] {
  margin-top: 25px;
  padding: 10px 20px;
  color: white;
  background-color: #f28d2f;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  width: -moz-max-content;
  width: max-content;
}
    `;
  }

  render() {
    this.updateStyle();

    this.innerHTML = `
      ${this._style.outerHTML}
        <div class="modal">
          <div class="top-modal">
            <h2>Add Notes</h2>
            <div class="close-modal">&#10006;</div>
          </div>
          <div class="add-notes-form">
            <form action="">
              <label for="title">Title</label>
              <input type="text" id="input-title" name="title" required />
              <label for="notes">Notes</label>
              <textarea
                name="notes"
                id="input-notes"
                rows="15"
                required
              ></textarea>
              <input type="submit" value="Add notes" id="submit-notes" />
            </form>
          </div>
        </div>
    `;
  }
}

customElements.define('notes-modal', notesModal);
