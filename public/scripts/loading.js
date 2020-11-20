window.onerror = function (e) {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get('debug') === 'true') {

        document.getElementById('prompt').innerHTML = e.toString();
        console.log(e);
    }
}

var loading = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function loading() {

        Phaser.Scene.call(this, {
            key: 'loading',
            active: true
        });
    },

    preload: function () { //loads all the assets from the complete game

        //this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        this.load.html('form', './scripts/form.html');

        // initial screen
        this.load.image("guttedText", "./assets/images/level_1/Lvl 1_and_name_updated.png");
        this.load.image("bluepointLogo", "./assets/images/level_1/logo_updated.png");

        // social media icons
        this.load.image("facebook", "./assets/images/facebook.png");
        this.load.image("twitter", "./assets/images/twitter.png");
        this.load.image("shareIcon", "./assets/images/pngwave.png");
        this.load.image("copyIcon", "./assets/images/copy.png");
        this.load.image("hambugerIcon", "./assets/images/Hamburger_icon.png");
    //map
        this.load.image("map_trees", "./assets/images/map/trees.png");
        this.load.image("map_logo", "./assets/images/map/map_logo.png");
        //
        this.load.image("map_golden_road", "./assets/images/map/golden_20road_20.png");
        this.load.image("map_golden_road_grey", "./assets/images/map/golden road  grey.png");
        this.load.image("map_golden_road_glow", "./assets/images/map/golden road  grey_glow.png");
        //
        this.load.image("map_204_grey", "./assets/images/map/building_204_20grey.png");
        this.load.image("map_204_glow", "./assets/images/map/building_204_20grey_glow.png");
        this.load.image("map_204_color", "./assets/images/map/building_204_20color.png");
        //
        this.load.image("map_203_grey", "./assets/images/map/building_203_20grey.png");
        this.load.image("map_203_glow", "./assets/images/map/building_203_20grey_glow.png");
        this.load.image("map_203_color", "./assets/images/map/building_203_20color.png");
        //
        this.load.image("map_202_grey", "./assets/images/map/building_202_20grey.png");
        this.load.image("map_202_glow", "./assets/images/map/building_202_20grey_glow.png");
        this.load.image("map_202_color", "./assets/images/map/building_202_20color.png");
        //
        this.load.image("map_201_grey", "./assets/images/map/building_201_20grey.png");
        this.load.image("map_201_glow", "./assets/images/map/building_201_20grey_glow.png");
        this.load.image("map_201_color", "./assets/images/map/building_201_20color.png");
        //
        this.load.image("map_bridge_grey", "./assets/images/map/bridge_20grey.png");
        this.load.image("map_bridge_glow", "./assets/images/map/bridge_20grey_glow.png");
        this.load.image("map_bridge_color", "./assets/images/map/bridge_20color.png");
        //
        this.load.image("map_base", "./assets/images/map/base.png");
        // audios
        this.load.audio("map_music", "./assets/audio/Bluepoint Menu Theme.mp3");
        this.load.audio("map_select", "./assets/audio/map select sound.mp3");
        // loading text
        this.loadingText = this.add.text(444, 260, "Loading Bluepoint ", {fontFamily: 'euroStyle', fontSize: 50}).setOrigin(0.5);
        // loading files text
        // this.fileText = this.add.text(444, 350, " ", {
        //     fontFamily: 'euroStyle',
        //     fontSize: 30
        // }).setOrigin(0.5)

        this.tweens.add({targets: this.loadingText, alpha: 0,duration: 2000, ease: 'Sine.easeInOut', loop: -1, yoyo: true});
        this.time.delayedCall(2000, () => this.loadingText.text = "Rendering Environment ");
        this.time.delayedCall(6000, () =>this.loadingText.text = "Populating Lobby ");
        this.time.delayedCall(10000, () => this.loadingText.text = "Awaiting Clearance ");
        this.time.delayedCall(20000, () => { // TEMPORAL FIX, to go to the next scene after 20 seconds

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        if (urlParams.get('debug') === 'true') document.getElementById('prompt').innerHTML = "load with the timer";
        location.reload();

    });
        this.load.on('complete', () => {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            if (urlParams.get('lvl') == 1)  this.scene.start("intro_1");
            else if (urlParams.get('lvl') == 2) this.scene.start("level_2");
            else if (urlParams.get('lvl') == 3) this.scene.start("level_1");
            else if (urlParams.get('lvl') === null) this.scene.start("map");
            else if (urlParams.get('lvl') == "1a") this.scene.start("level_1");
            else if (urlParams.get('lvl') === 'lb') {
                this.scene.start("loserBoard", {
                    type: 2,
                    score: 5,
                    name: undefined,
                    colectionName: "scores_lvl_2",
                    level: 2
                })
            }
            if (urlParams.get('debug') === 'true') document.getElementById('prompt').innerHTML = "load correctly without timer";
       });
    }
});
let files_level_1_loaded = false;
load_files_level_1 = function (scene) {
    if (files_level_1_loaded) return;
    scene.load.image("black", "./assets/images/level_1/black.png");
    scene.load.image("background_1", "./assets/images/level_1/base1.png");
    scene.load.image("background_2", "./assets/images/level_1/base2.png");
    //scene.load.image("bloom", "./assets/images/level_1/lights_bloom.png");
    scene.load.image("whiteSquare", "./assets/images/level_1/white_square.png");
    scene.load.spritesheet("discoBall", "./assets/images/level_1/disco ball.png", {frameWidth: 36, frameHeight: 36}); 
//ball
    scene.load.spritesheet("blueGuy", "./assets/images/level_1/guy blue sprites.png", {frameWidth: 36, frameHeight: 36}); 
// blue character
    scene.load.spritesheet("redGuy", "./assets/images/level_1/red guy blue sprites.png", {frameWidth: 36, frameHeight: 36}); 
// blue character
    scene.load.spritesheet("collapsingRed", "./assets/images/level_1/collapsing_red.png", {frameWidth: 36, frameHeight: 36});
    scene.load.spritesheet("collapsingBlue", "./assets/images/level_1/collapsing_blue.png", {frameWidth: 36, frameHeight: 36});
    scene.load.spritesheet("NPC", "./assets/images/level_1/NPC sprites.png", { frameWidth: 36, frameHeight: 36});
// NPC
   // scene.load.spritesheet("ZZZ", "./assets/images/level_1/white z.png", {frameWidth: 36, frameHeight: 36}); 
// zzz when sleeping
    scene.load.image("drums", "./assets/images/level_1/drums.png"); //Objects
    scene.load.image("table", "./assets/images/level_1/table.png");
    scene.load.image("speakers", "./assets/images/level_1/speakers.png");
    scene.load.image("messageBoard", "./assets/images/level_1/dialogue window rectangle.png"); // dialogue window       
    scene.load.image("startButton", "./assets/images/level_1/start_button.png"); // start button       
    scene.load.image("interactButton", "./assets/images/level_1/interact_button.png"); // interact window       
    scene.load.spritesheet("ZZZIcon", "./assets/images/level_1/white z.png", {frameWidth: 36, frameHeight: 36});
    scene.load.audio("outro", "./assets/audio/Bluepoint Outro Music.mp3");
    scene.load.audio("song", "./assets/audio/Gutted.mp3");
    files_level_1_loaded = true;
}

let files_level_2_loaded = false;
load_files_level_2 = function (scene) {
    if (files_level_2_loaded) return;
    scene.load.audio("outro", "./assets/audio/Bluepoint Outro Music.mp3");
    scene.load.audio("song2", "./assets/audio/New Pallet Theme.mp3");
    scene.load.spritesheet("blueGuy", "https://raw.githubusercontent.com/davidmoncas/music_game/master/assets/images/level_1/guy blue sprites.png", {frameWidth: 36, frameHeight: 36}); 
// blue character
    scene.load.spritesheet("collapsingBlue", "./assets/images/level_1/collapsing_blue.png", { frameWidth: 36, frameHeight: 36});
    scene.load.image("messageBoard", "./assets/images/level_1/dialogue window rectangle.png"); // dialogue window       
    scene.load.image("startButton", "./assets/images/level_1/start_button.png"); // start button       
    scene.load.image("interactButton", "./assets/images/level_1/interact_button.png"); // interact window    
    scene.load.image("whiteSquare", "./assets/images/level_1/white_square.png");
    scene.load.image("level2_logo", "./assets/images/level_2/Lvl 2.png");
    scene.load.image("level2_back1", "./assets/images/level_2/collisions layer.png");
    scene.load.image("level2_back2", "./assets/images/level_2/base walkable area.png");
    scene.load.image("level2_back3", "./assets/images/level_2/dust layer.png");
    scene.load.image("level2_table", "./assets/images/level_2/table.png");
    scene.load.image("level2_outside", "./assets/images/level_2/Matchless outside.png");
    scene.load.spritesheet("footsteps", "./assets/images/level_2/footsteps.png", {frameWidth: 6,frameHeight: 6});
    scene.load.image("level2_back4", "./assets/images/level_2/base.png");
    scene.load.image("level2_lights", "./assets/images/level_2/lights_on.jpg");
    scene.load.image("level2_frontBar", "./assets/images/level_2/front bar.png");
    scene.load.spritesheet("level2_beerCrane", "./assets/images/level_2/beer crane 39x64.png", {frameWidth: 39, frameHeight: 64});
    scene.load.spritesheet("level2_beer", "./assets/images/level_2/beer 32x32.png", {frameWidth: 32,frameHeight: 32});
    scene.load.spritesheet("arrows_mobile", "./assets/images/level_2/arrows_mobile.png", {frameWidth: 50,frameHeight: 57});
    scene.load.image("GB drinks beer_1", "./assets/images/level_2/GB drinks beer/1.png");
    scene.load.image("GB drinks beer_2", "./assets/images/level_2/GB drinks beer/2.png");
    scene.load.image("GB drinks beer_3", "./assets/images/level_2/GB drinks beer/3.png");
    scene.load.image("GB drinks beer_4", "./assets/images/level_2/GB drinks beer/4.png");
    scene.load.image("GB drinks beer_5", "./assets/images/level_2/GB drinks beer/5.png");
    scene.load.image("GB drinks beer_6", "./assets/images/level_2/GB drinks beer/6.png");
    scene.load.image("GB drinks beer_7", "./assets/images/level_2/GB drinks beer/7.png");
    scene.load.image("GB drinks beer_8", "./assets/images/level_2/GB drinks beer/8.png");
    scene.load.image("GB drinks beer_9", "./assets/images/level_2/GB drinks beer/9.png");
    scene.load.image("GB drinks beer_10", "./assets/images/level_2/GB drinks beer/10.png");
    scene.load.image("GB drinks beer_11", "./assets/images/level_2/GB drinks beer/11.png");
    scene.load.image("GB drinks beer_12", "./assets/images/level_2/GB drinks beer/12.png");
    scene.load.image("GB drinks beer_13", "./assets/images/level_2/GB drinks beer/13.png");
    scene.load.image("GB Falling_1", "./assets/images/level_2/GB Falling/1.png");
    scene.load.image("GB Falling_2", "./assets/images/level_2/GB Falling/2.png");
    scene.load.image("GB Falling_3", "./assets/images/level_2/GB Falling/3.png");
    scene.load.image("GB Falling_4", "./assets/images/level_2/GB Falling/4.png");
    scene.load.image("GB Falling_5", "./assets/images/level_2/GB Falling/5.png");
    scene.load.image("GB Falling_6", "./assets/images/level_2/GB Falling/6.png");
    scene.load.image("GB Falling_7", "./assets/images/level_2/GB Falling/7.png");
    scene.load.image("GB Falling_8", "./assets/images/level_2/GB Falling/8.png");
    scene.load.image("GB Falling_9", "./assets/images/level_2/GB Falling/9.png");
    scene.load.image("GB Falling_10", "./assets/images/level_2/GB Falling/10.png");
    scene.load.image("GB falls asleep_1", "./assets/images/level_2/GB falls asleep/1.png");
    scene.load.image("GB falls asleep_2", "./assets/images/level_2/GB falls asleep/2.png");
    scene.load.image("GB falls asleep_3", "./assets/images/level_2/GB falls asleep/3.png");
    scene.load.image("GB falls asleep_4", "./assets/images/level_2/GB falls asleep/4.png");
    scene.load.image("GB falls asleep_5", "./assets/images/level_2/GB falls asleep/5.png");
    scene.load.image("GB falls asleep_6", "./assets/images/level_2/GB falls asleep/6.png");
    scene.load.image("GB falls asleep_7", "./assets/images/level_2/GB falls asleep/7.png");
    scene.load.image("GB falls asleep_8", "./assets/images/level_2/GB falls asleep/8.png");
    scene.load.image("GB falls asleep_9", "./assets/images/level_2/GB falls asleep/9.png");
    scene.load.image("GB spills beer_1", "./assets/images/level_2/GB spills beer/1.png");
    scene.load.image("GB spills beer_2", "./assets/images/level_2/GB spills beer/2.png");
    scene.load.image("GB spills beer_3", "./assets/images/level_2/GB spills beer/3.png");
    scene.load.image("GB spills beer_4", "./assets/images/level_2/GB spills beer/4.png");
    scene.load.image("GB spills beer_5", "./assets/images/level_2/GB spills beer/5.png");
    scene.load.image("GB spills beer_6", "./assets/images/level_2/GB spills beer/6.png");
    scene.load.image("GB spills beer_7", "./assets/images/level_2/GB spills beer/7.png");
    scene.load.image("GB spills beer_8", "./assets/images/level_2/GB spills beer/8.png");
    scene.load.image("GB spills beer_9", "./assets/images/level_2/GB spills beer/9.png");
    scene.load.image("GB spills beer_10", "./assets/images/level_2/GB spills beer/10.png");
    scene.load.image("GB spills beer_11", "./assets/images/level_2/GB spills beer/11.png");
    scene.load.image("GB Talking_1", "./assets/images/level_2/GB Talking/1.png");
    scene.load.image("GB Talking_2", "./assets/images/level_2/GB Talking/2.png");
    scene.load.image("GB Talking_3", "./assets/images/level_2/GB Talking/3.png");
    scene.load.image("GB Talking_4", "./assets/images/level_2/GB Talking/4.png");
    scene.load.image("GB Talking_5", "./assets/images/level_2/GB Talking/5.png");
    scene.load.image("GB Talking_6", "./assets/images/level_2/GB Talking/6.png");
    scene.load.image("GB wakes up, looks at RG_1", "./assets/images/level_2/GB wakes up, looks at RG/1.png");
    scene.load.image("GB wakes up, looks at RG_2", "./assets/images/level_2/GB wakes up, looks at RG/2.png");
    scene.load.image("GB wakes up, looks at RG_3", "./assets/images/level_2/GB wakes up, looks at RG/3.png");
    scene.load.image("GB wakes up, looks at RG_4", "./assets/images/level_2/GB wakes up, looks at RG/4.png");
    scene.load.image("GB wakes up, looks at RG_5", "./assets/images/level_2/GB wakes up, looks at RG/5.png");
    scene.load.image("GB wakes up, looks at RG_6", "./assets/images/level_2/GB wakes up, looks at RG/6.png");
    scene.load.image("GB wakes up, looks at RG_7", "./assets/images/level_2/GB wakes up, looks at RG/7.png");
    scene.load.image("GB wakes up, looks at RG_8", "./assets/images/level_2/GB wakes up, looks at RG/8.png");
    scene.load.image("GB wakes up, looks at RG_9", "./assets/images/level_2/GB wakes up, looks at RG/9.png");
    scene.load.image("GB wakes up, looks at RG_10", "./assets/images/level_2/GB wakes up, looks at RG/10.png");
    scene.load.image("GB wakes up, looks at RG_11", "./assets/images/level_2/GB wakes up, looks at RG/11.png");
    scene.load.image("GB wakes up, looks at RG_12", "./assets/images/level_2/GB wakes up, looks at RG/12.png");
    scene.load.image("GB wakes up, looks at RG_13", "./assets/images/level_2/GB wakes up, looks at RG/13.png");
    scene.load.image("GB wakes up, looks at RG_14", "./assets/images/level_2/GB wakes up, looks at RG/14.png");
    scene.load.image("GB wakes up, looks at RG_15", "./assets/images/level_2/GB wakes up, looks at RG/15.png");
    scene.load.image("GB wakes up, looks at RG_16", "./assets/images/level_2/GB wakes up, looks at RG/16.png");
    scene.load.image("RG checks on GB after he falls_1", "./assets/images/level_2/RG checks on GB after he falls/1.png");
    scene.load.image("RG checks on GB after he falls_2", "./assets/images/level_2/RG checks on GB after he falls/2.png");
    scene.load.image("RG checks on GB after he falls_3", "./assets/images/level_2/RG checks on GB after he falls/3.png");
    scene.load.image("RG checks on GB after he falls_4", "./assets/images/level_2/RG checks on GB after he falls/4.png");
    scene.load.image("RG pokes GB_1", "./assets/images/level_2/RG pokes GB/1.png");
    scene.load.image("RG pokes GB_2", "./assets/images/level_2/RG pokes GB/2.png");
    scene.load.image("RG pokes GB_3", "./assets/images/level_2/RG pokes GB/3.png");
    scene.load.image("RG pokes GB_4", "./assets/images/level_2/RG pokes GB/4.png");
    scene.load.image("RG pokes GB_5", "./assets/images/level_2/RG pokes GB/5.png");
    scene.load.image("RG pokes GB_6", "./assets/images/level_2/RG pokes GB/6.png");
    scene.load.image("RG pokes GB_7", "./assets/images/level_2/RG pokes GB/7.png");
    scene.load.image("RG pokes GB_8", "./assets/images/level_2/RG pokes GB/8.png");
    scene.load.image("RG talking no beer_1", "./assets/images/level_2/RG talking/No beer/1.png");
    scene.load.image("RG talking no beer_2", "./assets/images/level_2/RG talking/No beer/2.png");
    scene.load.image("RG talking no beer_3", "./assets/images/level_2/RG talking/No beer/3.png");
    scene.load.image("RG talking no beer_4", "./assets/images/level_2/RG talking/No beer/4.png");
    scene.load.image("RG talking no beer_5", "./assets/images/level_2/RG talking/No beer/5.png");
    scene.load.image("RG talking no beer_6", "./assets/images/level_2/RG talking/No beer/6.png");
    scene.load.image("RG talking no beer_7", "./assets/images/level_2/RG talking/No beer/7.png");
    scene.load.image("RG talking with beer_1", "./assets/images/level_2/RG talking/With beer/1.png");
    scene.load.image("RG talking with beer_2", "./assets/images/level_2/RG talking/With beer/2.png");
    scene.load.image("RG talking with beer_3", "./assets/images/level_2/RG talking/With beer/3.png");
    scene.load.image("RG talking with beer_4", "./assets/images/level_2/RG talking/With beer/4.png");
    scene.load.image("RG talking with beer_5", "./assets/images/level_2/RG talking/With beer/5.png");
    scene.load.image("RG talking with beer_6", "./assets/images/level_2/RG talking/With beer/6.png");
    scene.load.image("RG neutral_nb", "./assets/images/level_2/RG neutral_nb.png");
    scene.load.image("RG neutral_wb", "./assets/images/level_2/RG neutral_wb.png");
    scene.load.image("GB neutral", "./assets/images/level_2/GB neutral.png");
//arrows
    scene.load.image("level2_up", "./assets/images/level_2/up.png");
    scene.load.image("level2_down", "./assets/images/level_2/down.png");
    scene.load.image("level2_left", "./assets/images/level_2/left.png");
    scene.load.image("level2_right", "./assets/images/level_2/right.png");
    files_level_2_loaded = true;
}

// let files_intro_loaded = false;
// load_files_intro = function (scene) {
//     if (files_intro_loaded) return
//     //--------- Intro
//     scene.load.audio("intro_Synth", "./assets/audio/Bluepoint Intro Synth.mp3");
//     scene.load.audio("intro_Rythm", "./assets/audio/Bluepoint Intro Rhythm.mp3");
//     scene.load.audio("start_Sound", "./assets/audio/Start Sound.m4a");
//     scene.load.audio("loading", "./assets/audio/Bluepoint Loading Sound.m4a");
//     scene.load.image("mutedIcon", "./assets/images/level_1/unmute-icon-12.png");
//     files_intro_loaded = true;
// }