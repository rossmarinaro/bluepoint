const config = {
	scale: {
        mode: Phaser.Scale.FIT,
		parent : 'gameContainer',
		autoCenter: Phaser.Scale.CENTER_BOTH,	
		width:888,
		height: 520
	},
	dom: {
        createContainer: true
	},
	physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
			useTicker: true,
            debug: true
        }      
    },
	pixelArt: true,
	type: Phaser.CANVAS,
	scene: [ loading , level_1, level_2, level_2_2, level_2_3, hud_1, hud_2, map ,intro_1, intro_2],
	transparent: true,
	// audio: {
	// 	disableWebAudio: true,
    // }
}

const Game = new Phaser.Game(config);


