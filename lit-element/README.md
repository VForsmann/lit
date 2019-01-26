# LitElement

- Using lit-heml as templating Engine
- With and without Shadow-DOM usable
- very lightweight: `version v2.0.0-rc.2: 5.471 Byte`
- Enables the Creation of lightweight Components
  - No framework
  - You can combine it with almost every other framework
- Restricted to autonome Custom Elements
  - No `is-Attribute`

## Basics

- Can be used with Decorators
- Extension proposal for ECMAScript

In Typescript: tsconfig.json

```json
"compilerOptions": { /* ... */ "experimentalDecorators": true /* ... */ }
```

## Introduction

- Create a Component as Subclass of `LitElement`

```ts
import { LitElement, html, customElement } from 'lit-element';
@customElement('my-element')
class MyElement extends LitElement {
  render() {
    return html`
      <p>Hello world!</p>
    `;
  }
}
// When no decorator possible, use:
// customElements.define('my-element', MyElement);
```

- this class has to implement the Method: render()
  - it has to return a TemplateResult-Object (`lit-html`)

When you want to disable the Shadow Tree you have to implement `createRenderRoot`

```ts
import { LitElement, html, customElement } from 'lit-element';
@customElement('my-element')
class MyElement extends LitElement {
  createRenderRoot() {
    return this;
  }
  render() {
    return html`
      <p>Hello world!</p>
    `;
  }
}
```

You can define propertys with the @property Decorator

```ts
import { LitElement, html, customElement, property } from 'lit-element';
@customElement('my-element')
class MyElement extends LitElement {
  @property() message = '';
  render() {
    return html`
      <p>${this.message}</p>
    `;
  }
}
```

```html
<my-element message="Hello World!"></my-element>
```

- this will take care about the (in WebComponents mentioned: `observedAttributes`) observation of this attribute.
- Changes in these attributes will automaticly call the rendering prozess asynchronous.

You can set property Options for this Decorator:

https://lit-element.polymer-project.org/guide/properties#property-options

When updating a Property it will bump the LitElement Lifecylce:

https://lit-element.polymer-project.org/guide/lifecycle

**hasChanged**

- Callback Method
- Called when property set
- needs to return true, otherwise abortion of update
- default true if value !== oldValue

**requestUpdate**

- triggers asynchronous Update of Component
- can be called manually

**performUpdate**

- can be overwritten to change the update-time

**shouldUpdate**

- can be overwritten to change the update-time

**update**

- calls Method render and updates all reflected attributes

**render**

- must be implemented by the component
- has to return TemplateResult-Object

**firstUpdated**

- called after first update of component

**updated**

- called after every update

**updateComplete**

- Property containing Primise which is fulfilled when update is finished. Than it returns true.

## Browser-Support

`npm i @webcomponents/webcomponentsjs`

polyfill.ts:

```ts
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '@webcomponents/webcomponentsjs/webcomponents-bundle';
```

tsconfig.json

```ts
"compilerOptions": {
"target": "es5",
"lib": [ "es2015", "dom" ],
"downlevelIteration": true,
// ...
}
```

webpack should then create a own Bundle for the polyfills, compiled to ES5:

```js
module.exports = {
  entry: { polyfills: './src/polyfills.ts', main: './src/index.ts' },
  // ...
  module: {
    rules: [
      { test: /\.ts$/, use: [{ loader: 'ts-loader' }] },
      {
        test: /\.js$/,
        use: [{ loader: 'ts-loader', options: { transpileOnly: true } }]
      }
      // ...
    ]
  }
  // ...
};
```
