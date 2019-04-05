function setXCoord() {
	const xMax = canvas.width / 2 - 125,
				xMin = 100;

	let randomX = Math.floor(Math.random() * (xMax - xMin + 1) + xMin);

	return randomX;
}

function AssistTruck() {
	this.x = 0 - 230;
	this.y = randomSpawnY();
	this.w = 212;
	this.h = 61;
	this.dx = 10;
	this.img = halfTrack;
	this.imgSrc = halfTrack_Img;
	this.health = 800;
	this.maxHealth = 800;
	this.designatedXCoord = setXCoord();
	this.index = 0;

	// let x = this.x;
	// let y = this.y;

	function spawnRepairCrate(x, y) {
		pickups.push(new PickUp (x, y, repairPickup));
		giveIndex(pickups);
	}

	this.draw = function() {
		renderTankImage(this.img, this.x, this.y);
		createHealthbar(this.x, this.y - 25, this.w, 10, this.health, this.maxHealth, true);

		assistVehicles.forEach(av => {
			if(av.x <= 0 - 235 || av.health <= 0) {
				assistVehicles.splice(av.index, 1);
				giveIndex(assistVehicles);
			}		
		})
	}

	this.update = function() {
		// console.log(setXCoord());

		this.x += this.dx;


		if(this.x >= this.designatedXCoord) {
			this.img = halfTrack2;
			this.imgSrc = halfTrack2_Img;
			spawnRepairCrate(this.x, this.y);
			this.dx = -this.dx;
		}
		this.draw()
	}
}