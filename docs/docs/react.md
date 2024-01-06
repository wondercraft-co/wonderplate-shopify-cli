# Guide to add React to your project

::: danger
Are you sure you want to kill a fly with a bazooka?
:::

To use React in your project you need to install the `react` package and the `@vitejs/plugin-react` plugin.

```bash
npm install react react-dom
```

```bash
npm install -D @vitejs/plugin-react
```

Add the vite plugin to the `vite.config.ts` file

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()]
})
```

Create a new react component somewhere in the `_src/js` folder

```jsx
// _src/js/react/App.jsx
import React from 'react'

export default function App() {
  return (
    <div>
      <h1>Hello React!</h1>
    </div>
  )
}
```

And import the component and initialize React in the main js entry file `_src/js/app.js` file

```js
import React from "react";
import ReactDOM from "react-dom";
import AppReact from "./react/AppReact.jsx";

const root = ReactDOM.createRoot(document.getElementById('reactApp'));
root.render(React.createElement(AppReact, null));
```

