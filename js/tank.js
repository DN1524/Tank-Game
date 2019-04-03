// Old code for making a player tank

function Player(x, y, up, down, left, right, shoot) {
	this.x = x;
	this.y = y;
	this.w = 239;  //518;
	this.h = 100;  //190;
	this.dy = 5;
	this.dx = 5;
	this.up = up;
	this.down = down;
	this.left = left;
	this.right = right;
	this.shoot = shoot;
	this.kstate = [false, false, false, false, false]; //[up, down, left, right, space];
	this.image = "../images/Tank2.png";
	this.mainReloadTimer = 100;
	this.secReloadTimer = 5;
	this.shellsArray = [];
	this.health = 6000;
	this.maxHealth = 6000;
	this.dps = 400; // Damage Per Shot
	this.mgDps = 50; // Machine gun Dmg per shot

	/*
	 mgDPS depends on which tank you are hitting. 
	 Deals more damge to light tanks but less to Heavies.
	 See animate.js lines 24-32.
	*/

	// heavyShellsArray.push(this.shellsArray);
	playerShellsArray.push(this.shellsArray);

	this.draw = function() {
		tank.src = this.image;
		
		// c.strokeRect(this.x, this.y, this.w, this.h);
		// c.fillStyle = "#41D12DAD";
		// c.strokeStyle = "#000000FF";
		// c.strokeRect(this.x, this.y - 25, this.w, 10);
		// c.fillRect(this.x, this.y - 25, this.w - 100, 9);
		createHealthbar(this.x, this.y - 22, this.w, 10, this.health, this.maxHealth, true);
		createHealthbar(this.x, this.y - 12 , this.w - 100, 5, this.mainReloadTimer, 100, false);
		// c.strokeStyle = "#D62928FF";
		// c.fillStyle = "#00A2FFFF";
		c.drawImage(tank, this.x, this.y);
		// c.stroke();

		if(this.kstate[0] == true) {
			this.y += -this.dy;
			// console.log("up")
		}
		if(this.kstate[1] == true) {
			this.y += this.dy;
			// console.log("down")
		}
		if(this.kstate[2] == true) {
			this.x += -this.dx;
			// console.log("up")
		}
		if(this.kstate[3] == true) {
			this.x += this.dx;
			// console.log("down")
		}
		if(this.kstate[4] == true && weapGrp == 1) {
			// Can shoot main gun after a 100 frame reload time.
			if(this.mainReloadTimer == 100) {
				shootMainGun2(this.shellsArray, this.x, this.y, this.w, this.h);
				this.mainReloadTimer = 0;
			}
		}
		if(this.kstate[4] == true && weapGrp == 2) {
			if(this.secReloadTimer == 5) {
				shootSecondGun(this.x, this.y, this.w, this.h);
				this.secReloadTimer = 0;
			}
		}
		if(this.kstate[4] == true && weapGrp == 3) {
			if(this.mainReloadTimer == 100) {
				shootMainGun2(this.shellsArray, this.x, this.y, this.w, this.h);
				this.mainReloadTimer = 0;
			}
			if(this.secReloadTimer == 5) {
				shootSecondGun(this.x, this.y, this.w, this.h);
				this.secReloadTimer = 0;
			}
		}
	}

	this.update = function() {
		initKeyBoard(
		this.up, 
		this.down, 
		this.left, 
		this.right, 
		this.shoot, 
		this.kstate
		);

		if(this.mainReloadTimer < 100) {
			this.mainReloadTimer += 1;
		}
		if(this.secReloadTimer < 5) {
			this.secReloadTimer += 1;
		}

		if(this.x + 3 <= 0) {
			this.x += this.dx;
		}

		if(this.x >= innerWidth / 2 - this.w) {
			this.x += -this.dx;		
		}

		// if(this.y + 5 <= 265) {
		if(this.y + 5 <= canvas.height / 3.5) {
			this.y += this.dy;
		}

		if(this.y >= canvas.height - this.h) {
			this.y += -this.dy;
		}
		this.draw();
	}
}