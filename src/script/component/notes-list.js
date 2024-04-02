class NotesList extends HTMLElement {
  constructor() {
    super();

    this._noteslist = [];

    this._style = document.createElement('style');
  }

  setNoteList(value) {
    this._noteslist = value;

    this.render();
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
      notes-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 10px;
      }
    `;
  }

  render() {
    this.updateStyle();

    const noteItemElements = this._noteslist.map((item) => {
      const notes = document.createElement('notes-item');
      notes.setNote(item);

      return notes;
    });

    this.innerHTML = '';
    this.append(this._style, ...noteItemElements);
  }
}

customElements.define('notes-list', NotesList);
