# Asteroids Frontend Interview

<details>

<summary>Table of content</summary>

- [Program description](#program-description)
- [Rules](#rules)
  - [Map](#map)
  - [Time](#time)
  - [Planet](#planet)
  - [Miner](#miner)
  - [Asteroid](#asteroid)
  - [Mineral](#mineral)
- [Structure & Deliverables](#structure-deliverables)
  - [Frontend](#frontend)
  - [Backend](#backend)
    - [Online](#online)
    - [Local](#local)
- [Resources](#resources)
  - [Access figma file](#access-figma-file)

</details>


## Objective & deliverables

Build an asteroid mining simulation, using react and scss (or less) for the frontend, connecting to an express, node, websocket backend server (the backend server is provided by Slingshot at [asteroids-backend](https://git.mediasia-group.com/mediasia-interactive/asteroids-backend)).

Your deliverable is a react frontend, which reads and writes information from the backend from 2 sources:
- REST API
- Websocket

Please read carefully the rules below to understand what the backend does, and how you should reflect it on the frontend.

## Rules

The following rules are implemented in the backend, and the state of the backend should be reflected on the frontend.

The simulation starts with 3 planets, 20 asteroids and 9 miners.

Each miner is assigned to a specific planet. A miner is a spacecraft which can travel from its planet to an asteroid, and mine its minerals.
Each miner has a mineral carry capacity, a travel speed and a mining speed. Miners start the simulation from their origin planet, will travel to an asteroid, mine minerals, and return back to their planet to drop the minerals.

A planet can store minerals. Each planet can spawn new miner when it has enough resources. It takes 1000 minerals to spawn a new miner, and the minerals are removed from the planet.

Each asteroid has a limited quantity of minerals, which decreases when it is mined by a miner, up to depletion. 
An asteroid can be mined by only one miner at a time.

The simulation is based on an event loop, 1 second in real life equals 1 year in the simulation.

There is no final goal to reach. The goal is that the simulation works.

### Map

- The map is a grid of 1000 * 1000. The position of the planets, asteroids and miners is contained within this grid.
- A position on the map is a `int` ranging from `0` to `999`.

### Time

- One second (1000ms) in real life is 1 year in the simulation

### Planet

- A planet can store an infinite number of mineral.
- A planet has a position (`x`, `y`)
- A planet can spawn a miner
	- A planet can spawn a miner only when it has enough mineral (the cost to spawn a miner is `1000` minerals)
	- A planet can spawn an unlimited amount of miners, as long as it has enough minerals
	- When a miner is spawn, the amount of minerals (`1000` minerals) is substracted from the planet's total mineral storage (the mineral can never reach a negative number)
	- Spawning a miner is done manually from the frontend (see design)


### Miner

- A miner has 3 main characteristics:
	- `carryCapacity` (`int` from `1` to `200`), this is the maximum number of minerals a miner can carry at one time
	- `travelSpeed` (`int` from `1` to `200`), this is the travel speed per year of a miner when moving on the map
	- `miningSpeed` (`int` from `1` to `200`), this is the number of minerals a miner can mine per year
- A miner has a position (`x`, `y`)
- A miner belongs to a planet and can only transfer minerals to the planet is belongs to
- A miner can travel:
	- from its origin planet to an asteroids
    - from an asteroid back to its origin planet
- A miner can mine an asteroid:
	- The miner needs to be at the same position as the asteroid to be able to mine it
    - The miner can mine a maximum of `miningSpeed` minerals per year (ie. if mining speed is 30, the miner will mine 30 minerals per year)
- At the start of the simulation all miners are positionned at their original planet
- A miner has a status:
	- `0` (`int`): Idle
	- `1` (`int`): Traveling
	- `2` (`int`): Mining
	- `3` (`int`): Transfering minerals to planet
- Each time a miner does an action, its action should be recorded in database, in a `history` table
- Miner actions / history are:
    - Miner spawn on planet `[planet name]`
	- Traveling from planet `[planet name]` to asteroid `[asteroid name]`
	- Mining asteroid `[asteroid name]` for `[number of years]` years
	- Traveling back from asteroid `[asteroid name]` to `[planet name]`
	- Transfering minerals to planet `[planet name]`
	- ... and others if you think they make sense

### Asteroid

- An asteroid has a position (`x`, `y`)
- An asteroid has a status (`1`: `has minerals`, `0`: `depleted`) - default to `1`
- An asteroid has an amount of minerals (it starts with a random amount from `800` to `1200`)
- When a miner mines an asteroid, the amount of mined minerals is substracted from the amount stored in the asteroid
- When an asteroid has no minerals anymore, its status changes from `1` to `0`

### Mineral

- An amount of mineral is always an `unsigned int`

## Structure & Deliverables

The deliverable is a frontend built using `React` connecting to provided backend in 2 ways:

- `Websocket`:
	- All planet, miners and asteroids status and information displayed on the frontend should be updated live via a websocket connection to the backend
	- Each time a miner, planet, asteroid is created or modified on the backend, it should be updated live on the frontend
- `REST API`:
	- All data should be accessible via a REST API structure:
		- GET `/miners`: return the list of miners
		- GET `/miners?planetId=[planet ID]`: return the list of miners from a given planet ID
		- GET `/miners/[miner ID]`: return a miner based on its ID
		- POST `/miners`: create a miner
		- PUT `/miners/[miner ID]`: update a miner based on its ID
		- DELETE `/miners/[miner ID]`: delete a miner based on its ID
	- Same instruction for planets and asteroids

### Frontend

The frontend is simple in terms of design. What we are paying attention to is the accuracy of the HTML / CSS integration, how close it is to the original design, the way you handle DOM states (hover / active / disabled / form errors / etc.), animations, popups, etc., and the way you handle API connection, state management and websockets.

### Backend

As mentionned earlier in this document, the backend is already provided by Slingshot. You can access in 2 ways.

#### Online

An already deployed version of it is already available for use at [https://asteroids.dev.mediasia.cn](https://asteroids.dev.mediasia.cn/). On that version, all datas are flushed every 6 minutes. If you decide to go with the online version, feel free to still check the [backend repo](https://git.mediasia-group.com/mediasia-interactive/asteroids-backend) as it contains a Postman collection that can be a good documentation for all the available routes.

#### Local

If you wants more customization, you can retrieve the backend with its [own repo](https://git.mediasia-group.com/mediasia-interactive/asteroids-backend). The usage of the backend is descibred within the repository and a complete Postman collection is also provided to help you navigate the api clearly.

### Icons

All icons can be exported from Figma as SVG files. As we all love best practices, we expect you to build a webfont using these icons, and use the webfont in your CSS integration to position the icons on the pages.

### Fonts

Both `lato` and `poppins` fonts used in the design are provided in the `assets` folder in this repository

### Other recommendation

As a frontend developer you will provide a frontend which follows all best practices and you will ensure your code contains:

- Favicon for several type of devices
- Manifest
- Well structured metatags (ex. for SEO and / or Sharing on social media)
- Compressed assets (using tinypng or similar)
- A README documentation which explains your structure and how to run your code / build your code for production

## Resources

- Design : [Figma](https://www.figma.com/file/OX9KUE33QGTyaSfpiBMsEN/%5BSlingshot%5D-Asteroids---Javascript-Development-Test). To view this figma file you should be logged in with your figma account.
- Backend base : [asteroids-backend](https://git.mediasia-group.com/mediasia-interactive/asteroids-backend)
- Assets: some of the assets are already available for you to use in this repo, within the [assets folder](assets).

### Access figma file

To access the full capabilities of our figma design (select elements, export elements, view font size, view css properties, etc) your need to be logged in to a figma account.

1. Create a [Figma account](https://figma.com) or [login](https://figma.com) to your existing figma account
2. Open the [Figma link](https://www.figma.com/file/OX9KUE33QGTyaSfpiBMsEN/%5BSlingshot%5D-Asteroids---Javascript-Development-Test)
3. Enter the following password: SlingshotToAsteroids 

Buckle up, ignition and liftoff !
Good luck !
