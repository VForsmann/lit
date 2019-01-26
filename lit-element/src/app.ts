import { LitElement, html, customElement, property } from 'lit-element';

@customElement('app-listentry')
class AppListEntry extends LitElement {
    @property() name = '';
    @property() todo = '';
  render() {
    return html`
      <p>Name: ${this.name}</p>
      <p>You have to do: ${this.todo}</p>
    `;
  }
}
