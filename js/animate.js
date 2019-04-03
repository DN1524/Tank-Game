// Reminder: Try to put enemies.forEach() higher so you don't
// 					 have to repeat it over and over. (Tried: Causes a bug where shell velocities sped up...)

(function animate() {
	requestAnimationFrame(animate);
	
	if(inMainMenu) {
		return;
	}

	if(paused) {
		$(".pause-container").css("display", "block");
		return;
	} else {
		$(".pause-container").css("display", "none");
	}

	c.clearRect(0, 0, innerWidth, innerHeight);


	// First attempt on making a level system... Will improve in the future.
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
	
	for(let i = 0; i < players.length; i++) {
		players[i].update();
	}

	for(let i = 0; i < enemies.length; i++) {
		enemies[i].update();
	}

	function drawShell(array) {
		for(let x = 0; x < array.length; x++) {
			for(let y = 0; y < array[x].length; y++) {
				array[x][y].update();
			}
		}
	}

	drawShell(playerShellsArray);
	drawShell(machineGunArray);
	drawShell(enemyShellsArray);

	function giveShellCollision(array, dps, characters) {
		for(i = 0; i < array.length; i++) {
			array.forEach(shell => {
				if(shell.x >= canvas.width || shell.x <= 0) {
					array.splice(i, 1);
					// console.log("out of bounds");
				}
				characters.forEach(character => {
					if(getDistance(shell, character)) {
						array.splice(i, 1);
						character.health -= dps;
						// console.log(`Someone was hit!`);
						// console.log(player.mainShellsArray);
					}
				})				
			})
		}
	}

	players.forEach(player => {
		const msa = player.mainShellsArray;
		const ssa = player.secShellsArray;
		const mgDPS = player.mainGunDps;
		const sgDPS = player.secGunDps;

		giveShellCollision(msa, mgDPS, enemies);
		giveShellCollision(ssa, sgDPS, enemies);
	})

	enemies.forEach(enemy => {
		const esa = enemy.shellsArray;
		const dps = enemy.dps;

		giveShellCollision(esa, dps, players);
	})
})();

// FPS COUNTER

// (function() {
// 	var script=document.createElement('script');
// 	script.onload=function() {
// 		var stats=new Stats();
// 		document.body.appendChild(stats.dom);
// 		requestAnimationFrame(function loop() {
// 			stats.update();
// 			requestAnimationFrame(loop)
// 		});
// 		console.log(stats)
// 	};

// 	script.src='//mrdoob.github.io/stats.js/build/stats.min.js';
// 	document.head.appendChild(script);
// })()