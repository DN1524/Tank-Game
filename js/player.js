
// mgRS = mainGun Reload Status
// mgRC = mainGun Reload Capped
// sgRS = secondaryGun Reload Status
// sgRC = secondaryGun Reload Capped

function Players(x, y, dx, dy, w, h, img, imgSrc, mainReloadStatus, mainReloadCapped, secondaryReloadStatus, secondaryReloadCapped, shootMain, shootSec, health, maxHealth, mainGunDps, secGunDps, up, down, left, right, fireBtn) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.w = w;
	this.h = h;
	this.img = img;
	this.imgSrc = imgSrc;
	this.mainReloadStatus = mainReloadStatus;
	this.mainReloadCapped = mainReloadCapped;
	this.secondaryReloadStatus = secondaryReloadStatus;
	this.secondaryReloadCapped = secondaryReloadCapped;
	this.shootMain = shootMain;
	this.shootSec = shootSec;
	this.health = health;
	this.maxHealth = maxHealth;
	this.mainGunDps = mainGunDps;
	this.secGunDps = secGunDps;
	this.up = up,
	this.down = down,
	this.left = left,
	this.right = right,
	this.fireBtn = fireBtn;
	this.cycleWeapGrp;
	this.weapGrp = 1;
	this.kstate = [false, false, false, false, false]; //[up, down, left, right, shoot];
	this.mainShellsArray = [];
	this.secShellsArray = [];
	this.index = 0;

	this.mainShellsArray.index = 0;
	this.secShellsArray.index = 0;
	let MRS = this.mainReloadStatus;
	let MRC = this.mainReloadCapped;
	let SRS = this.secondaryReloadStatus;
	let SRC = this.secondaryReloadCapped;
	let kstate = this.kstate;

	playerShellsArray.push(this.mainShellsArray);
	machineGunArray.push(this.secShellsArray);

	const eBtn = "e",
				rightBracket = "]";

	let playerWeapGrp;

	if(this.up == 38) {
		this.cycleWeapGrp = rightBracket;
		playerWeapGrp = "p2";
		// console.log($(`.${playerWeapGrp}-wpn-grp1`));
	} else if(this.up == 87) {
		this.cycleWeapGrp = eBtn;
		playerWeapGrp = "p1";
		// console.log($(`.${playerWeapGrp}-wpn-grp1`));
	}

	addEventListener("keydown", e => {
		if(e.key == this.cycleWeapGrp) {
			this.weapGrp += 1;
			if(this.weapGrp > 3) {
				this.weapGrp = 1;
			}
		}
		if(this.weapGrp == 1) {
			$(`.${playerWeapGrp}-wpn-grp1`).css("border", "3px dotted yellow");
		} else {
			$(`.${playerWeapGrp}-wpn-grp1`).css("border", "none");
		}

		if(this.weapGrp == 2) {
			$(`.${playerWeapGrp}-wpn-grp2`).css("border", "3px dotted yellow");
		} else {
			$(`.${playerWeapGrp}-wpn-grp2`).css("border", "none");
		}

		if(this.weapGrp == 3) {
			$(`.${playerWeapGrp}-wpn-grp3`).css("border", "3px dotted yellow");
		} else {
			$(`.${playerWeapGrp}-wpn-grp3`).css("border", "none");
		}
	})

	this.draw = function() {
		renderTankImage(this.imgSrc, this.x, this.y);
		createHealthbar(this.x, this.y - 22, this.w, 10, this.health, this.maxHealth, true);
		createHealthbar(this.x, this.y - 12 , this.w - 100, 5, MRS, MRC, false);

		// If player reaches to 0 or less HP, then they die.
		players.forEach(player => {
			if(player.health <= 0) {
				players.splice(player.index , 1);

				giveIndex(players);
				giveIndex(playerShellsArray);
			}
		})

		if(kstate[0] == true) {
			this.y += -this.dy;
			// console.log("up")
		}
		if(kstate[1] == true) {
			this.y += this.dy;
			// console.log("down")
		}
		if(kstate[2] == true) {
			this.x += -this.dx;
		}
		if(kstate[3] == true) {
			this.x += this.dx;
			// console.log("down")
		}
		if(kstate[4] == true && this.weapGrp == 1) {
			if(MRS === MRC) {
				this.shootMain(this.mainShellsArray, this);
				MRS = 0;
			}
		}
		if(kstate[4] == true && this.weapGrp == 2) {
			if(SRS == SRC) {
				this.shootSec(this.secShellsArray, this);
				SRS = 0;
			}
		}
		if(kstate[4] == true && this.weapGrp == 3) {
			if(MRS === MRC) {
				this.shootMain(this.mainShellsArray, this);
				MRS = 0;
			}
			if(SRS == SRC) {
				this.shootSec(this.secShellsArray, this);
				SRS = 0;
			}
		}
	}

	this.update = function() {
		initKeyBoard(
		this.up, 
		this.down, 
		this.left, 
		this.right, 
		this.fireBtn, 
		this.kstate
		);

		if(MRS < MRC) {
			MRS += 1;
		}
		if(SRS < SRC) {
			SRS += 1;
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