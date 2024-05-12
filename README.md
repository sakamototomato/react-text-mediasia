# React + TypeScript + Vite

No considerationof production at this moment, only for local development, run below:)

> npm i

> npm run dev

## Run locally

npm run dev

### Step 1

This step is based solely on the "Step 1" on the figma

In that step, the goal is to

✔ create a 1-page app that display the list of miners fetched from the backend.
✔ A click on a miner opens a popup with the history of the miner.

<span style="display:block;text-align:left;color:orangered;">The other main part of that step is to implement a websocket connection between the react app and the backend.</span>

### Step 2

This step is based on both "Step 2" on the figma
In that step, the goal is to update your 1-page app to contains multiple pages and a form.

Features

all features from step 1

✔ adding a menu to switch between pages

✔ adding an asteroid page list based on the result of the GET /asteroids

✔ adding a planet page list based on the result of the GET /planets

✔ a button "Create a miner" to be displayed on a miner whenever it got sufficient ressources

✔ adding a form to create a miner and send the result as a PUSH /miner + Implementation of a form validation
