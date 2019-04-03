/* LEVELS SHOULD GO UP TO 10 WITH A CERTAIN # OF WAVES IN EACH LEVEL.
   EACH LEVEL SHOULD HAVE THEIR OWN UNIQUE BACKGROUNDS AND INTRODUCE THE
   PLAYER TO NEW ENEMY TANKS THAT ARE DIFFRENT IN SHAPE, COLOR, POWER, SPEED,
   GUN, AND HEALTH */

// First attempt on making a level system... Will improve in the future.

let level  = 1;
let wave = 1;

let redLights = 0;
let redHeavies = 0;
let redTDs = 0;

function spawnEnemies(numOfLights, numOfHeavies, numOfTDs) {
	for(l = 0; l < numOfLights; l++) {
		spawnLightTank();
	}	
	for(h = 0; h < numOfHeavies; h++) {
		spawnHeavyTank();
	}	
	for(t = 0; t < numOfTDs; t++) {
		spawnEnemyTD();
	}
	console.log(`level: ${level}`, `wave: ${wave}`);
}

// if(level == 1 && wave == 1 && enemies.length === 0 && players.length !== 0) {
// 	spawnEnemies(4, 0, 0);
// }
// if(level == 1 && wave == 2 && enemies.length === 0 && players.length !== 0) {
// 	spawnEnemies(3, 1, 0);
// }
// if(level == 1 && wave == 3 && enemies.length === 0 && players.length !== 0) {
// 	spawnEnemies(3, 3, 0);
// }
// if(level == 1 && wave == 4 && enemies.length === 0 && players.length !== 0) {
// 	spawnEnemies(3, 0, 1);
// }
// if(level == 1 && wave == 5 && enemies.length === 0 && players.length !== 0) {
// 	spawnEnemies(4, 1, 1);
// }

function nextWaveOrLevel() {
	wave += 1;

	if(wave > 5) {
		level += 1;
		wave = 1;
	}
}

function CheckWaveAndLevel(level, wave) {
	if(level == 1 && wave == 1 && enemies.length === 0 && players.length !== 0) {
		spawnEnemies(3, 0, 0);
		// wave += 1;
		nextWaveOrLevel();
	}
	if(level == 1 && wave == 2 && enemies.length === 0 && players.length !== 0) {
		spawnEnemies(2, 1, 0);
		// wave += 1;
		nextWaveOrLevel();
	}
	if(level == 1 && wave == 3 && enemies.length === 0 && players.length !== 0) {
		spawnEnemies(2, 2, 0);
		// wave += 1;
		nextWaveOrLevel();
	}
	if(level == 1 && wave == 4 && enemies.length === 0 && players.length !== 0) {
		spawnEnemies(2, 0, 1);
		// wave += 1;
		nextWaveOrLevel();
	}
	if(level == 1 && wave == 5 && enemies.length === 0 && players.length !== 0) {
		spawnEnemies(3, 1, 1);
		// wave += 1;
		nextWaveOrLevel();
	}
}

// function startLevel() {

// }

// function lvlOneInit() {
// 	if(level == 1 && wave == 1) {
// 		spawnEnemies(3, 0, 0);
// 	}
// }

// function nextWave() {
// 	spawnEnemies
// }