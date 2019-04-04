let paused = false;
let inMainMenu = true;
let tankImg1;
let tankImg2;
let tankIndexP1 = 0;
let tankIndexP2 = 0;

// const selectedTankTextp1 = $("#chosen-tank-p1");
// const selectedTankTextp2 = $("#chosen-tank-p2");
const tankImgArrayP1 = [playerHeavy_Img,playerMedium_Img,playerLight_Img,playerTD_Img],
			tankImgArrayP2 = [player2Heavy_Img,player2Medium_Img,player2Light_Img,player2TD_Img],
			player1SpawnArray = [spawnPlayerHeavy, spawnPlayerMedium, spawnPlayerLight, spawnPlayerTD],
			player2SpawnArray = [spawnPlayer2Heavy, spawnPlayer2Medium, spawnPlayer2Light, spawnPlayer2TD],
			tankClasses = ["Heavy Tank", "Medium Tank", "Light Tank", "Tank Destroyer"];


let imgP1,
		imgP2;

function spStart() {
	if(wave !== 1) {
		wave -= 1;
	}
	$(".main-menu").css("display", "none");
	paused = false;
	inMainMenu = false;
	$(".wpn-grp-container-p2").css("display", "none");
	player1SpawnArray[tankIndexP1]();
	// spawnPlayerHeavy();
	// spawnPlayerTD();
	// spawnPlayerLight();
	// spawnPlayerMedium();
}

function tpStart() {
	if(wave !== 1) {
		wave -= 1;
	}
	$(".main-menu").css("display", "none");
	paused = false;
	inMainMenu = false;
	$(".wpn-grp-container-p2").css("display", "grid");
	// spawnPlayerHeavy();
	// spawnPlayer2Heavy();

	// spawnPlayerTD();
	// spawnPlayer2TD();

	// spawnPlayerLight();
	// spawnPlayer2Light();
	player1SpawnArray[tankIndexP1]();
	player2SpawnArray[tankIndexP2]();
}

const chosenTankP1 = document.querySelector("#chosen-tank-p1");
const chosenTankP2 = document.querySelector("#chosen-tank-p2");

function tankSelection() {
	$(".main-menu-options").css("display", "none");
	$(".tank-selection-container").css("display", "block");
	imgP1 = `<div class="img-holders"><img id="tank-img-p1" class="tank-img" src=${tankImgArrayP1[tankIndexP1]}></div>`
	imgP2 = `<div class="img-holders"><img id="tank-img-p2" class="tank-img" src=${tankImgArrayP2[tankIndexP2]}></div>`

	$(".tank-preview-p1").append(imgP1);
	$(".tank-preview-p2").append(imgP2);
	chosenTankP1.innerText = tankClasses[tankIndexP1];
	chosenTankP2.innerText = tankClasses[tankIndexP2];
	tankImg1 = document.getElementById("tank-img-p1");
	tankImg2 = document.getElementById("tank-img-p2");
}

function backToMenu() {
	$(".main-menu-options").css("display", "block");
	$(".tank-selection-container").css("display", "none");

	tankImg1 = null;
	tankImg2 = null;
	// $(".tank-img").remove();
	$(".img-holders").remove();
}

const arrow = $(".arrow");

arrow.click((arrow) => {
	const currentArrow = arrow.currentTarget;

	if($(currentArrow).hasClass("arrow-right-p1")) {
		tankIndexP1 += 1;
		if(tankIndexP1 > tankImgArrayP1.length - 1) {
			tankIndexP1 = 0;
		}
		tankImg1.src = tankImgArrayP1[tankIndexP1]
		chosenTankP1.innerText = tankClasses[tankIndexP1];
	}

	else if($(currentArrow).hasClass("arrow-left-p1")) {
		tankIndexP1 -= 1;
		if(tankIndexP1 < 0) {
			tankIndexP1 = 3;
		}
		tankImg1.src = tankImgArrayP1[tankIndexP1]
		chosenTankP1.innerText = tankClasses[tankIndexP1];
	} 

	if($(currentArrow).hasClass("arrow-right-p2")) {
		tankIndexP2 += 1;
		if(tankIndexP2 > tankImgArrayP2.length - 1) {
			tankIndexP2 = 0;
		}
		tankImg2.src = tankImgArrayP2[tankIndexP2]
		chosenTankP2.innerText = tankClasses[tankIndexP2];
	}

	else if($(currentArrow).hasClass("arrow-left-p2")) {
		tankIndexP2 -= 1;
		if(tankIndexP2 < 0) {
			tankIndexP2 = 3;
		}
		tankImg2.src = tankImgArrayP2[tankIndexP2]
		chosenTankP2.innerText = tankClasses[tankIndexP2];
	}	
})