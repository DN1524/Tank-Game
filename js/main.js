const canvas = document.querySelector("canvas");
const ui = document.querySelector(".ui");
// const innerWidth = canvas.width;
// const innerHeight = canvas.height;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
$(ui).css("width", `${canvas.width}`);

// resizes the canvas dynamically when the window size changes.
window.addEventListener("resize", function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	$(ui).css("width", `${canvas.width}`);
})

// c = context
const c = canvas.getContext("2d");
// ********************* IMAGES ****************
const tank = new Image();
const playerHeavy = new Image();
const player2Heavy = new Image();
const playerMedium = new Image();
const player2Medium = new Image();
const playerLight = new Image();
const player2Light = new Image();
const playerTD = new Image();
const player2TD = new Image();

const bigEnemy = new Image();
const smallEnemy = new Image();
const enemyTD = new Image();

const playerTD_Img = "../images/player-tanks/playerTD.png";
const player2TD_Img = "../images/player-tanks/player2TD.png";
const playerHeavy_Img = "../images/player-tanks/playerHeavy.png";
const player2Heavy_Img = "../images/player-tanks/player2Heavy.png";
const playerMedium_Img = "../images/player-tanks/playerMedium.png";
const player2Medium_Img = "../images/player-tanks/player2Medium.png";
const playerLight_Img = "../images/player-tanks/playerLightTank.png";
const player2Light_Img = "../images/player-tanks/player2LightTank.png";

const smallTankImg = "../images/enemy_tank2.png";
const bigTankImg = "../images/enemy_tank.png";
const enemyTD_Img = "../images/enemy-td.png";

playerTD.src = playerTD_Img;
player2TD.src = player2TD_Img;
playerHeavy.src = playerHeavy_Img;
player2Heavy.src = player2Heavy_Img;
playerMedium.src = playerMedium_Img;
player2Medium.src = player2Medium_Img;
playerLight.src = playerLight_Img;
player2Light.src = player2Light_Img;

bigEnemy.src = bigTankImg;
smallEnemy.src = smallTankImg;
enemyTD.src = enemyTD_Img;


// ********************* SFX *******************
const mgSfx = document.querySelector(".mg-sfx");
const hgSfx = document.querySelector(".hg-sfx");
const lgSfx = document.querySelector(".lg-sfx");
const tdgSfx = document.querySelector(".tdg-sfx");

// ************ Controls ****************
const arrowUp = 38;
const arrowDown = 40;
const arrowLeft = 37;
const arrowRight = 39;
const numZero = 96;
const enter = 13;

const up = 87; // w
const down = 83; // s
const left = 65; // a
const right = 68; // d
const shoot = 32; // spacebar

let players = [];
let enemies = [];

const tankOption = $(".tank-option-text-p1");
// let selectedTank;

// tankOption.click(box => {
// 	tankOption.each(() => {
// 		tankOption.removeClass("chosen-tank");
// 		// console.log(tankOption);
// 	})
// 	selectedTank = box.currentTarget;
// 	$(selectedTank).addClass("chosen-tank");
// 	// this.addClass("chosen-tank");
// 		// console.log(box.currentTarget);
// });


function pauseGame() {
	paused = true;
}

function resumeGame() {
	paused = false;
}

function returnToMenu() {
	players = [];
	enemies = [];
	playerShellsArray = [];
	enemyShellsArray = [];
	machineGunArray = [];
	inMainMenu = true;

	$(".main-menu").css("display", "block");
}

function renderTankImage(tank, x, y) {
	c.drawImage(tank, x, y);
}
// Keeps track of when keys are held down or not.
function initKeyBoard(up, down, left, right, shoot, kstate) {
	$(document).keydown(e => {
		if(e.keyCode == up) {
			kstate[0] = true;
		}
		if(e.keyCode == down) {
			kstate[1] = true;
		}
		if(e.keyCode == left)  {
			kstate[2] = true;
		}
		if(e.keyCode == right) {
			kstate[3] = true;
		}
		if(e.keyCode == shoot) {
			kstate[4] = true
		}
	});

	$(document).keyup(e => {
		if(e.keyCode == up) {
			kstate[0] = false;
		}
		if(e.keyCode == down) {
			kstate[1] = false;
		}
		if(e.keyCode == left)  {
			kstate[2] = false;
		}
		if(e.keyCode == right) {
			kstate[3] = false;
		}
		if(e.keyCode == shoot) {
			kstate[4] = false
		}
	});
}
// Pauses the game when the "p" key is pressed. 
addEventListener("keydown", e => {
	// Pauses the game when "p" is pressed.
	if(e.key == "p") {
		paused = !paused;
		// console.log(paused);
	}
});
/* determines the distance between a circle and a square.
   Where the circles are the tank rounds and the squares are
   the tank hitboxes. */
function getDistance(circle, rect) {
	let xDist = Math.abs(circle.x - rect.x - rect.w / 2);
	let yDist = Math.abs(circle.y - rect.y - rect.h / 2);

	if(xDist > (rect.w / 2 + circle.r))  {
		return false;
	}
	if(yDist > (rect.h / 2 + circle.r)) {
		return false;
	}
	if(xDist <= (rect.w / 2)) {
    return true;
  }
  if(yDist <= (rect.h / 2)) {
    return true;
  }

  let dx = xDist - rect.w / 2;
  let dy = yDist - rect.h / 2;
  return (dx * dx + dy * dy <= (circle.r * circle.r));
}
/* assigns a number to an object in an array to help
	 keep track of individual objects and properly remove them
	 if need be. */
function giveIndex(array) {
	for(i = 0; i < array.length; i++) {
		array[i].index = i;
		// console.log(array[i].index);
	}
}
// Spawn an enemy between the y coordinates of 270 - 835
function randomSpawnY() {
	const yMax = 835;
	const yMin = 270;
	let randomY = Math.floor(Math.random() * (yMax - yMin + 1) + yMin);

	return randomY;
}
// Spawn an enemy between the x coordinates of 500 - 1000
function randomSpawnX() {
	const xMax = 1000;
	const xMin = 500;
	let randomX = Math.floor(Math.random() * (xMax - xMin + 1) + xMin);

	return randomX;
}

const playerX = 10;
const playerOneY = 450;
const playerTwoY = 600;

/* 
Spawning Attributes for Players:
	(x, 
	 y, 
	 dx,
	 dy,
	 width,
	 height, 
	 img, 
	 img src,
	 reloadStatus for main gun, 
	 reloadCapped for main gun,
	 reloadStatus for Secondary gun,
	 reloadCapped for Secondary gun, 
	 shoot function for main gun,
	 shoot function for secondary gun, 
	 health, 
	 maxHealth, 
	 damage for main gun,
	 damage for secondary gun,
	 key to move up,
	 key to move down,
	 key to move left,
	 key to move right, 
	 key to shoot)
*/

function spawnPlayerHeavy() {
	players.push(new Players(
		playerX,
		playerOneY,
		3,
		3,
		239,
		100,
		playerHeavy_Img,
		playerHeavy,
		100,
		100,
		5,
		5,
		shootHeavyMainGun,
		shootHeavySecGun,
		6000,
		6000,
		400,
		15,
		up,
		down,
		left,
		right,
		shoot
	));
	giveIndex(players);
	giveIndex(playerShellsArray);
}

function spawnPlayer2Heavy() {
	players.push(new Players(
		playerX,
		playerTwoY,
		3,
		3,
		239,
		100,
		player2Heavy_Img,
		player2Heavy,
		100,
		100,
		5,
		5,
		shootHeavyMainGun,
		shootHeavySecGun,
		6000,
		6000,
		400,
		15,
		arrowUp,
		arrowDown,
		arrowLeft,
		arrowRight,
		enter
	));
	giveIndex(players);
	giveIndex(playerShellsArray);
}

function spawnPlayerMedium() {
	players.push(new Players (
		playerX,
		playerOneY,
		4.5,
		4.5,
		223,
		80,
		playerMedium_Img,
		playerMedium,
		75,
		75,
		4,
		4,
		shootMediumMainGun,
		shootMediumSecGun,
		4500,
		4500,
		320,
		15,
		up,
		down,
		left,
		right,
		shoot
	));
	giveIndex(players);
	giveIndex(playerShellsArray);
}

function spawnPlayer2Medium() {
	players.push(new Players (
		playerX,
		playerTwoY,
		4.5,
		4.5,
		223,
		80,
		player2Medium_Img,
		player2Medium,
		75,
		75,
		4,
		4,
		shootMediumMainGun,
		shootMediumSecGun,
		4500,
		4500,
		320,
		15,
		arrowUp,
		arrowDown,
		arrowLeft,
		arrowRight,
		enter
	));
	giveIndex(players);
	giveIndex(playerShellsArray);
}

function spawnPlayerLight() {
	players.push(new Players(
		playerX,
		playerOneY,
		7,
		7,
		221,
		76,
		playerLight_Img,
		playerLight,
		50,
		50,
		3,
		3,
		shootLightMainGun,
		shootLightSecGun,
		3500,
		3500,
		150,
		5,
		up,
		down,
		left,
		right,
		shoot
	));
	giveIndex(players);
	giveIndex(playerShellsArray);
}

function spawnPlayer2Light() {
	players.push(new Players(
		playerX,
		playerTwoY,
		7,
		7,
		221,
		76,
		player2Light_Img,
		player2Light,
		50,
		50,
		3,
		3,
		shootLightMainGun,
		shootLightSecGun,
		3500,
		3500,
		120,
		5,
		arrowUp,
		arrowDown,
		arrowLeft,
		arrowRight,
		enter
	));
	giveIndex(players);
	giveIndex(playerShellsArray);
}

function spawnPlayerTD() {
	players.push(new Players(
		playerX,
		playerTwoY,
		2,
		2,
		256,
		69,
		playerTD_Img,
		playerTD,
		210,
		210,
		10,
		10,
		shootTDMainGun,
		shootTDSecGun,
		7000,
		7000,
		800,
		50,
		up,
		down,
		left,
		right,
		shoot
	));
	giveIndex(players);
	giveIndex(playerShellsArray);
}

function spawnPlayer2TD() {
	players.push(new Players(
		playerX,
		playerTwoY,
		2,
		2,
		256,
		69,
		player2TD_Img,
		player2TD,
		210,
		210,
		10,
		10,
		shootTDMainGun,
		shootTDSecGun,
		7000,
		7000,
		800,
		50,
		arrowUp,
		arrowDown,
		arrowLeft,
		arrowRight,
		enter
	));
	giveIndex(players);
	giveIndex(playerShellsArray);
}
/* 
Spawning Attributes for Enemies:
	(dx, 
	 dy, 
	 width,
	 height, 
	 img, 
	 type, (Refers to the new Image() names under Line:7)
	 reloadStatus, 
	 reloadCapped, 
	 shoot function, 
	 randomVelocityArray, (just can be a blank array: As long as [1,2,3,4,4] can fit)
	 health, 
	 maxHealth, 
	 dmg)
*/
function spawnLightTank() {
	enemies.push(new Enemy(
		5, 
		5, 
		lightTankWidth, 
		lightTankHeight, 
		smallTankImg, 
		smallEnemy,
		40,
		40,
		enemyLightShoot2,
		[],
		800,
		800,
		125
	));
	giveIndex(enemies);
	giveIndex(enemyShellsArray);
}

function spawnHeavyTank() {
	enemies.push(new Enemy(
		3, 
		3, 
		heavyTankWidth, 
		heavyTankHeight, 
		bigTankImg, 
		bigEnemy,
		100,
		100,
		enemyHeavyShoot2,
		[],
		2000,
		2000,
		300
	));
	giveIndex(enemies);
	giveIndex(enemyShellsArray);
}

function spawnEnemyTD() {
	enemies.push(new Enemy(
		2,
		2,
		256,
		69,
		enemyTD_Img,
		enemyTD,
		210,
		210,
		enemyTDShoot,
		[],
		3500,
		3500,
		950
	));
	giveIndex(enemies);
	giveIndex(enemyShellsArray);
}

// Function from YouTuber Lukas E. on their video: "Healthbar programming HTML5"
// https://www.youtube.com/watch?v=fIXJrC4Yb8s
function createHealthbar(x, y, width, height, health, maxHealth, text) {
	const colorNum = Math.round((1-(health/maxHealth)) * 0xff) * 0x10000 + Math.round((health/maxHealth) * 0xff) * 0x100;
	const colorString = colorNum.toString(16);

	if(health >= maxHealth) {
		health = maxHealth;
	}
	if(health <= 0) {
		health = 0;
	}
	
	if(text === true) {
		c.font = "20px Georgia";
		c.fillStyle = "#00F0FFFF";
		c.fillText(`${health} / ${maxHealth}`, x, y - 5);
	}

	c.fillStyle = "#000000FF";
	c.fillRect(x, y, width, height);


	if(colorNum >= 0x100000) {
		c.fillStyle = `#${colorString}`;
	} else if(colorNum << 0x100000 && colorNum >= 0x10000) {
		c.fillStyle = `#0${colorString}`;
	} else if(colorNum << 0x10000) {
		c.fillStyle = `#00${colorString}`;
	}
	c.fillRect(x+1, y + 1, (health/maxHealth)*(width - 2), height-2);
}
// function getDistance(x1, y1, x2, y2) {
// 	let xDist = x2 - x1;
// 	let yDist = y2 - y1;

// 	return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
// }

/*
Possible Content for the future:
	- Multiple tank classes(Light, Medium, Heavy, TD, SuperHeavy) to choose to play

	- Limited Ammo

	- Pickups such as Ammo resupply and healing

	- Different levels with their own certain number of waves of enemy tanks

	- Each level to have different backgrounds

	- Each level to have different enemy tanks

	- Each player tank class will have a level system where each level will
		boost the tank's health, damage, reload time, and speed

	- A currency system to purchace allied tanks to assist the player in battle.

	- Support tanks that do no damage but boosts their ally tanks or heal them as long
		as they are of a ceratin radius of them

	- Possible 2-player mode.

	- Boss battles

	- Air units such as helicopters.

	- Sprites instead of static images.
*/