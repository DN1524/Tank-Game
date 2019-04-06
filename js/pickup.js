function PickUp (/*supplyGiven, amountGiven,*/x, y, imgSrc) {
	// this.x = crateSpawnX();
	// this.y = randomSpawnY();
	this.x = x;
	this.y = y;
	this.w = 86;
	this.h = 76;
	this.maxHealth = 400;
	this.health = 400;
	// this.supplyGiven = supplyGiven;
	// this.amountGiven = amountGiven;
	this.imgSrc = imgSrc;
	this.index = 0;

	this.draw = function() {

		renderTankImage(this.imgSrc, this.x, this.y);
		createHealthbar(this.x, this.y - 25, this.w, 10, this.health, this.maxHealth, false);
		// c.lineWidth = 1.5;
		// c.strokeRect(this.x, this.y, this.w, this.h);
		// c.strokeStyle = "#FF0400FF";

		// pickups.forEach(pickup => {
		// 	if(pickup.health <= 0) {
		// 		pickups.splice(pickup.index, 1)
		// 	}
		// })

	}

	this.update = function() {
		players.forEach(player => {
			pickups.forEach(pickup => {

				if(getDistance2(pickup, player)) {
					console.log("You acquired the pickup!")

					pickups.splice(pickup.index, 1); // Deletes box from array when acquired
					giveIndex(pickups);
					player.health += Math.round((15 / 100) * player.maxHealth); // Heals for 15% of MaxHealth
					if(player.health > player.maxHealth) {
						player.health = player.maxHealth;
					}
				}
			})
		})
		pickups.forEach(pickup => {
			if(pickup.health <= 0) {
				pickups.splice(pickup.index, 1);
				giveIndex(pickups);
			}
		})
		this.draw();
	}
}