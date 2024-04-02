class NotesItem extends HTMLElement {
  constructor() {
    super();

    this._notes = {
      id: 0,
      title: 'NEED_TITLE',
      body: 'NEED_SHORT_DESCRIPTION',
      createdAt: 'MMM DD YYY',
      archived: false,
    };

    this._style = document.createElement('style');
  }

  setNote(value) {
    this._notes = value;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
    notes-item {
        display: flex;
        justify-content: space-between;
        background: #f8edc8;
        border-radius: 1rem;
        padding: 10px;
        // overflow: hidden;
    }

    .description {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 1rem;
        flex: 4;
    }

    .description h3.notes-title {
        margin: 0;
        font-weight: 600;
        font-size: 1em;
        line-height: 1.2em;
        word-break: break-all;
    }
    .description p.notes-author {
        margin: 0;
        font-size: 0.8em;
        font-style: italic;
        color: #888888;
        word-break: break-all;
    }
    .description p.notes-time {
        margin: 0px;
        font-size: 0.8em;
        color: #888888;
    }
    .action {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: end;
        flex: 1;
    }
    .action i {
        font-size: 1em;
        cursor: pointer;
        // color: #888888;
    }`;
  }

  render() {
    this.updateStyle();

    const date = new Date(this._notes.createdAt);

    const formattedDate = date.toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    this.innerHTML = `
      ${this._style.outerHTML}
        <div class="description">
            <h3 class="notes-title">${this._notes.title}</h3>
            <p class="notes-author">${this._notes.body}</p>
            <p class="notes-time">${formattedDate}</p>
        </div>
        <div class="action">
            <i class="fa-solid fa-box-archive archivebutton archived-${this._notes.archived}"
            id="${this._notes.id}"></i>
            <i class="fa-solid fa-trash-can removebutton remove-archived-${this._notes.archived}" id="${this._notes.id}"></i>
        </div>
    `;
  }
}

customElements.define('notes-item', NotesItem);
