var intro_2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function intro_2() {

        Phaser.Scene.call(this, {
            key: 'intro_2',
            active: false
        });
    },

    preload: function () {

        //fix for the IOs bug in which videos doens't load, it will restart the page after 20 seconds
        this.refreshPage = this.time.delayedCall(15000, () => {
            window.location.replace(location.protocol + '//' + location.host + location.pathname + "?lvl=1");
        })

        // loading text
        this.loadingText = this.add.text(444, 260, "Loading Bluepoint ", {
            fontFamily: 'euroStyle',
            fontSize: 50
        }).setOrigin(0.5);

        this.time.delayedCall(2000, () => {
            this.loadingText.text = "Rendering Environment "
        });
        this.time.delayedCall(6000, () => {
            this.loadingText.text = "Populating Lobby "
        });

        this.time.delayedCall(10000, () => {
            this.loadingText.text = "Awaiting Clearance "
        });

        this.tweens.add({
            targets: this.loadingText,
            alpha: 0,
            duration: 2000,
            ease: 'Sine.easeInOut',
            loop: -1,
            yoyo: true,
        });
        //load_files_intro(this);
        load_files_level_2(this);
    },

    create: function () {

        //remove the delayed call that refresh the page
        this.refreshPage.destroy()


        this.loadingText.setVisible(false);

        this.background_videoB = this.add.video(444, 260, 'background_intro_1b').setLoop(true);
        this.background_videoB.stop();

        this.background_videoA = this.add.video(444, 260, 'background_intro_1a').setLoop(true);
        this.background_videoA.stop();


        this.background_video = this.add.video(444, 260, 'background_intro_1').setLoop(true);
        this.background_video.play(true);


        rythm = this.sound.add('intro_Rythm', {
            delay: 0
        }).setVolume(0);;

        synth = this.sound.add('intro_Synth', {
            delay: 0
        });

        loadingMusic = this.sound.add('loading', {
            delay: 0
        }).setVolume(0)

        start_sound = this.sound.add('start_Sound', {
            delay: 0
        });

        rythm.play()
        synth.play();


        this.cameras.main.setBackgroundColor('#FFFFFF')


        this.guttedText = this.add.image(444, 260, "level2_logo").setOrigin(0.5).setVisible(false).setAlpha(0);
        this.logo = this.add.image(444, 230, "bluepointLogo").setOrigin(0.5).setVisible(false).setAlpha(0);

        this.whiteRect = this.add.rectangle(0, 0, 888, 520).setFillStyle(0xffffff).setDepth(3).setOrigin(0, 0).setAlpha(0);

        this.flashingText = this.add.text(444, 430, 'TAP OR SPACE TO START ', {
            fontFamily: 'euroStyle',
            color: '#4063FF',
            fontSize: 30,
        }).setOrigin(0.5, 0.5).setVisible(false);

        this.flashingText.setInteractive();

        this.tweens.add({
            targets: this.flashingText,
            alpha: 0,
            duration: 1000,
            ease: 'Sine.easeInOut',
            loop: -1,
            yoyo: true,
        });

        this.add.text(444, 480, '© 2020 GUY BLUE ', {
            fontFamily: 'euroStyle',
            color: '#787878',
            fontSize: 25,
        }).setOrigin(0.5, 0.5);

        this.zone = this.add.zone(0, 0, 888, 520).setOrigin(0).setInteractive(); //zone for clicking
        this.zone.on('pointerdown', () => {

            if (!this.rectangleDialog.visible) {
                if (this.flashingText.visible) {
                    this.startMessage();
                    start_sound.play();
                    rythm.setVolume(0.8);
                }
            } else

            if (this.textDialog.text !== this.dialogMessages[this.currentMessageIndex]) {
                if (this.eventTyping !== undefined) {
                    this.eventTyping.remove();
                    this.textDialog.text = this.dialogMessages[this.currentMessageIndex];
                }
            } else this.typingEffect();
        })


        createMenu(this, ["Menu ", "Loser Board "], [
            () => {
                this.game.sound.stopAll();
                this.scene.start("map");
            },
            () => {
                rythm.stop();
                synth.stop();
                this.scene.stop("intro_2");
                this.scene.start("loserBoard", {
                    type: 3,
                    name: null,
                    score: 0,
                    colectionName: "scores_lvl_2",
                    level: 2
                })
            }
        ], 250, 40, 750, 40)


        createSocialMediaMenu(this, "Bar%20Matched%20still%20exists%20in%20%23Bluepoint-"); // create the social media menu for facebook, twiter and copy link

        //--------------------Mute button
        this.mutedIcon = this.add.image(10, 520, "mutedIcon").setScale(0.5).setOrigin(0, 1).setAlpha(0.6);




        this.input.keyboard.on('keydown_SPACE', (event) => {
            if (!this.rectangleDialog.visible) {
                if (this.flashingText.visible) {
                    this.startMessage();
                    start_sound.play();
                    rythm.setVolume(1);
                }
            } else

            if (this.textDialog.text !== this.dialogMessages[this.currentMessageIndex]) {
                if (this.eventTyping !== undefined) {
                    this.eventTyping.remove();
                    this.textDialog.text = this.dialogMessages[this.currentMessageIndex];
                }
            } else if (this.currentMessageIndex <= 3) this.typingEffect();
        });


        this.flashingText.on('pointerdown', () => {

            if (!this.rectangleDialog.visible) {
                if (this.flashingText.visible) {
                    this.startMessage();
                    start_sound.play();
                    rythm.setVolume(1);
                }
            } else

            if (this.textDialog.text !== this.dialogMessages[this.currentMessageIndex]) {
                if (this.eventTyping !== undefined) {
                    this.eventTyping.remove();
                    this.textDialog.text = this.dialogMessages[this.currentMessageIndex];
                }
            } else this.typingEffect();
        });

        // -------------------------------- T I M E D       E V E N T S

        this.cameras.main.fadeIn(500);



        this.time.delayedCall(1000, () => { //     At 0:01
            this.logo.visible = true;
            this.tweens.add({
                targets: this.logo,
                alpha: {
                    from: 0,
                    to: 1
                },
                duration: 2000,
                ease: 'Linear',
                loop: 0,
                yoyo: false
            });
        });


        this.time.delayedCall(3000, () => { //     At 0:03

            this.guttedText.visible = true;
            this.tweens.add({
                targets: [this.guttedText],
                alpha: {
                    from: 0,
                    to: 1
                },
                duration: 2000,
                ease: 'Linear',
                loop: 0,
                yoyo: false
            });
        });


        this.time.delayedCall(5000, () => { //     At 0:05
            this.flashingText.visible = true;
        });



        // ---------------------------------  D I A L O G

        this.startMessage = () => {


            this.logo.visible = false;
            this.guttedText.visible = false;
            this.flashingText.visible = false;
            this.background_video.play(false);
            this.background_video.destroy();

            this.background_videoA.play(true);

            this.time.delayedCall(6000, () => {
                this.background_videoA.play(false);
                this.background_videoA.destroy();
                this.background_videoB.play(true);


                this.rectangleDialog.visible = true;
                this.textDialog.visible = true;
                this.textDialogInstructions.visible = true;
                this.typingEffect();
            })
        }


        this.currentMessageIndex = -1;
        this.dialogMessages = ['Welcome to Bluepoint,',
            'A virtual world where the past can be preserved and explored.',
            'But, if you weren’t with me last time - my world is falling apart.',
            'Upload sequence initiated. Running program brkln2010s.exe.',
            'See you there.'
        ]

        this.rectangleDialog = this.add.rectangle(444, 375, 500, 150).setVisible(false).setFillStyle(0x4063FF, 0.6);



        this.textDialog = this.add.text(220, 320, this.dialogMessages[this.currentMessageIndex], {
            fontFamily: 'euroStyle',
            wordWrap: {
                width: 400,
                useAdvancedWrap: true
            },
        }).setFontSize(25).setVisible(false).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);


        this.textDialogInstructions = this.add.text(450, 420, 'Tap or press space to continue', {
            fontFamily: 'euroStyle'
        }).setFontSize(15).setVisible(false).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);;



        this.typingEffect = () => {

            this.currentMessageIndex++;

            if (this.currentMessageIndex > this.dialogMessages.length - 1) return;

            if (this.currentMessageIndex === 3) {
                this.zone.setInteractive(false);
                this.zone.destroy('pointerdown');
                this.textDialogInstructions.setVisible(false);

                //this.typingEffect()
                this.time.delayedCall(4000, () => {
                    this.typingEffect()
                });

                this.time.delayedCall(4000, () => {

                    this.tweens.add({ // fade out rythm
                        targets: rythm,
                        volume: {
                            from: 0.8,
                            to: 0
                        },
                        duration: 5000,
                        ease: 'Sine.easeInOut',
                        loop: 0,
                        yoyo: false,
                    })
                    this.tweens.add({ // fade out synth
                        targets: synth,
                        volume: {
                            from: 1,
                            to: 0
                        },
                        duration: 5000,
                        ease: 'Sine.easeInOut',
                        loop: 0,
                        yoyo: false,
                    })

                    loadingMusic.play();

                    this.tweens.add({
                        targets: loadingMusic,
                        volume: {
                            from: 0,
                            to: 1
                        },
                        duration: 5000,
                        ease: 'Sine.easeInOut',
                        loop: 0,
                        yoyo: false,
                    })

                    this.tweens.add({
                        targets: this.whiteRect,
                        alpha: {
                            from: 0,
                            to: 1
                        },
                        duration: 5000,
                        ease: 'Sine.easeInOut',
                        loop: 0,
                        yoyo: false,
                    })

                    this.time.delayedCall(13000, () => {
                        this.game.sound.stopAll();
                        this.scene.start("level_2");
                    });

                });

                //return;
            }

            let i = 0;
            this.textDialog.text = "";
            if (this.eventTyping !== undefined) this.eventTyping.remove(false); //stop all the typing events, if exist
            this.eventTyping = this.time.addEvent({ // create the event that makes the typing effect
                delay: 50,
                callback: (text) => {

                    this.textDialog.text += this.dialogMessages[this.currentMessageIndex][i]
                    i++
                },
                args: [],
                repeat: this.dialogMessages[this.currentMessageIndex].length - 1
            });
        }

    },

    update: function () {}
})