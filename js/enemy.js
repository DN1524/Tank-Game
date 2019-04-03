function Enemy(dx, dy, w, h, img, type, reloadStatus, reloadCapped, shoot, rva, health, maxHealth, dps) {
	this.x = innerWidth + randomSpawnX();
	this.y = randomSpawnY();
	this.dx = dx;
	this.dy = dy;
	this.w = w;
	this.h = h;
	this.img = img;
	this.type = type;
	this.reloadStatus = reloadStatus;
	this.reloadCapped = reloadCapped;
	this.shoot = shoot;
	this.rva = rva; // Random Velocity Array;
	this.health = health;
	this.maxHealth = maxHealth;
	this.dps = dps;
	this.shellsArray = [];
	this.index = 0;
	this.nextMoveCounter = 0;

	this.shellsArray.index = 0;
	// console.log(this.shellsArray.index);

	enemyShellsArray.push(this.shellsArray);

	rva = this.rva;
	let nextMoveCounter = this.nextMoveCounter;
	
	let chasingP1 = false;
	let chasingP2 = false;

	// Randomizes the direction of enemy tanks.
	// setInterval(function() {
	// 	const dxChance = [1, 2, 3];
	// 	const dyChance = [1, 2, 3, 4, 4];
	// 	let randomPlayer = players[Math.floor(Math.random() * players.length)];

	// 	rva[0] = dxChance[Math.floor(Math.random() * dxChance.length)];
	// 	rva[1] = dyChance[Math.floor(Math.random() * dyChance.length)];

	// 	if(dyChance[3] || dyChance[4]) {
	// 		// console.log("Did it do something?")
	// 		if(randomPlayer == players[0]) {
	// 			chasingP2 = false;
	// 			chasingP1 = true;
	// 		} else if( randomPlayer == players[1]) {
	// 			chasingP1 = false;
	// 			chasingP2 = true;
	// 		}
	// 	}
	// 	console.log(rva);
	// }, 1500);

	this.draw = function() {
		renderTankImage(this.type, this.x, this.y);

		// This makes the hitbox visisble.
		// c.lineWidth = 1.5;
		// c.strokeRect(this.x, this.y, this.w, this.h);

		createHealthbar(this.x, this.y - 25, this.w, 10, this.health, this.maxHealth, true);
		// Enemies wont shoot if they are off screen.
		if(this.reloadStatus === this.reloadCapped && this.x + this.w < innerWidth && this.y) {
			this.reloadStatus = 0; // sets the reload status to 0 so the reload process can start over.
			if(!players.length == 0) {
				this.shoot(this.shellsArray, this);
			}
		}

		/* Deletes any dead enemy from the enemies array and rearranges the 
			 enemy indexes to match the remaining enemy tanks along with their 
			 shells array. */
		enemies.forEach(enemy => {
			if(enemy.health <= 0) {
				enemies.splice(enemy.index , 1);
				enemyShellsArray.splice(enemy.shellsArray.index, 1);

				/* setTimeout allows the enemy shell to finish its trajectory
					 after being shot before being deleted. */
				// setTimeout(function() {
				// 	enemyShellsArray.splice(enemy.shellsArray.index, 1);
				// }, 1000)
					

				// for(i = 0; i < lightShellsArray.length; i++) {
				// 	if(enemy.type == smallEnemy) {
				// 		lightShellsArray.splice(i, 1);
				// 	}
				// }
				// for(i = 0; i < heavyShellsArray.length; i++) {
				// 	if(enemy.type == bigEnemy) {
				// 		heavyShellsArray.splice(1, 1);
				// 	}
				// }

				giveIndex(enemies);
				giveIndex(enemyShellsArray);
			}
		})
	}

	this.update = function() {
		if(nextMoveCounter < 120) {
			nextMoveCounter += 1
		}
		if(nextMoveCounter == 120) {
			// Randomizes the direction of enemy tanks.
			nextMoveCounter = 0;
			const dxChance = [1, 2, 3];
			const dyChance = [1, 2, 3, 4, 4];
			let randomPlayer = players[Math.floor(Math.random() * players.length)];

			this.rva[0] = dxChance[Math.floor(Math.random() * dxChance.length)];
			this.rva[1] = dyChance[Math.floor(Math.random() * dyChance.length)];

			if(dyChance[3] || dyChance[4]) {
				// console.log("Did it do something?")
				if(randomPlayer == players[0]) {
					chasingP2 = false;
					chasingP1 = true;
				} else if(randomPlayer == players[1]) {
					chasingP1 = false;
					chasingP2 = true;
				}
			}
			// console.log(rva);
		}
		// Checks this.rva: [1,2,3] for X and [1,2,3,4,4] for Y and uses it to decide which direction to go. 
		if(this.x + this.w < innerWidth) {
			if(rva[0] == 1) {
				this.x += this.dx; // Go Backgwards
			}
			else if(rva[0] == 2) {
				this.x -= this.dx; // Go forwards
			}
			if(rva[1] == 1) {
				this.y += this.dy; // Go down
			}
			else if(rva[1] == 2) {
				this.y -= this.dy; // Go Up
			}
			// Give a chance for the enemy to follow your up/down movements
			else if(rva[1] == 4) {
				// let randomPlayer = players[Math.floor(Math.random() * players.length)];
				if(players.length !== 0) {
					c.fillStyle = "#FF0000FF";
					c.fillText(`Chasing!`, this.x + 120, this.y - 30);
					if(chasingP1 == true) {
						if(this.y < players[0].y) {
							this.y += this.dy;
						} else if(this.y > players[0].y) {
							this.y -= this.dy;
						}
					}
					if(chasingP2 == true && players[1] !== undefined) {
						if(this.y < players[1].y) {
							this.y += this.dy;
						} else if(this.y > players[1].y) {
							this.y -= this.dy;
						}
					}
				}
				// console.log(chasingP1);
			}
		} // if rva[2] then there is 0 velocity in either y or x cordiantes.

		/* reload timer continues if it has not reached the maximum
		   reload time*/
		if(this.reloadStatus < this.reloadCapped) {
			this.reloadStatus += 1;
		}
		// Animates tanks on screen if out of bounds on x axis
		if(this.x > innerWidth) {
			this.x -= this.dx;
		}

		if(this.x <= innerWidth / 2) {
			this.x += this.dx;
		}

		if(this.x >= innerWidth - this.w) {
			this.x += -this.dx;
		}

		if(this.y + 5 <= canvas.height / 3.5) {
			this.y += this.dy;
		}

		if(this.y >= canvas.height - this.h) {
			this.y += -this.dy;
		}

		this.draw();
	}
}

// let xMax = 1200;
// let xMin = 1000;
// let yMax = 700;
// let yMin = 10;

const heavyTankWidth = 289; // 239
const heavyTankHeight = 100;

const lightTankWidth = 210;
const lightTankHeight = 80;

// let randomX = Math.floor(Math.random() * (xMax - xMin + 1) + xMin);
// let randomY = Math.floor(Math.random() * (yMax - yMin + 1) + yMin);

// let enemies = [];

// spawnHeavyTank();
// spawnLightTank();
// spawnEnemyTD();