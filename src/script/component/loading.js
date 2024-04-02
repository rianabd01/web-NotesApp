class Loading extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const loading = document.createElement('p');
    loading.innerText = 'Loading . . .';

    this.append(loading);
  }
}

customElements.define('loading-component', Loading);
