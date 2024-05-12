# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

Please have a look:

https://git.mediasia.cn/vo2-apac-recruitment-tests/frontend/react-test

It also includes Figma password.

Figma: https://www.figma.com/file/OX9KUE33QGTyaSfpiBMsEN/%5BSlingshot%5D-Asteroids---Javascript-Development-Test (password: SlingshotToAsteroids).

Step 1
✔ This step is based solely on the "Step 1" on the figma
✔ In that step, the goal is to create a 1-page app that display the list of miners fetched from the backend. A click on a miner opens a popup with the history of the miner.
Notsure# The other main part of that step is to implement a websocket connection between the react app and the backend.

Step 2
This step is based on both "Step 2" on the figma
In that step, the goal is to update your 1-page app to contains multiple pages and a form.

Features

all features from step 1
✔ adding a menu to switch between pages
✔ adding an asteroid page list based on the result of the GET /asteroids
✔ adding a planet page list based on the result of the GET /planets
✔ a button "Create a miner" to be displayed on a miner whenever it got sufficient ressources
✔ adding a form to create a miner and send the result as a PUSH /miner + Implementation of a form validation
