const initialTime = 10;
let poly;
let background;

let player;

let controls = {
    joystickLocked: true,
    buttonsLocked: false
}


var intro_1 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function intro_1() {

        Phaser.Scene.call(this, {
            key: 'intro_1',
            active: false
        });
    },
    preload: function () {

        //fix for the IOs bug in which videos doens't load, it will restart the page after 20 seconds
        this.refreshPage= this.time.delayedCall(15000,()=>window.location.replace(location.protocol + '//' + location.host + location.pathname+ "?lvl=1"));
        // loading text
        this.loadingText = this.add.text(444, 260, "Loading Bluepoint ", {fontFamily: 'euroStyle', fontSize: 50}).setOrigin(0.5);

        //load_files_intro(this);
        load_files_level_1(this);

        this.time.delayedCall(2000, () => this.loadingText.text = "Rendering Environment ");
        this.time.delayedCall(6000, () => this.loadingText.text = "Populating Lobby ");
        this.time.delayedCall(10000, () => this.loadingText.text = "Awaiting Clearance ");
        this.tweens.add({targets: this.loadingText,alpha: 0, duration: 2000, ease: 'Sine.easeInOut', loop: -1, yoyo: true});

    },
    create: function () {
                    this.game.sound.stopAll();
                    this.scene.start("level_1");
    }
});


var level_1 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function level_1() {
        Phaser.Scene.call(this, {
            key: 'level_1',
            active: false
        });
    },

    preload: function () {
        load_files_level_1(this);
    },

    create: function () {

        background = this.add.image(0, 0, "background_1").setOrigin(0, 0);
        //this.bloom = this.add.image(0, 0, "bloom").setOrigin(0, 0);
        //this.bloom.visible = false;

        // polygon for the floor boundaries
        poly = new Phaser.Geom.Polygon([
            new Phaser.Geom.Point(0, 257.33), new Phaser.Geom.Point(0, 210.39), 
            new Phaser.Geom.Point(5.22, 204.13), new Phaser.Geom.Point(14.95, 204.13),
            new Phaser.Geom.Point(39.3, 180.13), new Phaser.Geom.Point(43.82, 180.13),
            new Phaser.Geom.Point(63.64, 160.66), new Phaser.Geom.Point(52.86, 157.88), 
            new Phaser.Geom.Point(95.98, 114.76), new Phaser.Geom.Point(119.28, 128.67),
            new Phaser.Geom.Point(146.4, 114.76), new Phaser.Geom.Point(148.14, 97.02),
            new Phaser.Geom.Point(199.95, 98.06), new Phaser.Geom.Point(199.95, 113.36),
            new Phaser.Geom.Point(269.16, 112.32), new Phaser.Geom.Point(269.5, 98.06), 
            new Phaser.Geom.Point(316.45, 98.06), new Phaser.Geom.Point(353.66, 132.84), 
            new Phaser.Geom.Point(296.28, 132.84), new Phaser.Geom.Point(295.58, 143.27), 
            new Phaser.Geom.Point(374.52, 222.56), new Phaser.Geom.Point(440.59, 220.82), 
            new Phaser.Geom.Point(443.03, 223.25), new Phaser.Geom.Point(443.03, 258.03), 
            new Phaser.Geom.Point(0, 257.33)
        ]);

        loadAnimationsPlayer(this);
        player = new Player_Lvl_1(98, 141, poly);

        player.avatar = this.add.sprite(player.x, player.y, "blueGuy", 0);
        player.avatar.depth=player.avatar.y;

        // this.black = this.add.image(0, 0, "black").setOrigin(0, 0).setVisible(false);
        // this.black.alpha = 0;
        this.dust = this.add.image(player.avatar.x, player.avatar.y, "dust").setOrigin(0.5, 0.5).setVisible(false).setAlpha(0);

        
// other animations for guy blue
    // //---- collapsing
    //     this.anims.create({key: "collapseBlue",repeat: 0, frameRate: 2, frames: this.anims.generateFrameNumbers('collapsingBlue', {frames: [0, 1, 2, 3]})});
    //     this.anims.create({key: "collapseRed",repeat: 0, frameRate: 2, frames: this.anims.generateFrameNumbers('collapsingRed', {frames: [0, 1, 2, 3]})});
    // //---- stand up from collapse position
    //     this.anims.create({key: "standUpBlue", repeat: 0, frameRate: 2, frames: this.anims.generateFrameNumbers('collapsingBlue', {frames: [3, 2, 1, 0]})});
    //     this.anims.create({key: "standUpRed", repeat: 0, frameRate: 2, frames: this.anims.generateFrameNumbers('collapsingRed', {frames: [3, 2, 1, 0]})});
        //--------------------------------------------------     NPC's
        createNPCS_Level_1();
        this.anims.create({key: "idleJon", repeat: -1, frameRate: 5, frames: this.anims.generateFrameNumbers('NPC', {frames: [5, 6]})});
        this.anims.create({key: "idleSally", repeat: -1, frameRate: 2, frames: this.anims.generateFrameNumbers('NPC', {frames: [16, 17]})});
        this.anims.create({key: "idleDillon", repeat: -1,frameRate: 5, frames: this.anims.generateFrameNumbers('NPC', {frames: [27, 28, 29]})});
        this.anims.create({key: "idleChester", repeat: -1, frameRate: 5, frames: this.anims.generateFrameNumbers('NPC', {frames: [38, 39, 40]})});
        this.anims.create({key: "idleElla", repeat: -1, frameRate: 5, frames: this.anims.generateFrameNumbers('NPC', {frames: [49, 50, 51]})});
        this.anims.create({ key: "idleBela",repeat: -1, frameRate: 5, frames: this.anims.generateFrameNumbers('NPC', {frames: [60, 61, 62, 63]})});
        this.anims.create({key: "idleAnna", repeat: -1, frameRate: 5, frames: this.anims.generateFrameNumbers('NPC', {frames: [71, 72, 73, 74]})});
        this.anims.create({key: "idleTyler", repeat: -1, frameRate: 5, frames: this.anims.generateFrameNumbers('NPC', {frames: [82, 83, 84, 85]})});
        this.anims.create({key: "idleNick", repeat: -1, frameRate: 5, frames: this.anims.generateFrameNumbers('NPC', {frames: [93, 94, 95]})});
        this.anims.create({key: "idleAaron", repeat: -1, frameRate: 1, frames: this.anims.generateFrameNumbers('NPC', {frames: [104, 104, 104, 105]})});
        this.anims.create({key: "idleSam",repeat: -1, frameRate: 1, frames: this.anims.generateFrameNumbers('NPC', {frames: [115, 116, 115, 115]})});
        this.anims.create({key: "idleAlex", repeat: -1, frameRate: 2, frames: this.anims.generateFrameNumbers('NPC', {frames: [137, 138, 139, 140]})});
        this.anims.create({key: "idleBenny",repeat: -1, frameRate: 5, frames: this.anims.generateFrameNumbers('NPC', {frames: [121, 122, 123]})});
        this.anims.create({key: "idleBassist", repeat: -1, frameRate: 5, frames: this.anims.generateFrameNumbers('NPC', {frames: [143, 144, 145]})});
        this.anims.create({key: "idleGuitarist", repeat: -1, frameRate: 5, frames: this.anims.generateFrameNumbers('NPC', {frames: [154, 155, 156]})});
        this.anims.create({key: "idleDrummer", repeat: -1, frameRate: 5, frames: this.anims.generateFrameNumbers('NPC', {frames: [165, 166]})});

        //----------------------------------------     sleep NPC's  -------------------------------------------
        this.anims.create({key: "sleepJon", repeat: -1, frameRate: 2, frames: this.anims.generateFrameNumbers('NPC', {frames: [9, 10]})});
        this.anims.create({key: "sleepSally", repeat: -1, frameRate: 2, frames: this.anims.generateFrameNumbers('NPC', {frames: [20, 21]})});
        this.anims.create({key: "sleepDillon", repeat: -1, frameRate: 2, frames: this.anims.generateFrameNumbers('NPC', {frames: [31, 32]})});
        this.anims.create({key: "sleepChester", repeat: -1, frameRate: 2, frames: this.anims.generateFrameNumbers('NPC', {frames: [42, 43]})});
        this.anims.create({key: "sleepElla", repeat: -1, frameRate: 1, frames: this.anims.generateFrameNumbers('NPC', {frames: [53, 54]})});
        this.anims.create({key: "sleepBela", repeat: -1, frameRate: 1.5, frames: this.anims.generateFrameNumbers('NPC', {frames: [64, 65]})});
        this.anims.create({key: "sleepAnna", repeat: -1,frameRate: 2,frames: this.anims.generateFrameNumbers('NPC', {frames: [75, 76]})});
        this.anims.create({key: "sleepTyler", repeat: -1,frameRate: 2,frames: this.anims.generateFrameNumbers('NPC', {frames: [86, 87]})});
        this.anims.create({key: "sleepNick", repeat: -1, frameRate: 1.5, frames: this.anims.generateFrameNumbers('NPC', {frames: [97, 98]})});
        this.anims.create({key: "sleepAaron", repeat: -1, frameRate: 2, frames: this.anims.generateFrameNumbers('NPC', {frames: [108, 109]})});
        this.anims.create({key: "sleepSam", repeat: -1, frameRate: 2, frames: this.anims.generateFrameNumbers('NPC', {frames: [119, 120]})});
        this.anims.create({key: "sleepBenny", repeat: -1, frameRate: 1, frames: this.anims.generateFrameNumbers('NPC', {frames: [130, 131]})});
        this.anims.create({key: "sleepAlex", repeat: -1, frameRate: 1.5, frames: this.anims.generateFrameNumbers('NPC', {frames: [141, 142]})});
        this.anims.create({key: "sleepBassist", repeat: -1, frameRate: 2, frames: this.anims.generateFrameNumbers('NPC', {frames: [152, 153]})});
        this.anims.create({key: "sleepGuitarist", repeat: -1, frameRate: 2, frames: this.anims.generateFrameNumbers('NPC', {frames: [163, 164]})});
        this.anims.create({key: "sleepDrummer", repeat: -1, frameRate: 2, frames: this.anims.generateFrameNumbers('NPC', {frames: [174, 175]})});
        this.anims.create({key: "ZZZ", repeat: -1, frameRate: 3, frames: this.anims.generateFrameNumbers('ZZZ', {frames: [0, 1]})});
        this.anims.create({key: "discoBall", repeat: -1, frameRate: 1, frames: this.anims.generateFrameNumbers('discoBall', {frames: [0, 1]})});

        Ella.avatar = this.add.sprite(Ella.x, Ella.y, "NPC", 0);
        Ella.avatar.depth = Ella.y;
        Ella["avatar"].play("idleElla");
        //
        Jon.avatar = this.add.sprite(Jon.x, Jon.y, "NPC", 0);
        Jon.avatar.depth = Jon.y;
        Jon["avatar"].play("idleJon");
        //
        Sally.avatar = this.add.sprite(Sally.x, Sally.y, "NPC", 0);
        Sally.avatar.depth = Sally.y;
        Sally["avatar"].play("idleSally");
        //
        Dillon.avatar = this.add.sprite(Dillon.x, Dillon.y, "NPC", 0);
        Dillon.avatar.depth = Dillon.y;
        Dillon["avatar"].play("idleDillon");
        //
        Chester.avatar = this.add.sprite(Chester.x, Chester.y, "NPC", 0);
        Chester.avatar.depth = Chester.y;
        Chester["avatar"].play("idleChester");
        //
        Bela.avatar = this.add.sprite(Bela.x, Bela.y, "NPC", 0);
        Bela.avatar.depth = Bela.y;
        Bela["avatar"].play("idleBela");
        //
        Anna.avatar = this.add.sprite(Anna.x, Anna.y, "NPC", 0);
        Anna.avatar.depth = Anna.y;
        Anna["avatar"].play("idleAnna");
        //
        Tyler.avatar = this.add.sprite(Tyler.x, Tyler.y, "NPC", 0);
        Tyler.avatar.depth = Tyler.y;
        Tyler["avatar"].play("idleTyler");
        //
        Nick.avatar = this.add.sprite(Nick.x, Nick.y, "NPC", 0);
        Nick.avatar.depth = Nick.y;
        Nick["avatar"].play("idleNick");
        //
        Aaron.avatar = this.add.sprite(Aaron.x, Aaron.y, "NPC", 0);
        Aaron.avatar.depth = Aaron.y;
        Aaron["avatar"].play("idleAaron");
        //
        Sam.avatar = this.add.sprite(Sam.x, Sam.y, "NPC", 0);
        Sam.avatar.depth = Sam.y;
        Sam["avatar"].play("idleSam");
        //
        Alex.avatar = this.add.sprite(Alex.x, Alex.y, "NPC", 0);
        Alex.avatar.depth = Alex.y;
        Alex["avatar"].play("idleAlex");
        //
        bassist.avatar = this.add.sprite(bassist.x, bassist.y, "NPC", 0);
        bassist.avatar.depth = bassist.y;
        bassist["avatar"].play("idleBassist");
        //
        guitarist.avatar = this.add.sprite(guitarist.x, guitarist.y, "NPC", 0);
        guitarist.avatar.depth = guitarist.y;
        guitarist["avatar"].play("idleGuitarist");
        //
        drummer.avatar = this.add.sprite(drummer.x, drummer.y, "NPC", 0);
        drummer.avatar.depth = drummer.y;
        drummer["avatar"].play("idleDrummer");
        //
        Benny.avatar = this.add.sprite(Benny.x, Benny.y, "NPC", 0);
        Benny.avatar.depth = Benny.y;
        Benny["avatar"].play("idleBenny");
        //
        Door1.avatar = {
            x: Door1.x,
            y: Door1.y
        };
        Door2.avatar = {
            x: Door2.x,
            y: Door2.y
        };
        Exit.avatar = {
            x: Exit.x,
            y: Exit.y
        };

    // NPCS.forEach(el => {
    //         if (el["name"] !== "Door" && el["name"] !== "exit") {
    //             el["zzz"] = this.add.sprite(el.avatar.x, el.avatar.y - 20, "ZZZ").play("ZZZ");
    //             el["zzz"].setDepth(el.avatar.depth);
    //             el["zzz"].visible = false;
    //             el["tween"] = this.tweens.add({
    //                 targets: el["avatar"],
    //                 alpha: {
    //                     from: 0,
    //                     to: 1
    //                 },
    //                 duration: 500,
    //                 ease: 'Sine.easeInOut',
    //                 loop: -1,
    //             });
    //             el["tween"].stop();
    //         }
    //     });

        //when the game loses its focus it should stop the clock
        this.game.events.on('blur', () => {
            this.scene.pause();
            this.time.paused = true
        });
        this.game.events.on('focus', () => {
            this.time.paused = false
            this.scene.resume();
        });

        this.table = this.add.image(234, 96, "table").setDepth(96);
        this.drums = this.add.image(371, 162, "drums").setDepth(162);
        this.speakers = this.add.image(335, 136, "speakers").setDepth(136);
        this.discoball = this.add.sprite(281, 55, "discoBall").play("discoBall");

        player["avatar"].play("idleDownBlue");

        this.input.keyboard.on('keyup', (event) => {
            if (!controls.joystickLocked)
                player.returnToIdle();
            player.direction = null;
            player.moving = false;
        })

        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.input.keyboard.clearCaptures();
        this.cameras.main.zoom = 4;
        this.cameras.main.startFollow(player.avatar, true)
        this.cameras.main.setBounds(0, 20, 440, 250);

        controls.buttonsLocked = true;

        // --------------------------- T I M E      E V E N T S

        // timedEvent = this.time.delayedCall(16000 + initialTime, () =>  background.setTexture("background_2"));
        // timedEvent = this.time.delayedCall(16100 + initialTime, () =>  background.setTexture("background_1"));
        // timedEvent = this.time.delayedCall(45000 + initialTime, () =>  background.setTexture("background_2"));
        // timedEvent = this.time.delayedCall(45100 + initialTime, () =>  background.setTexture("background_1"));
        // timedEvent = this.time.delayedCall(60000 + initialTime, () =>  background.setTexture("background_2"));
        // timedEvent = this.time.delayedCall(60100 + initialTime, () =>  background.setTexture("background_1"));
        // timedEvent = this.time.delayedCall(65000 + initialTime, () =>  background.setTexture("background_2"));
        // timedEvent = this.time.delayedCall(65100 + initialTime, () =>  background.setTexture("background_1"));
        // timedEvent = this.time.delayedCall(70000 + initialTime, () =>  background.setTexture("background_2"));
        // timedEvent = this.time.delayedCall(70100 + initialTime, () =>  background.setTexture("background_1"));
        // timedEvent = this.time.delayedCall(74000 + initialTime, () =>  background.setTexture("background_2"));
        // timedEvent = this.time.delayedCall(74100 + initialTime, () =>  background.setTexture("background_1"));
        // timedEvent = this.time.delayedCall(76000 + initialTime, () =>  background.setTexture("background_2"));
        // timedEvent = this.time.delayedCall(76100 + initialTime, () =>  background.setTexture("background_1"));
        // timedEvent = this.time.delayedCall(77000 + initialTime, () =>  background.setTexture("background_2"));
        // timedEvent = this.time.delayedCall(77100 + initialTime, () =>  background.setTexture("background_1"));
      //  timedEvent = this.time.delayedCall(68000 + initialTime, () =>  this.bloom.visible = true);
        // timedEvent = this.time.delayedCall(140500 + initialTime, () => {
        //     background.setTexture("background_2");
        //     this.table.visible = false;
        //     this.drums.visible = false;
        //     this.speakers.visible = false;
        //     this.discoball.visible = false;
        //     controls.buttonsLocked = true;
        //     controls.joystickLocked = true;
        //     player.avatar.play("idleDown" + player.shirt);
        //   //  this.bloom.visible = false;
        //     hideAllCharacters();
        //     //console.log("end gamepart in: " + music.seek);
        // });
        // timedEvent = this.time.delayedCall(150000 + initialTime, () => {
        //     this.tweens.add({targets: this.cameras.main, zoom: {from: 4, to: 2}, duration: 4000, ease: 'Linear', loop: 0});
        // });
        // timedEvent = this.time.delayedCall(154000 + initialTime, () => {
        //     this.black.visible = true;              // fade to black
        //     this.black.depth = player.avatar.depth - 2;
        //     this.tweens.add({targets: this.black, alpha: {from: 0, to: 1}, duration: 4000, ease: 'Sine.easeInOut', loop: 0, yoyo: false});
        // });
    // camera zoom in again
        // timedEvent = this.time.delayedCall(160000 + initialTime, () => {
        //     this.tweens.add({targets: this.cameras.main, zoom: {from: 2, to: 4}, duration: 4000, ease: 'Linear', loop: 0});
        // });
        // timedEvent = this.time.delayedCall(168000 + initialTime, () => {
        //     this.particles = []
        //     this.particlesAlpha={};
        //     this.particlesAlpha.alpha=0;     
        //     createDust(100).forEach(el=>{      
        //         var rect = this.bloom = this.add.image(el.x, el.y, "whiteSquare").setDepth(player.avatar.y - 1);
        //         rect.speed=Math.random() *4 + 1;
        //         this.particles.push(rect);
        //     });
        //     this.tweens.add({targets: this.particlesAlpha, alpha: {from: 0, to: 1}, duration: 5000, ease: 'Linear', loop: 0});
        // });
        this.scene.launch("hud_1");
        this.cameras.main.fadeIn(2000,255,255,255);
    },

    update: function (time, delta) {

        if (!controls.joystickLocked) {
            if (this.downKey.isDown || this.SKey.isDown) player.move(down);
            if (this.upKey.isDown || this.WKey.isDown) player.move(up);
            if (this.rightKey.isDown || this.DKey.isDown) player.move(right);
            if (this.leftKey.isDown || this.AKey.isDown) player.move(left);
        }
       // if (this.bloom.visible === true) this.bloom.alpha = (((Math.sin(time / 200) + 1) / 2));
        // if(this.particles!==undefined){
        //     this.particles.forEach(el=>{
        //         el.y+=el.speed;
        //         el.alpha=((530-el.y)/530)*this.particlesAlpha.alpha
        //         if(el.y>530) el.y=-5;
        //     })
        // }
    }
})

function createDust(numberParticles){
    let dustParticles=[]
    for (let i=0; i<numberParticles;i++){
       dustParticles.push({x:Math.random()*888, y:Math.random()*250,alpha:1})
    }
    return dustParticles;
}



