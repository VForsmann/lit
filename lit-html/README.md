# lit-html

- Is a `HTML-Templating-Library` for JS
  - Created by google working on the Polymer-Project
  - It splitted from Polymer

## Specification

https://lit-html.polymer-project.org

## Installation

`npm i lit-html`

## Propertys

- Based on Standards
  - WebComponents Templates
  - JS Tagged Templates
- Helps to efficently build and refresh DOM-Trees
- Very expressive
  - JS
  - Directives
  - Nesting of Templates
- Very lightweight
  - `Version 1.0.0-rc.2: 3.221 Byte`
  - Safe for XSS in default

# Basics

## Template Literale

- A Template Literal is a String-Literal, which owns JS Expressions
- Its limited by backticks, and JS Expressions are pit beteween `${..}`

```js
let firstName = 'John';
let lastName = 'Doe';
let template = `Hello ${firstName} ${lastName}!`;
console.log(template); // 'Hello John Doe!'
```

## Tagged Templates

- a tagged template is the call of a tag function with a template literal

```js
function highlight(strings, ...args) {
  let str = '';
  strings.forEach((string, i) => {
    str += args[i] ? `${string}<b>${args[i]}</b>` : `${string}`;
  });
  return str;
}
// This is a tagged template
let r = highlight`${'lit-html'} is cool`;
```

- strings contains an Array of Strings: `'', ' is cool'`
- args contains an Array of JS Expressions: `'lit-html'`
  - in this case its a string, but it also can be a complexer object

```js
let myTemplate = (data: Data) => highlight`
${data.a} and ${data.b} are cool`;
console.log(myTemplate({ a: 'JS', b: 'React' }));
console.log(myTemplate({ a: 'lit-html', b: 'LitElement' }));
```

- A function calling a tag function is called `Template-Function`
- In this example a template-literal Feature is, that the TemplateStringsArray-Object (so just the strings) are just created a single Time, not multiple times. So in both `console.log()` its the exact same object used as string literal in `hightlight`.

# The lit-html Tag-Function `html`

## General

```js
const value = 'lit-html';
const myTemplate = html`
  <h1>Hello from ${value}</h1>
`;
```

- very efficient and leightweight object `TemplateResult` is used
  - it safes the arguments it got called with
- you can also bind: Events, Attributes, Propertys and Template Result Objects
  - This means you can nest these Literals

```js
// Text
const myTemplate(data) = html`<h1>Hello ${data.name}</h1>`
// Event
html`<button @click=${(e) => console.log('clicked')}>Click Me</button>`
// Property
const myTemplate(data) = html`<div id=${data.id}></div>`;
// Boolean attributes
const myTemplate(data) = html`
<input type="checkbox" ?checked=${!data.checked}>`;
// Propertys
const myTemplate(data) = html`
<my-list .listItems=${data.items}></my-list>`
// Primitives
const value = 'lit-html';
const myTemplate = html`<h1>Hello from ${value}</h1>`;
// Template Result Objects
const header = html`<h1>Header</h1>`;
const myTemplate = html`${header}<p>This is some text</p>`;
```

## Allowed Values

- DOM-Nodes

```js
const div = document.createElement('div');
const myTemplate = html`
  ${div}
  <p>p content</p>
`;
```

## Conditional Rendering

```js
html`
  ${
    value
      ? html`
          ${value}
        `
      : html`
          Nothing
        `
  }
`;
```

## map

```js
const myTemplate = strings => html`
  <ul>
    ${
      strings.map(
        s =>
          html`
            <li>${s}</li>
          `
      )
    }
  </ul>
`;
```

## The lit-html Function `render`

```js
render(myTemplate({ a: 'lit-html', b: 'LitElement' }), document.body);
```

- in its first call you will create the DOM Elements and add them
- after that a call will update the DOM-Element
- rendering is lazy: very performant
  - Just render will create the DOM-Element, not the Template Function `html`
  - It will just update the necessary parts, not render everything again

## directives

There are multiple usefull directives to use in lit-html, e.g. to get a heigher performance with the `repeat`-directive.

To find them view here:

https://lit-html.polymer-project.org/guide/template-reference#built-in-directives
