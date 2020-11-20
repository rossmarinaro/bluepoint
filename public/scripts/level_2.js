var points = [];

var level_2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function level_2() {
        Phaser.Scene.call(this, {
            key: 'level_2',
            active: false
        });
    },

    preload: function () {
        load_files_level_2(this);
    },

    create: function () {

        //when the game loses its focus it should stop the clock
        this.game.events.on('blur', () => {
            this.scene.pause();
            this.time.paused = true
        });
        this.game.events.on('focus', () => {
            this.time.paused = false
            this.scene.resume();
        });

        this.background2 = this.add.image(0, 0, "level2_back2").setOrigin(0, 0);
        this.background3 = this.add.image(0, 0, "level2_back3").setOrigin(0, 0);
        this.background1 = this.add.image(0, 0, "level2_back1").setOrigin(0, 0);

        this.cameras.main.zoom = 2;
        this.cameras.main.setBounds(0, 20, 440, 250);


        //polygon for the floor boundaries (inside bar)
        this.poly = new Phaser.Geom.Polygon([
            new Phaser.Geom.Point(1, 252),
            new Phaser.Geom.Point(1, 211),
            new Phaser.Geom.Point(30, 182),
            new Phaser.Geom.Point(83, 180),
            new Phaser.Geom.Point(121, 142),
            new Phaser.Geom.Point(121, 136),
            new Phaser.Geom.Point(75, 134),
            new Phaser.Geom.Point(102, 109),
            new Phaser.Geom.Point(167, 109),
            new Phaser.Geom.Point(168, 135),
            new Phaser.Geom.Point(175, 139),
            new Phaser.Geom.Point(215, 141),
            new Phaser.Geom.Point(225, 135),
            new Phaser.Geom.Point(353, 134),
            new Phaser.Geom.Point(444, 223),
            new Phaser.Geom.Point(444, 252),

        ]);

        //colliders for the tables and chairs
        this.colls = [
            [122, 215, 10],
            [163, 200, 16],
            [265, 200, 16],
            [365, 200, 16],
            [345, 160, 10],
            [321, 135, 10],
            [288, 135, 10],
            [263, 135, 10],
            [199, 145, 10],
            [181, 145, 10],
        ];
        // this.colls.forEach(el => {
        //     this.add.circle(el[0], el[1], el[2], 0xff0000).setAlpha(0.5)
        //     //this.add.rectangle(el[0],el[1],el[2],el[2],0x00ff00).setAlpha(0.5)
        // });

        loadAnimationsPlayer(this);



        //add the player
        player = new Player_Lvl_2(30, 180, this.poly, this.colls);

        player.avatar = this.add.sprite(player.x, player.y, "blueGuy", 0);
        player.avatar.depth = player.avatar.y;
        player.avatar.play("idleDown" + player.shirt);



        // movement of the player
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.TKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T); //for tests!

        this.input.keyboard.on('keyup', (event) => {
            if (!controls.joystickLocked)
                player.returnToIdle();
            player.direction = null;
            player.moving = false;
        })

        controls.buttonsLocked = true;
        controls.joystickLocked = true;

        // footsteps
        this.showFootsteps = false;
        this.footsteps = [];
        this.frameFootsteps = {
            40: 0,
            38: 1,
            37: 2,
            39: 3
        }
        this.footstepOffsetX = 4;
        this.footstepOffsetY = 3;

        //dust effect
        this.playingParticles = false;
        numberParticles = 100;
        this.dustParticles = [];
        for (let i = 0; i < numberParticles; i++) {
            let particle = this.add.image(Math.random() * 888, Math.random() * 250, 'whiteSquare').setScale(Math.random())
            particle.speed = Math.random() * 4 + 1;
            this.dustParticles.push(
                particle
            )
        }


        NPCS = []; //delete the npcs from the first level
        this.input.keyboard.clearCaptures();
        controls.joystickLocked = false;


        this.input.on('pointerup', () => {
            var pointer = this.input.activePointer;
            points.push([pointer.x / 2, pointer.y / 2])

        })


        // first part of the level in the outside
        controls.joystickLocked = true;
        this.backgroundInside = this.add.image(0, 0, "level2_outside").setOrigin(0, 0);


        this.time.delayedCall(3000, () => { //start walking
            player.avatar.anims.play("walkRight" + player.shirt);
            this.walkingInside = this.tweens.add({
                targets: player.avatar,
                x: {
                    from: 30,
                    to: 270
                },
                duration: 5000,
                ease: 'Sine.easeInOut',
                loop: 0,
            });
        });

        this.time.delayedCall(8000, () => { // change the animation
            player.avatar.anims.play("idleUp" + player.shirt);
            this.cameras.main.fadeOut(1000);
        });

        this.time.delayedCall(9000, () => { // Fade to black
            this.backgroundInside.destroy();
            player.avatar.x = 128;
            player.avatar.y = 165;
            this.showFootsteps = true;
            this.playingParticles = true;
            this.cameras.main.fadeIn(1000);

            table = this.add.image(90, 127.5, "level2_table").setDepth(150) // table at the corner that should appear over blueGuy

        });

        this.time.delayedCall(28000, () => { // zoom in to the player     
            this.cameras.main.startFollow(player.avatar, true)

            this.tweens.add({
                targets: this.cameras.main,
                zoom: 5,
                duration: 3000,
                ease: 'Sine.easeInOut',
                loop: 0,
            });

        });
        this.time.delayedCall(31000, () => { //zoom in to the bar
            this.cameras.main.stopFollow();
            this.tweens.add({
                targets: this.cameras.main,
                scrollX: -150,
                scrollY: -150,
                duration: 2000,
                ease: 'Sine.easeInOut',
                loop: 0,
            });
        })


        this.time.delayedCall(32000, () => {
            this.cameras.main.fadeOut(2000);
        })

        this.time.delayedCall(34000, () => { // go to the next part of the level
            this.scene.start("level_2_2");
            //this.scene.stop();
        })


        this.scene.launch("hud_2");

    },





    update: function () {


        if (!controls.joystickLocked) {
            if (this.downKey.isDown || this.SKey.isDown) {
                player.move(down)
            }
            if (this.upKey.isDown || this.WKey.isDown) {
                player.move(up)
            }
            if (this.rightKey.isDown || this.DKey.isDown) {
                player.move(right)
            }
            if (this.leftKey.isDown || this.AKey.isDown) {
                player.move(left)
            }

        }

        // creating the footsteps
        if (this.showFootsteps) {
            if (this.footsteps.length !== 0) {

                let dist = distance(player.avatar.x, player.avatar.y + 15, this.footsteps[this.footsteps.length - 1].x, this.footsteps[this.footsteps.length - 1].y);
                if (dist > 8) {
                    let footstep;
                    if (player.direction == up || player.direction == down) {
                        this.footstepOffsetX *= -1
                        footstep = this.add.image(player.avatar.x + this.footstepOffsetX, player.avatar.y + 15, 'footsteps');
                    } else {
                        this.footstepOffsetY *= -1
                        footstep = this.add.image(player.avatar.x, player.avatar.y + 15 + this.footstepOffsetY, 'footsteps');
                    }

                    footstep.setTexture('footsteps', this.frameFootsteps[player.direction])
                    this.footsteps.push(footstep)
                }

                //reduce the opacity of the footsteps
                for (let i = this.footsteps.length - 1; i >= 0; i--) {
                    this.footsteps[i].alpha -= 0.005;
                    //delete the footstep object once its opacity is less than 0
                    if (this.footsteps[i].alpha < 0) {
                        this.footsteps[i].destroy();
                        this.footsteps.splice(i, 1);
                    }
                }

            } else {
                this.footsteps.push(this.add.image(player.avatar.x, player.avatar.y + 15, 'footsteps'))
            }
        }

        //moving the dust particles
        if (this.playingParticles) {
            this.dustParticles.forEach(el => {
                el.y += el.speed;
                el.alpha = ((530 - el.y) / 530);
                if (el.y > 530) {
                    el.y = -5;
                    el.setScale(Math.random())
                }
            })
        }
    }

})








//----------------------------SECOND PART OF THE LEVEL


var level_2_2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function level_2_2() {
        Phaser.Scene.call(this, {
            key: 'level_2_2',
            active: false
        });
    },

    preload: function () {
        loadLevel2(this);
    },

    create: function () {

        //when the game loses its focus it should stop the clock
        this.game.events.on('blur', () => {
            this.scene.pause();
            this.time.paused = true
        });
        this.game.events.on('focus', () => {
            this.time.paused = false
            this.scene.resume();
        });

        this.cameras.main.zoom = 2;
        this.cameras.main.setBounds(0, 0, 440, 250);

        //dust effect
        this.playingParticles = true;
        numberParticles = 100;
        this.dustParticles = [];
        for (let i = 0; i < numberParticles; i++) {
            let particle = this.add.image(Math.random() * 888, Math.random() * 250, 'whiteSquare').setScale(Math.random())
            particle.speed = Math.random() * 4 + 1;
            particle.depth = 2;
            this.dustParticles.push(
                particle
            )
        }

        //--- animations


        this.anims.create({
            key: 'GB_drinks_beer',
            frames: [{
                    key: 'GB drinks beer_1'
                },
                {
                    key: 'GB drinks beer_2'
                },
                {
                    key: 'GB drinks beer_3'
                },
                {
                    key: 'GB drinks beer_4'
                },
                {
                    key: 'GB drinks beer_5'
                },
                {
                    key: 'GB drinks beer_6'
                },
                {
                    key: 'GB drinks beer_7'
                },
                {
                    key: 'GB drinks beer_8'
                },
                {
                    key: 'GB drinks beer_9'
                },
                {
                    key: 'GB drinks beer_10'
                },
                {
                    key: 'GB drinks beer_11'
                },
                {
                    key: 'GB drinks beer_12'
                },
                {
                    key: 'GB drinks beer_13'
                },
                {
                    key: 'GB neutral'
                }
            ],
            frameRate: 8,
            repeat: 0
        });
        this.anims.create({
            key: 'GB_Falling',
            frames: [{
                    key: 'GB Falling_1'
                },
                {
                    key: 'GB Falling_2'
                },
                {
                    key: 'GB Falling_3'
                },
                {
                    key: 'GB Falling_4'
                },
                {
                    key: 'GB Falling_5'
                },
                {
                    key: 'GB Falling_6'
                },
                {
                    key: 'GB Falling_7'
                },
                {
                    key: 'GB Falling_8'
                },
                {
                    key: 'GB Falling_9'
                },
                {
                    key: 'GB Falling_10'
                }
            ],
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'GB_falls_asleep',
            frames: [{
                    key: 'GB falls asleep_1'
                },
                {
                    key: 'GB falls asleep_2'
                },
                {
                    key: 'GB falls asleep_3'
                },
                {
                    key: 'GB falls asleep_4'
                },
                {
                    key: 'GB falls asleep_5'
                },
                {
                    key: 'GB falls asleep_6'
                },
                {
                    key: 'GB falls asleep_7'
                },
                {
                    key: 'GB falls asleep_8'
                },
                {
                    key: 'GB falls asleep_9'
                }
            ],
            frameRate: 5,
            repeat: 0
        });

        this.anims.create({
            key: 'GB_sleepiing',
            frames: [{
                    key: 'GB falls asleep_7'
                },
                {
                    key: 'GB falls asleep_8'
                },
                {
                    key: 'GB falls asleep_9'
                }
            ],
            frameRate: 2,
            repeat: -1
        });


        this.anims.create({
            key: 'GB_spills_beer',
            frames: [{
                    key: 'GB spills beer_1'
                },
                {
                    key: 'GB spills beer_2'
                },
                {
                    key: 'GB spills beer_3'
                },
                {
                    key: 'GB spills beer_4'
                },
                {
                    key: 'GB spills beer_5'
                },
                {
                    key: 'GB spills beer_6'
                },
                {
                    key: 'GB spills beer_7'
                },
                {
                    key: 'GB spills beer_8'
                },
                {
                    key: 'GB spills beer_9'
                },
                {
                    key: 'GB spills beer_10'
                },
                {
                    key: 'GB spills beer_11'
                },
                {
                    key: 'GB neutral'
                }
            ],
            frameRate: 8,
            repeat: 0
        });

        this.anims.create({
            key: 'GB_Talking',
            frames: [{
                    key: 'GB Talking_1'
                },
                {
                    key: 'GB Talking_2'
                },
                {
                    key: 'GB Talking_3'
                },
                {
                    key: 'GB Talking_4'
                },
                {
                    key: 'GB Talking_5'
                },
                {
                    key: 'GB Talking_6'
                }
            ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'GB_wakes_up_looks_at_RG',
            frames: [{
                    key: 'GB wakes up, looks at RG_1'
                },
                {
                    key: 'GB wakes up, looks at RG_2'
                },
                {
                    key: 'GB wakes up, looks at RG_3'
                },
                {
                    key: 'GB wakes up, looks at RG_4'
                },
                {
                    key: 'GB wakes up, looks at RG_5'
                },
                {
                    key: 'GB wakes up, looks at RG_6'
                },
                {
                    key: 'GB wakes up, looks at RG_7'
                },
                {
                    key: 'GB wakes up, looks at RG_8'
                },
                {
                    key: 'GB wakes up, looks at RG_9'
                },
                {
                    key: 'GB wakes up, looks at RG_10'
                },
                {
                    key: 'GB wakes up, looks at RG_11'
                },
                {
                    key: 'GB wakes up, looks at RG_12'
                },
                {
                    key: 'GB wakes up, looks at RG_13'
                },
                {
                    key: 'GB wakes up, looks at RG_14'
                },
                {
                    key: 'GB wakes up, looks at RG_15'
                },
                {
                    key: 'GB wakes up, looks at RG_16'
                }
            ],
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'RG_checks_on_GB_after_he_falls',
            frames: [{
                    key: 'RG checks on GB after he falls_1'
                },
                {
                    key: 'RG checks on GB after he falls_2'
                },
                {
                    key: 'RG checks on GB after he falls_3'
                },
                {
                    key: 'RG checks on GB after he falls_4'
                }
            ],
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'RG_pokes_GB',
            frames: [{
                    key: 'RG pokes GB_1'
                },
                {
                    key: 'RG pokes GB_2'
                },
                {
                    key: 'RG pokes GB_3'
                },
                {
                    key: 'RG pokes GB_4'
                },
                {
                    key: 'RG pokes GB_5'
                },
                {
                    key: 'RG pokes GB_6'
                },
                {
                    key: 'RG pokes GB_7'
                },
                {
                    key: 'RG pokes GB_8'
                },
                {
                    key: 'RG pokes GB_8'
                },
                {
                    key: 'RG pokes GB_8'
                },
                {
                    key: 'RG pokes GB_8'
                },
                {
                    key: 'RG pokes GB_8'
                },
                {
                    key: 'RG pokes GB_8'
                }

            ],
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'RG_talking_no_beer',
            frames: [{
                    key: 'RG talking no beer_1'
                },
                {
                    key: 'RG talking no beer_2'
                },
                {
                    key: 'RG talking no beer_3'
                },
                {
                    key: 'RG talking no beer_4'
                },
                {
                    key: 'RG talking no beer_5'
                },
                {
                    key: 'RG talking no beer_6'
                },
                {
                    key: 'RG talking no beer_7'
                }
            ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'RG_talking_with_beer',
            frames: [{
                    key: 'RG talking with beer_1'
                },
                {
                    key: 'RG talking with beer_2'
                },
                {
                    key: 'RG talking with beer_3'
                },
                {
                    key: 'RG talking with beer_4'
                },
                {
                    key: 'RG talking with beer_5'
                },
                {
                    key: 'RG talking with beer_6'
                }
            ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "level2_beerCrane",
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('level2_beerCrane', {
                frames: [0, 1]
            })
        })

        this.anims.create({
            key: "filling_beer",
            repeat: 0,
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('level2_beer', {
                frames: [1, 1, 1, 0, 4]
            })
        })


        this.blueguy = this.add.sprite(0, 0, "GB Talking_1").setDepth(100).setScale(0.5).setOrigin(0);
        this.redguy = this.add.sprite(0, 0, "RG talking no beer_1").setDepth(100).setScale(0.5).setOrigin(0).setVisible(false);


        this.add.image(0, 0, "level2_back4").setOrigin(0, 0);
        this.lightsEffect = this.add.image(0, 0, "level2_lights").setOrigin(0, 0).setVisible(false);
        this.add.image(0, 0, "level2_frontBar").setOrigin(0, 0).setDepth(10);

        this.crane = this.add.sprite(297.5, 113, "level2_beerCrane", 0).setDepth(20);
        this.crane.play("level2_beerCrane")

        this.fillingBeer = this.add.sprite(299, 159, "level2_beer").setDepth(20).play("filling_beer");

        this.time.delayedCall(78000, () => {
            this.lightsEffect.setVisible(true);
            this.tweens.add({
                targets: this.lightsEffect,
                alpha: {
                    from: 0,
                    to: 0.8
                },
                duration: 500,
                ease: 'Sine.easeInOut',
                loop: -1,
                yoyo: true
            })
        })
    },

    update: function () {
        //moving the dust particles
        if (this.playingParticles) {
            this.dustParticles.forEach(el => {
                el.y += el.speed;
                el.alpha = ((530 - el.y) / 530);
                if (el.y > 530) {
                    el.y = -5;
                    el.setScale(Math.random())
                }
            })
        }
    },

    animateGuyBlue: function (animation) {
        this.blueguy.anims.play(animation);
    },

    animateRedguy: function (animation) {
        this.redguy.anims.play(animation);
    },

    showRedguy: function () {
        this.redguy.setVisible(true);
    },

    fillBeer: function () {
        this.fillingBeer.anims.play("filling_beer");
        this.crane.anims.play("level2_beerCrane");
    },

    endingAnimation: function () { //animations after the game ends
        this.blueguy.anims.play("GB_falls_asleep");

        this.time.delayedCall(1400, () => {
            this.blueguy.play("GB_sleepiing");
        })

        this.time.delayedCall(5000, () => { //lights effect start
            this.lightsEffect.setVisible(true);
            this.lightsEffectTween = this.tweens.add({
                targets: this.lightsEffect,
                alpha: {
                    from: 0,
                    to: 0.8
                },
                duration: 500,
                ease: 'Sine.easeInOut',
                loop: -1,
                yoyo: true
            })
        })

        this.time.delayedCall(9000, () => {
            this.lightsEffectTween.stop();
            this.lightsEffect.setVisible(false);

            this.redguy.setVisible(true);

            this.rgFlickeringTween = this.tweens.add({
                targets: this.redguy,
                alpha: {
                    from: 0,
                    to: 1
                },
                duration: 500,
                ease: 'Sine.easeInOut',
                loop: -1,
                yoyo: true
            })
        })

        this.time.delayedCall(14000, () => {
            this.rgFlickeringTween.stop();
            this.redguy.alpha = 1;
            this.redguy.anims.play("RG_pokes_GB");
        })

        this.time.delayedCall(18000, () => {
            this.redguy.anims.setTimeScale(1.25);
        })

        this.time.delayedCall(20000, () => {
            this.redguy.anims.setTimeScale(1.5);
        })

        this.time.delayedCall(22000, () => {
            this.redguy.anims.setTimeScale(2);
        })

        this.time.delayedCall(22500, () => {
            this.redguy.anims.stop();
            this.redguy.anims.setTimeScale(1);
            this.redguy.setTexture("RG neutral_nb");
            this.blueguy.anims.play("GB_wakes_up_looks_at_RG");
        })

        this.time.delayedCall(25000, () => {
            this.blueguy.anims.stop();
            this.blueguy.setTexture("GB neutral");
        })
    }
})


var level_2_3 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function level_2_3() {
        Phaser.Scene.call(this, {
            key: 'level_2_3',
            active: false
        });
    },

    preload: function () {

    },

    create: function () {

        //when the game loses its focus it should stop the clock
        this.game.events.on('blur', () => {
            this.scene.pause();
            this.time.paused = true
        });
        this.game.events.on('focus', () => {
            this.time.paused = false
            this.scene.resume();
        });


        this.cameras.main.zoom = 2;
        this.cameras.main.setBounds(0, 20, 440, 250);
        this.cameras.main.setBackgroundColor(0x000000);

        loadAnimationsPlayer(this);

        //add the player
        this.player = new Player_Lvl_2(290, 130, [], []);

        this.player.avatar = this.add.sprite(this.player.x, this.player.y, "blueGuy", 0);
        this.player.avatar.depth = this.player.avatar.y;
        this.player.avatar.play("idleDown" + this.player.shirt);

        this.tweens.add({ // fade in blueguy
            targets: this.player.avatar,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 3000,
            ease: 'Linear',
            loop: 0,
        });


        //---- collapsing
        this.anims.create({
            key: "collapseBlue",
            repeat: 0,
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('collapsingBlue', {
                frames: [0, 1, 2, 3]
            })
        })

        this.anims.create({
            key: "standUpBlue",
            repeat: 0,
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('collapsingBlue', {
                frames: [3, 2, 1, 0]
            })
        })


        this.black = this.add.image(0, 0, "black").setOrigin(0, 0).setVisible(false);
        this.black.alpha = 0;

        timedEvent = this.time.delayedCall(2000, () => {
            this.cameras.main.startFollow(this.player.avatar, true)
            this.cameras.main.setBounds(0, 20, 440, 250);


            this.tweens.add({ // camera zoom in again
                targets: this.cameras.main,
                zoom: {
                    from: 2,
                    to: 4
                },
                duration: 4000,
                ease: 'Linear',
                loop: 0,
            });
        })


        timedEvent = this.time.delayedCall(2500 + initialTime, () => {
            this.player.avatar.play("collapse" + this.player.shirt);
        })


        timedEvent = this.time.delayedCall(4000 + initialTime, () => {

            this.black.visible = true; // fade to black
            this.black.depth = this.player.avatar.depth - 2;
            this.tweens.add({
                targets: this.black,
                alpha: {
                    from: 0,
                    to: 1
                },
                duration: 4000,
                ease: 'Sine.easeInOut',
                loop: 0,
                yoyo: false,
            });

        })


        timedEvent = this.time.delayedCall(7000 + initialTime, () => {
            this.player.avatar.play("standUp" + this.player.shirt);
        });

        timedEvent = this.time.delayedCall(8000, () => {

            this.particles = []
            particles = this.particles;
            this.particlesAlpha = {};
            this.particlesAlpha.alpha = 0;

            this.tweens.add({
                targets: this.particlesAlpha,
                alpha: {
                    from: 0,
                    to: 1
                },
                duration: 4000,
                ease: 'Linear',
                loop: 0,
            });


            createDust(100).forEach(el => {

                var rect = this.bloom = this.add.image(el.x, el.y, "whiteSquare").setDepth(this.player.avatar.y - 1);
                rect.speed = Math.random() * 4 + 1;
                this.particles.push(rect);
            })
        });

        this.cameras.main.fadeIn(1000);

    },

    update: function () {
        if (this.particles !== undefined) {
            this.particles.forEach(el => {
                el.y += el.speed;
                el.alpha = ((300 - el.y) / 300) * this.particlesAlpha.alpha
                if (el.y > 300) el.y = 50;
            })
        }
    }

})