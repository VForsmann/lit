import { html, render } from 'lit-html';

// General Example
const myTemplate = data =>
  html`
    <p><b>${data.a}</b> and <b>${data.b}</b> are dynamic content</p>
    ${data.c}
  `;
const myDiv = document.getElementById('myDiv');

render(
  myTemplate({
    a: 'This here',
    b: 'this here',
    c: html`
      <button @click=${e => alert('clicked')}>Click me</button>
    `
  }),
  myDiv
);

// Attribute Binding
const myAttributeTemplate = data =>
  html`
    <div id=${data.id}>Div with ID</div>
  `;
render(
  myAttributeTemplate({ id: 5 }),
  document.getElementById('AttributeBinding')
);

// Data Binding: XSS Security

const value = '<b>lit-html</b>';
const myXSSTemplate = value =>
  html`
    <p>Hello from ${value}</p>
  `;

render(
  myXSSTemplate('<b>lit-html</b>'),
  document.getElementById('XSS_Security')
);

// Conditional Rendering

const ConditionalRendering = user =>
  html`
    ${
      user.isloggedIn
        ? html`
            Welcome ${user.name}
          `
        : html`
            Please log in
          `
    }
  `;

render(
  ConditionalRendering({ isloggedIn: true, name: 'Harry Hacker' }),
  document.getElementById('ConditionalRendering')
);

// Map

const myMap = items => html`
  <ul>
    ${
      items.map(
        i =>
          html`
            <li>${i}</li>
          `
      )
    }
  </ul>
`;

render(myMap(['item1', 'item2', 'item3']), document.getElementById('Map'));
