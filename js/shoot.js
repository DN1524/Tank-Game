// let weapGrp = 1; //Default weapon Group.

function Shell(x, y, r, dx) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.r = r;
	this.index = 0;

	this.update = function() {
		this.x += this.dx;
		this.draw();

	}

	this.draw = function() {
		c.beginPath();
		c.strokeStyle = "#000000FF";
		c.lineWidth = 4;
		c.fillStyle = "#FF0000FF";
		c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		c.stroke();
		c.fill();
		c.closePath();
	};
}

let playerShellsArray = []; // holds all player main gun shells
let enemyShellsArray = []; // holds all enemy shells

// let tdShellsArray = [];
// let heavyShellsArray = [];
// let lightShellsArray = [];
let machineGunArray = []; // holds all player secondary gun shells

// let shellsArray1 = [];
// let shellsArray2 = [];
// let enemyShells1 = [];
// let enemyShells2 = [];
// is called when a shot is fired and plays the appropriate sound.
function playAudio(isPlaying, soundClip) {
	isPlaying = true;

	if(isPlaying) {
		soundClip.pause();
		soundClip.currentTime = 0;
		soundClip.play();
		isPlaying = false;
	}
}

function shootGun(array, x, y, r, dx) {
	array.push(new Shell(x, y, r, dx));
}

// function shootMainGun2(array, x, y, w, h) {
// 	let mcShoot = true;
// 	let xCord = x + w + 50;
// 	let yCord = y + h / 2.7;
// 	let dx = 40; //25;
// 	let r = 4;

// 	shootGun(array, xCord, yCord, r, dx);
// 	playAudio(mcShoot, hgSfx);
// 	console.log(playerShellsArray);
// }

// function shootSecondGun(x, y, w, h) {
// 	let mgShoot = true;
// 	// Fixes the gun's shell starting position to be
// 	// right in front of the gun barrel.
// 	let xCord = x + w - 100; //- 50;
// 	let yCord = y + h / 2.15;
// 	let dx = 60;
// 	let r = 2.5;

// 	shootGun(machineGunArray, xCord, yCord, r, dx);
// 	playAudio(mgShoot, mgSfx);
// 	// console.log(machineGunArray);
// }

function shootTDMainGun(array, tank) {
	ptd = tank;

	let ptdShoot = true;
	let x = ptd.x + 205;
	let y = ptd.y + 15;
	let dx = 60;
	let r = 5.5;

	shootGun(array, x, y, r, dx);
	playAudio(ptdShoot, tdgSfx);
}

function shootTDSecGun(array, tank) {
	ptd = tank;

	let ptdShoot = true;
	let x = ptd.x + 150;
	let y = ptd.y + 21;
	let dx = 50;
	let r = 2.5;

	shootGun(array, x, y, r, dx);
	playAudio(ptdShoot, lgSfx);
}

function shootHeavyMainGun(array, tank) {
	let pht = tank;

	let phtShoot = true;
	let x = pht.x + pht.w + 50;
	let y = pht.y + pht.h / 2.7;
	let dx = 50;
	let r = 4;

	shootGun(array, x, y, r, dx);
	playAudio(phtShoot, hgSfx);
}

function shootHeavySecGun(array, tank) {
	let pht = tank;

	let phtShoot = true;
	let x = pht.x + pht.w - 100;
	let y = pht.y + pht.w / 5;
	let dx = 60;
	let r = 2.5;

	shootGun(array, x, y, r, dx);
	playAudio(phtShoot, mgSfx);
}

function shootMediumMainGun(array, tank) {
	let pmt = tank;

	let pmtShoot = true;
	let x = pmt.x + pmt.w - 50;
	let y = pmt.y + pmt.w / 8.5;
	let dx = 60;
	let r = 3.2;

	shootGun(array, x, y, r, dx);
	playAudio(pmtShoot, hgSfx);
}

function shootMediumSecGun(array, tank) {
	let pmt = tank;

	let pmtShoot = true;
	let x = pmt.x + pmt.w - 130;
	let y = pmt.y + pmt.w / 11.5;
	let dx = 75;
	let r = 2.5;

	shootGun(array, x, y, r, dx);
	playAudio(pmtShoot, mgSfx);
}

function shootLightMainGun(array, tank) {
	let plt = tank;

	let pltShoot = true;
	let x = plt.x + plt.w - 55;
	let y = plt.y + plt.w / 13;
	let dx = 65;
	let r = 2.5;

	shootGun(array, x, y, r, dx);
	playAudio(pltShoot, lgSfx);
}

function shootLightSecGun(array, tank) {
	let plt = tank;

	let pltShoot = true;
	let x = plt.x + plt.w - 80;
	let y = plt.y + plt.w / 5.5;
	let dx = 70;
	let r = 2.3;

	shootGun(array, x, y, r, dx);
	playAudio(pltShoot, mgSfx);
}

// function shootMainGun() {
// 	let mcShoot = true;
// 	let x = tank1.x + tank1.w + 50;
// 	let y = tank1.y + tank1.h / 2.7;
// 	let dx = 25; //40;
// 	let r = 4;

// 	shootGun(shellsArray1, x, y, r, dx);
// 	playAudio(mcShoot, hgSfx);
// }

// function enemyHeavyShoot() {
// 	const eht = enemyHeavyTank;

// 	let ehtShoot = true;
// 	let x = eht.x;
// 	let y = eht.y + eht.h / 2.7;
// 	let dx = -25; //-40;
// 	let r = 4;

// 	shootGun(enemyShells1, x, y, r, dx);
// 	// playAudio(ehtShoot, hgSfx);
// }
function enemyTDShoot(array, tank) {
	let etd = tank;

	let etdShoot = true;
	let x = etd.x;
	let y = etd.y + etd.h / 3.5;
	let dx = -60;
	let r = 5.5;

	shootGun(array, x, y, r, dx);
	playAudio(etdShoot, tdgSfx);
}

function enemyHeavyShoot2(array, tank) {
	// const eht = enemyHeavyTank;
	let eht = tank;

	let ehtShoot = true;
	let x = eht.x;
	let y = eht.y + eht.h / 2.7;
	let dx = -25; //-40;
	let r = 4;

	shootGun(array, x, y, r, dx);
	// console.log(heavyShellsArray);
	playAudio(ehtShoot, hgSfx);
}

function enemyLightShoot2(array, tank) {
	// const elt = enemyLightTank;
	let elt = tank

	let eltShoot = true;
	let x = elt.x + 27;
	let y = elt.y + 21.5;
	let dx = -35; //-50;
	let r = 3;

	shootGun(array, x, y, r, dx);
	// console.log(lightShellsArray);
	playAudio(eltShoot, lgSfx);
}

// function enemyLightShoot () {
// 	const elt = enemyLightTank;

// 	let eltShoot = true;
// 	let x = elt.x + 27;
// 	let y = elt.y + 21.5;
// 	let dx = -35; //-50;
// 	let r = 2.5;

// 	shootGun(enemyShells2, x, y, r, dx);
// 	// playAudio(eltShoot, lgSfx);
// }


// Math.hypot(x2-x1, y2-y1)

// This detects mouse clicks relative to the player's gun
// barrel in case I decide to shoot in the direction
// of the mouse cursor rather than just in a straight line.
// $(canvas).mousedown(e => {
// 	let mouseX = e.clientX;
// 	let mouseY = e.clientY;

// 	// console.log(Math.floor(Math.hypot(mouseX - (tank1.x + tank1.w + 50), mouseY - (tank1.y + tank1.h / 2.15))))

// 	// shellsArray1[0].x = mouseX;
// 	// shellsArray1[0].y = mouseY;

// 	// shootMainGun();

// 	console.log(mouseX, mouseY);
// 	console.log("What?")
// })

// ======================= TESTING LOOPING THROUGH ARRAYS WITHIN ARRAYS ==================
// let megaArray = [
// 	[1, 2, 3, 4], 
// 	["a","b","c"], 
// 	["hi", "hello", "what's up", "how yall doin"], 
// 	["red", "green", "blue"]
// ];

// for(let x = 0; x < megaArray.length; x++) {
// 	for(let y = 0; y < megaArray[x].length; y++) {
// 		// console.log(megaArray[x][y])
// 	}
// }