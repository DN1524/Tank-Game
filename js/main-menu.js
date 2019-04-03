let paused = false;
let inMainMenu = true;

const tankImgArrayP1 = [playerHeavy_Img,
												playerMedium_Img,
												playerLight_Img,
												playerTD_Img
											 ],
			tankImgArrayP2 = [player2Heavy_Img,
												player2Medium_Img,
												player2Light_Img,
												player2TD_Img
											 ];

let imgP1 = `<div><img id="tank-img-p1" class="tank-img" src=${tankImgArrayP1[0]}></div>`,
		imgP2 = `<div><img id="tank-img-p2" class="tank-img" src=${tankImgArrayP2[0]}></div>`;

function spStart() {
	if(wave !== 1) {
		wave -= 1;
	}
	$(".main-menu").css("display", "none");
	paused = false;
	inMainMenu = false;
	$(".wpn-grp-container-p2").css("display", "none");
	spawnPlayerHeavy();
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

	spawnPlayerLight();
	spawnPlayer2Light();
}

function tankSelection() {
	$(".main-menu-options").css("display", "none");
	$(".tank-selection-container").css("display", "block");

	$(".tank-preview-p1").append(imgP1);
	$(".tank-preview-p2").append(imgP2);
}

function backToMenu() {
	$(".main-menu-options").css("display", "block");
	$(".tank-selection-container").css("display", "none");

	$(".tank-img").remove();
}

const arrow = $(".arrow");
let tankIndexP1 = 1;
let tankIndexP2 = 1;

arrow.click((arrow) => {
	const currentArrow = arrow.currentTarget;

	document.getElementById("tank-img-p1").src = tankImgArrayP1[tankIndexP1];

	if($(currentArrow).hasClass("arrow-right-p1")) {
		tankIndexP1 += 1;
		if(tankIndexP1 > tankImgArrayP1.length) {
			tankIndexP1 = 0;
		}
		console.log(tankIndexP1);
		// console.log("P1 tank change right");
	}

	else if($(currentArrow).hasClass("arrow-left-p1")) {
		tankIndexP1 -= 1;
		if(tankIndexP1 < 0) {
			tankIndexP1 = 3;
		}
		console.log(tankIndexP1);
		// console.log("P1 tank change left");
	} 


	if($(currentArrow).hasClass("arrow-right-p2")) {
		console.log("P2 tank change right");
	}

	if($(currentArrow).hasClass("arrow-left-p2")) {
		console.log("P2 tank change left");
	}	
})

function tankSelectionCycle(arrowClass, index) {

}