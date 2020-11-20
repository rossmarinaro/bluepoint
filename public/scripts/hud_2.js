var hud_2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function hud_2() {
            Phaser.Scene.call(this, {
                key: 'hud_2',
                active: false
            });
        },

    preload: function () {
        //------------------------------- Joystick

        if (mobileAndTabletCheck()) {
            var url;
            url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
            this.load.plugin('rexvirtualjoystickplugin', url, true);
        }
    },

    create: function () {

        this.level2 = this.scene.get('level_2_2')

        //when the game loses its focus it should stop the clock
        this.game.events.on('blur', () => {
            this.scene.pause();
            this.time.paused = true
        });
        this.game.events.on('focus', () => {
            this.time.paused = false
            this.scene.resume();
        });

        this.music = this.sound.add('song2', {
            delay: 0
        }).play();


        outroMusic = this.sound.add('outro', {
            delay: 0
        }).setVolume(0);

        this.playTime = 0;
        this.textToShow = "";

        this.nextText = '';
        this.eventTyping = undefined;
        this.messageToShow = "";


        this.textDialogue = this.add.text(190, 70, "", { //text showing the message of the NPC or Guy Blue
            fontFamily: 'ZCOOL QingKe HuangYou',
            wordWrap: {
                width: 430,
                useAdvancedWrap: true
            },
            align: 'left'
        }).setFontSize(25).setDepth(52);

        this.delay = 50; //time between letters for the typing effect

        this.typingEffect = (text, unlockControls, closeAtEnd, timeToClose) => {

            if (unlockControls === undefined) unlockControls = true;
            if (closeAtEnd === undefined) closeAtEnd = true;

            this.messageToShow = text;
            let i = 0;
            this.textToShow = "";
            this.textDialogue.text = this.textToShow;
            if (this.eventTyping !== undefined) this.eventTyping.remove(false); //stop all the typing events, if exist
            this.eventTyping = this.time.addEvent({ // create the event that makes the typing effect
                delay: this.delay,
                callback: (text) => {
                    this.textToShow += text[i]
                    this.textDialogue.text = this.textToShow;
                    i++
                },
                args: [text],
                repeat: text.length - 1
            });

            if (this.eventCloseDialog !== undefined) this.eventCloseDialog.remove(false); //stop all the timer events, if exist
            if (closeAtEnd) this.eventCloseDialog = this.time.addEvent({ // create the event that closes the dialog box after 2 seconds of finished
                delay: text.length * 50 + timeToClose,
                callback: () => {
                    this.hideDialogue(unlockControls);
                },
                args: [text]
            });
        }



        this.dialogueWindow = this.add.image(400, 100, "messageBoard").setScale(3.5, 1.7).setDepth(50).setInteractive();

        this.dialogueWindow.on('pointerdown', () => {

            if (!controls.buttonsLocked) {
                if (this.textDialogue.text !== this.messageToShow) {
                    this.textDialogue.text = this.messageToShow;
                    if (this.eventTyping !== undefined) this.eventTyping.remove(false);
                } else this.hideDialogue();
            }

            if (this.numberDialog !== 0) { //dialogs at the end
                if (this.textDialogue.text !== this.messageToShow) {
                    this.textDialogue.text = this.messageToShow;
                    if (this.eventTyping !== undefined) this.eventTyping.remove(false);
                } else {
                    if (this.numberDialog === 8) {
                        this.hideDialogue();
                        return
                    }
                    this.nextDialog();
                }
            }

        })

        this.textTitle = this.add.text(400, 40, 'Guy Blue', {
            fontFamily: 'ZCOOL QingKe HuangYou'
        }).setFontSize(35).setOrigin(0.5, 0.5).setDepth(51);



        this.dialogInstructionText = this.add.text(480, 160, "Press space bar or tap to continue", {
            fontFamily: 'ZCOOL QingKe HuangYou'
        }).setFontSize(20).setOrigin(0.5, 0.5).setDepth(51);

        this.buttonInteract = this.add.image(720, 420, "interactButton").setOrigin(0.5).setScale(1).setInteractive();

        this.buttonInteractText = this.add.text(this.buttonInteract.x, this.buttonInteract.y, "talk to", {
            fontFamily: 'ZCOOL QingKe HuangYou'
        }).setFontSize(20).setOrigin(0.5, 0.5);


        this.showingDialogue = false;
        this.textTitle.visible = false;
        this.textDialogue.visible = false;
        this.dialogInstructionText.visible = false;
        this.dialogueWindow.visible = false;

        // GeneralInstructions
        this.instructionText = this.add.text(444, 450, "WASD or arrows to move \n Spacebar or Enter to interact", {
            fontFamily: 'ZCOOL QingKe HuangYou',
            fontSize: 30,
            align: 'center'
        }).setOrigin(0.5);

        this.instructionText.visible = false;


        this.flashingTextTween = this.tweens.add({
            targets: this.instructionText,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 500,
            ease: 'Sine.easeInOut',
            loop: -1,
        }).stop();


        createSocialMediaMenu(this, "Bar%20Matchless%20still%20exists%20in%20%23Bluepoint%20");

        createMenu(this, ["Restart ", "Menu "/*, "Loser Board "*/], [
            () => {
                this.game.sound.stopAll();
                this.scene.stop("level_2_2");
                this.scene.stop("level_2");
                this.scene.stop("level_2_3");
                this.scene.stop();
                this.scene.start("level_2");
            },
            () => {
                this.game.sound.stopAll();
                this.scene.stop("level_2_2");
                this.scene.stop("level_2");
                this.scene.stop("level_2_3");
                this.scene.start("map");
            },
            // () => {
            //     this.game.sound.stopAll();
            //     this.scene.stop("level_2_2");
            //     this.scene.stop("level_2");
            //     this.scene.stop("level_2_3");
            //     this.scene.start("loserBoard", {type: 3, name: null, score: 0, colectionName: "scores_lvl_2", level: 2});
            // }
        ], 250, 40, 750, 40);

        this.input.keyboard.on('keydown_ENTER', (event) => {
            if (!this.showingDialogue) this.interact();
            else if (!controls.buttonsLocked) {
                if (this.textDialogue.text !== this.messageToShow) {
                    this.textDialogue.text = this.messageToShow;
                    if (this.eventTyping !== undefined) this.eventTyping.remove(false);
                } else this.hideDialogue();
            }
        });

        this.input.keyboard.on('keydown_SPACE', (event) => {
            if (!this.showingDialogue) this.interact();
            else if (!controls.buttonsLocked) {
                if (this.textDialogue.text !== this.messageToShow) {
                    this.textDialogue.text = this.messageToShow;
                    if (this.eventTyping !== undefined) this.eventTyping.remove(false);
                } else this.hideDialogue();
            }

            if (this.numberDialog !== 0) { //dialogs at the end
                if (this.textDialogue.text !== this.messageToShow) {

                    this.textDialogue.text = this.messageToShow;
                    if (this.eventTyping !== undefined) this.eventTyping.remove(false);
                } else {
                    if (this.numberDialog === 8) {
                        this.hideDialogue();
                        return
                    }
                    this.nextDialog();
                }
            }

        });


        this.buttonInteract.on('pointerdown', () => {
            if (!this.showingDialogue) this.interact();
            else if (!controls.buttonsLocked) {
                if (this.textDialogue.text !== this.messageToShow) {
                    this.textDialogue.text = this.messageToShow;
                    if (this.eventTyping !== undefined) this.eventTyping.remove(false);
                } else this.hideDialogue();
            }
        });


        if (mobileAndTabletCheck()) { //--------------------MOBILE
            // ------------------------- Joystick
            this.joyStickPressed = false; // flag to see if the joystic is being pressed

            this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
                x: 100,
                y: 400,
                radius: 80,
                base: this.add.circle(0, 0, 80, 0xCF000000).setAlpha(0.5).setDepth(20).setVisible(false),
                thumb: this.add.circle(0, 0, 40, 0xcccccc).setDepth(20).setVisible(false),
            });

            this.buttonInteract.setScale(1.5, 1.5);
            this.buttonInteractText.setFontSize(30).setOrigin(0.5).setPosition(this.buttonInteract.x, this.buttonInteract.y);


            this.instructionText.text = "use the virtual joystick to move \n Press the button to interact";
            this.dialogInstructionText.text = "tap to continue";

            let centerX = 130;
            let centerY = 350;
            let offset = 80

            this.arrowUp = this.add.image(centerX, centerY - offset, "arrows_mobile").setDepth(50).setTexture("arrows_mobile", 0).setInteractive().setVisible(false).setScale(1.3);
            this.arrowDown = this.add.image(centerX, centerY + offset, "arrows_mobile").setDepth(50).setTexture("arrows_mobile", 1).setInteractive().setVisible(false).setScale(1.3);
            this.arrowRight = this.add.image(centerX + offset, centerY, "arrows_mobile").setDepth(50).setTexture("arrows_mobile", 2).setInteractive().setVisible(false).setScale(1.3);
            this.arrowLeft = this.add.image(centerX - offset, centerY, "arrows_mobile").setDepth(50).setTexture("arrows_mobile", 3).setInteractive().setVisible(false).setScale(1.3);


            this.arrowUp.on('pointerup', () => {
                this.directionPressed(up);
                this.arrowUp.setTint(0xffffff);
            });
            this.arrowDown.on('pointerup', () => {
                this.directionPressed(down);
                this.arrowDown.setTint(0xffffff);
            });
            this.arrowRight.on('pointerup', () => {
                this.directionPressed(right);
                this.arrowRight.setTint(0xffffff);
            });
            this.arrowLeft.on('pointerup', () => {
                this.directionPressed(left);
                this.arrowLeft.setTint(0xffffff);
            });


            this.arrowUp.on('pointerdown', () => {
                this.arrowUp.setTint(0x0000ff);
            });
            this.arrowDown.on('pointerdown', () => {
                this.arrowDown.setTint(0x0000ff);
            });
            this.arrowRight.on('pointerdown', () => {
                this.arrowRight.setTint(0x0000ff);
            });
            this.arrowLeft.on('pointerdown', () => {
                this.arrowLeft.setTint(0x0000ff);
            });

            this.arrowUp.on('pointerout', () => {
                this.arrowUp.setTint(0xffffff);
            });
            this.arrowDown.on('pointerout', () => {
                this.arrowDown.setTint(0xffffff);
            });
            this.arrowRight.on('pointerout', () => {
                this.arrowRight.setTint(0xffffff);
            });
            this.arrowLeft.on('pointerout', () => {
                this.arrowLeft.setTint(0xffffff);
            });



        } else { //-------------------DESKTOP
            this.buttonInteract.on('pointerover', () => {
                this.buttonInteract.setScale(1, 1.1);
            });
            this.buttonInteract.on('pointerout', () => {
                this.buttonInteract.setScale(1, 1);
            });
        }

        this.beerPoints = [];


        // this.beerPoints.forEach(element => {     //uncomment to show circles over the bottles
        //     this.add.circle(element[0]*2,element[1]*2,20,0xff0000);
        // });


        // ------------------------- Time events
        this.time.delayedCall(50, () => {
            this.showDialogue("I hope Matchless still has booze.", false, undefined, true, 4000);
            this.dialogInstructionText.setVisible(false);

        });


        this.time.delayedCall(10000, () => {

            if (this.joyStick != undefined) { //show the joystick
                this.joyStick.base.setVisible(true);
                this.joyStick.thumb.setVisible(true);
            }


            this.showDialogue("Let’s see if there’s beer left in any of these cans.", undefined, undefined, true, 4000);
            this.dialogInstructionText.setVisible(false);
            this.beerPoints = [
                [59, 145, "Careful, these cans are rusty."],
                [50, 190, "This one is full...of dust."],
                [159, 173, "Gross, nothing but dead bugs."],
                [260, 189, "Bupkis."],
                [370, 178, "Both empty."],
                [320, 100, "Not a drop in any of these."],
                [292, 130, "Whatever that is, it’s not beer."],
                [259, 96, "Bingo! Wait, nope, just dust."],
                [208, 105, "Nope, nothing in these."],
                [171, 96, "Crap, more empties."]
            ]
        });

        this.time.delayedCall(12000, () => {
            this.instructionText.visible = true;
            controls.buttonsLocked = false;
            controls.joystickLocked = false;

        })

        this.time.delayedCall(29000, () => {
            this.instructionText.visible = false;
            controls.buttonsLocked = true;
            controls.joystickLocked = true;
            this.showDialogue("Oh it looks like the tap is still hooked up. Let’s check it out.", false);
            this.beerPoints = [];

            if (this.joyStick !== undefined) { //show the joystick
                this.joyStick.base.setVisible(false);
                this.joyStick.thumb.setVisible(false);
            }
        })



        //--------------------------------------Second part of the level
        this.time.delayedCall(34000, () => {
            this.arrows = this.showSetArrows(this.score);
            this.instructionText.y = 350;
            this.instructionText.text = "Repeat the sequence with the \n arrow keys to refill Guy Blue’s beer."
            this.instructionText.setVisible(true);

            if (this.arrowUp !== undefined) {
                this.arrowUp.setVisible(true);
                this.arrowDown.setVisible(true);
                this.arrowRight.setVisible(true);
                this.arrowLeft.setVisible(true);
            }

            this.tweens.add({
                targets: this.instructionText,
                alpha: {
                    from: 0.2,
                    to: 1
                },
                duration: 500,
                ease: 'Sine.easeInOut',
                loop: 6,
                yoyo: true
            })



            this.arrows.forEach(el => {
                this.tweens.add({
                    targets: el,
                    alpha: {
                        from: 0,
                        to: 1
                    },
                    duration: 3000,
                    ease: 'Sine.easeInOut',
                    loop: 0,
                })
            })
        })

        this.time.delayedCall(39000, () => { //start the game         

            this.instructionText.setVisible(false);

            this.timebar.setVisible(true);
            this.timebarMargin.setVisible(true);

            this.scoreText.setVisible(true);
            this.scoreTitleText.setVisible(true);
            this.scoreBeer.setVisible(true);


            this.isPlaying = true;
        })


        this.isPlaying = false;
        //score
        this.score = 0;

        this.scoreText = this.add.text(750, 55, "x " + this.score, {
            fontFamily: 'ZCOOL QingKe HuangYou'
        }).setFontSize(30).setShadow(3, 3, 'rgba(0,0,0,0.5)', 4).setVisible(false);

        this.scoreTitleText = this.add.text(700, 10, "SCORE", {
            fontFamily: 'ZCOOL QingKe HuangYou'
        }).setFontSize(35).setShadow(3, 3, 'rgba(0,0,0,0.5)', 4).setVisible(false);

        this.scoreBeer = this.add.image(725, 70, 'level2_beer').setScale(1.4).setVisible(false);

        //arrows
        this.timeForAnswer = 0;
        this.initialTime = 0;
        this.currentArrow = 0;


        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.input.keyboard.clearCaptures();


        //clear previous events:
        this.downKey.off('down');
        this.upKey.off('down');
        this.leftKey.off('down');
        this.rightKey.off('down');
        this.SKey.off('down');
        this.WKey.off('down');
        this.AKey.off('down');
        this.DKey.off('down');


        //arrow keys
        this.downKey.on('down', (event) => {
            this.directionPressed(down);
        });

        this.upKey.on('down', (event) => {
            this.directionPressed(up);
        });

        this.leftKey.on('down', (event) => {
            this.directionPressed(left);
        });

        this.rightKey.on('down', (event) => {
            this.directionPressed(right);
        });
        //ASDW keys
        this.SKey.on('down', (event) => {
            this.directionPressed(down);
        });

        this.WKey.on('down', (event) => {
            this.directionPressed(up);
        });

        this.AKey.on('down', (event) => {
            this.directionPressed(left);
        });

        this.DKey.on('down', (event) => {
            this.directionPressed(right);
        });


        // time bar
        this.timebar = this.add.rectangle(300, 490, 300, 20).setFillStyle(0x0000ff).setOrigin(0, 0).setVisible(false);
        this.timebarMargin = this.add.rectangle(300, 490, 300, 20).setStrokeStyle(4, 0xffffff).setOrigin(0, 0).setVisible(false);




        //stop the game
        this.time.delayedCall(107000, () => {

            if (this.delayedCallGame1 !== undefined)
                this.delayedCallGame1.destroy();
            if (this.delayedCallGame2 !== undefined)
                this.delayedCallGame2.destroy();
            if (this.delayedCallGame3 !== undefined)
                this.delayedCallGame3.destroy();
            if (this.delayedCallGame4 !== undefined)
                this.delayedCallGame4.destroy();
            if (this.delayedCallGame5 !== undefined)
                this.delayedCallGame5.destroy();


            this.isPlaying = false;
            this.arrows.forEach(el => {
                el.destroy();
            })
            this.arrows = [];
            this.timebar.setVisible(false);
            this.timebarMargin.setVisible(false);

            if (this.arrowUp !== undefined) {
                this.arrowUp.setVisible(false);
                this.arrowDown.setVisible(false);
                this.arrowRight.setVisible(false);
                this.arrowLeft.setVisible(false);
            }

            this.level2.endingAnimation();
        })

        this.finalDialogs_A = [
            ["Huh, I must still be dreaming. This guy can’t be real. ", "Guy Blue", 4000],
            ["Hey bud, looks like you took a little doze there. ", "Red Guy", 4000],
            ["What the hell is going on?", "Guy Blue", 3000],
            ["Well I think there’s a show over at Silent Barn a little later.", "Red Guy", 4000],
            ["No, I mean what the fuck happened? Look around, this place is a dump. ", "Guy Blue", 4000],
            ["Yeah it’s a bit dive-y. I like that though. That’s getting harder to find in this neighborhood. ", "Red Guy", 5000],
            ["You’re out of your mind. No, wait, I’m out of MY mind. This is all nuts. Ah, fuck it, want a beer? ", "Guy Blue", 5000],
            ["Please, thanks. ", "Red Guy", 3000],
            ["   ", "   ", 3000],
            ["So you said there’s a show tonight? At Silent Barn? ", "Guy Blue", 4000],
            ["Yeah. I’m supposed to meet my friends there later. ", "Red Guy", 4000],
            ["And Silent Barn is in the same state as this place? ", "Guy Blue", 4000],
            ["Yeah more or less. Are you new to Bluepoint? ", "Red Guy", 4000],
            ["Feels like it. And your friends, I’m guessing they’re all like you? ", "Guy Blue", 4000],
            ["We all have similar tastes and interests if that’s what you mean. ", "Red Guy", 4000],
            ["Right…so you’re all nuts. ", "Guy Blue", 3000],
            ["Haha we’ve been called worse. ", "Red Guy", 3000],
        ]

        this.finalDialogs_B = [
            [" Wuuh, I must still be dream—hicc*—ing. Thiiis guy can’t be real. ", "Guy Blue", 4000],
            ["Hey bud, looks like you took a little doze there. ", "Red Guy", 4000],
            ["What the hEll is g-g-going on? ", "Guy Blue", 3000],
            ["Well I think there’s a show over at Silent Barn a little later.", "Red Guy", 4000],
            ["N-No, I mean what the fuck—hicc*—happened? Look around, this place is a dump.  ", "Guy Blue", 5000],
            ["Yeah it’s a bit dive-y. I like that though. That’s getting harder to find in this neighborhood. ", "Red Guy", 5000],
            ["Youu’re out of your d-d-amn mind. No—hicc*— I must be out of my mind. This—hicc*—is all  nuts. Fuck it. Want a beer? ", "Guy Blue", 5000],
            ["Please, thanks. ", "Red Guy", 3000],
            ["   ", "   ", 3000],
            ["Sooo you said there’s a show—hicc*— tonight? At—hicc*— Silent Barn? ", "Guy Blue", 4000],
            ["Yeah. I’m supposed to meet my friends there later. ", "Red Guy", 4000],
            ["And Silent Barn is in the same state—hicc*— as th-this place? ", "Guy Blue", 4000],
            ["Yeah more or less. Are you new to Bluepoint? ", "Red Guy", 4000],
            ["S-sure feels like it. And your friends, I’m guessing they’re all—hicc*— like you? ", "Guy Blue", 5000],
            ["We all have similar tastes and interests if that’s what you mean. ", "Red Guy", 4000],
            ["Hicc*—…y-yer all nuts. ", "Guy Blue", 3000],
            ["Haha we’ve been called worse. ", "Red Guy", 3000],
        ]
        this.numberDialog = 0;


        this.time.delayedCall(132000, () => {
            this.delay = 30;
            this.nextDialog();
        })


        //------------------form
        graphics = this.add.graphics();
        graphics.fillStyle(0x1f317d, 0.6);
        this.rectangleDialog = graphics.fillRect(200, 400, 500, 110).setVisible(false);

        this.buttonSubmitRect = this.add.rectangle(340, 485, 200, 30).setVisible(false).setFillStyle(0x1f317d, 0.6).setStrokeStyle(1, 0x616161, 1.0).setInteractive();
        this.buttonSkipRect = this.add.rectangle(560, 485, 200, 30).setVisible(false).setFillStyle(0x1f317d, 0.6).setStrokeStyle(1, 0x616161, 1.0).setInteractive();

        graphics.fillStyle(0x334fcb, 0.9);


        this.buttonSubmit = this.add.text(this.buttonSubmitRect.x, this.buttonSubmitRect.y, "Submit", {
            fontFamily: 'euroStyle',
            fontSize: 25
        }).setVisible(false).setOrigin(0.5).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

        this.buttonSkip = this.add.text(this.buttonSkipRect.x, this.buttonSkipRect.y, "Skip", {
            fontFamily: 'euroStyle',
            fontSize: 25
        }).setVisible(false).setOrigin(0.5).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

        //--------------Hover effect for the buttons
        this.buttonSubmitRect.on('pointerover', () => {
            this.buttonSubmitRect.setFillStyle(0x334fcb);
        });
        this.buttonSubmitRect.on('pointerout', () => {
            this.buttonSubmitRect.setFillStyle(0x1f317d);
        });


        this.buttonSkipRect.on('pointerover', () => {
            this.buttonSkipRect.setFillStyle(0x334fcb);
        });
        this.buttonSkipRect.on('pointerout', () => {
            this.buttonSkipRect.setFillStyle(0x1f317d);
        });


        this.validationForm = this.add.text(430, 510, '', {
            fontFamily: 'euroStyle',
            fontSize: 15,
            color: '#f20a0a'
        }).setOrigin(0.5, 0.5)

        // IMPORTANT! : every font after this gets broken, so it should be at the end
        this.form = this.add.dom(450, 430).createFromCache('form').setVisible(false);

        this.buttonSubmitRect.on('pointerdown', () => {

            // validate email and name:
            if (this.form.getChildByID('formName').value.length < 2) {
                this.validationForm.text = "enter a valid name"
                return;
            }
            if (!ValidateEmail(this.form.getChildByID('formEmail').value)) {
                this.validationForm.text = "enter a valid email"
                return;
            }

            this.validationForm.text = ""
            player.avatar.setVisible(false);
            var inputName = this.form.getChildByID('formName').value;
            var inputEmail = this.form.getChildByID('formEmail').value;

            this.form.visible = false;
            this.rectangleDialog.visible = false;

            this.buttonSkip.visible = false;
            this.buttonSkipRect.visible = false;
            this.buttonSubmit.visible = false;
            this.buttonSubmitRect.visible = false;

            writeData(inputName, this.score, inputEmail, "scores_lvl_2");
            this.scene.stop("level_2_3");
            this.scene.start("loserBoard", {
                type: 1,
                score: this.score,
                name: inputName,
                colectionName: "scores_lvl_2",
                topMessage: [" drank ", " beers: Matchless still closed. "],
                level: 2
            })
        })

        this.buttonSkipRect.on('pointerdown', () => {

            player.avatar.setVisible(false);
            this.form.visible = false;
            this.rectangleDialog.visible = false;

            this.buttonSkip.visible = false;
            this.buttonSkipRect.visible = false;
            this.buttonSubmit.visible = false;
            this.buttonSubmitRect.visible = false;

            this.scene.stop("level_2_3");
            this.scene.start("loserBoard", {
                type: 2,
                score: this.score,
                name: undefined,
                colectionName: "scores_lvl_2",
                level: 2
            })
        })




    },

    update: function (t, delta) {

        this.playTime += delta;

        if (this.isPlaying) {
            if (this.timeForAnswer > 0) {
                this.timeForAnswer -= delta;
                this.timebar.width = Math.ceil(Math.sqrt(this.timeForAnswer / this.initialTime) * 300);
            } else { // time is over
                this.arrows.forEach(element => {
                    element.setTint(0xff0000);
                });

                this.isPlaying = false;
                this.level2.animateGuyBlue("GB_spills_beer");
                this.delayedCallGame5 = this.time.delayedCall(1500, () => {
                    this.arrows.forEach(element => {
                        element.destroy();
                    });
                    this.arrows = this.showSetArrows(this.score);
                    this.currentArrow = 0;
                    this.timebar.width = 300;
                    this.isPlaying = true;
                });
            }
        }

        if (!this.isplaying) {
            let nearest = this.minDistance();
            if (nearest[0] < radiusInteraction) {
                this.buttonInteract.visible = true;
                this.buttonInteractText.visible = true;

                this.buttonInteractText.text = "check bottle";

            } else {

                this.buttonInteract.visible = false;
                this.buttonInteractText.visible = false;
            }
        }


        if (this.joyStick != null) this.dumpJoyStickState();



    },

    dumpJoyStickState: function () {


        // if (this.isPlaying) {
        //     if (Math.abs(this.joyStick.forceX) > 40 || Math.abs(this.joyStick.forceY) > 40) {
        //         if (!this.joyStickPressed) {
        //             if (this.joyStick.forceX > 40) this.directionPressed(right);
        //             else if (this.joyStick.forceX < -40) this.directionPressed(left);
        //             else if (this.joyStick.forceY < -40) this.directionPressed(up);
        //             else if (this.joyStick.forceY > 40) this.directionPressed(down);
        //         }
        //         this.joyStickPressed = true;
        //     } else {
        //         this.joyStickPressed = false
        //     }
        // } else if (!controls.joystickLocked)
        player.moveJoystic(this.joyStick.forceX, this.joyStick.forceY)
    },

    hideDialogue(unlockControls) { // hide the current dialogue or goes to the next one in a sequential dialog

        if (unlockControls === undefined) unlockControls = true;

        this.showingDialogue = false;
        this.textTitle.visible = false;
        this.textDialogue.visible = false;
        this.dialogInstructionText.visible = false;
        this.dialogueWindow.visible = false;
        if (unlockControls) controls.joystickLocked = false;


    },

    minDistance() { // compute the min distance between the player and the NPCS from the npc array
        return this.beerPoints.reduce((acc, val) => {
            if (distance(player.avatar.x, player.avatar.y, val[0], val[1]) < acc[0]) {
                acc[0] = distance(player.avatar.x, player.avatar.y, val[0], val[1]);
                acc[1] = val[2];
            }
            return acc;
        }, [999])
    },

    showDialogue(message, unlockControls, title, closeAtEnd, timeToClose) { // shows the dialogue window with a specific message

        if (unlockControls === undefined) unlockControls = true;
        if (title === undefined) title = "Guy Blue"
        if (closeAtEnd === undefined) closeAtEnd = true;
        if (timeToClose === undefined) timeToClose = 2000;

        if (message != null) {
            this.typingEffect(message, unlockControls, closeAtEnd, timeToClose);
            this.textTitle.text = title
        }
        this.showingDialogue = true;
        this.textTitle.visible = true;
        this.textDialogue.visible = true;
        this.dialogInstructionText.visible = true;
        this.dialogueWindow.visible = true;
        player.returnToIdle();
        player.direction = null;
        player.moving = false;
        controls.joystickLocked = true;
    },


    interact() { //when button is pressed for interact, show the dialog

        let nearest = this.minDistance();

        if (nearest[0] < radiusInteraction) {
            this.showDialogue(nearest[1]);

        }

    },


    showSetArrows(score) {

        ArrowsScore = [3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8];
        if (score > 15) N = 8;
        else N = ArrowsScore[score];

        //set the timer
        this.initialTime = (N * 1 - 0.28 * score) * 1000;
        this.timeForAnswer = this.initialTime;


        let namesArrows = ["level2_down", "level2_up", "level2_left", "level2_right"];
        let symbolArrows = [down, up, left, right];

        let initialX = 420 - (Math.floor((N - 2) / 2) * 71);


        let arrows = [];
        for (var i = 0; i < N; i++) {
            let randomInt = getRandomInt(4)
            let arrow = this.add.image(initialX + i * 70, 440, namesArrows[randomInt]).setOrigin(0.5).setDepth(20).setTint(0x0000ff);
            arrow.direction = symbolArrows[randomInt];
            arrows.push(arrow);
        }
        return arrows;
    },

    directionPressed(key) {
        if (!this.isPlaying) return
        if (this.arrows[this.currentArrow].direction == key) { // correct key in the sequence
            this.arrows[this.currentArrow].setTint(0x00ff00);

            this.tweens.add({
                targets: this.arrows[this.currentArrow],
                scale: {
                    from: 1,
                    to: 1.4
                },
                duration: 250,
                ease: 'Sine.easeInOut',
                loop: 0,
                yoyo: true
            });

            this.currentArrow++;

        } else { //wrong key 
            this.arrows[this.currentArrow].setTint(0xff0000);
            this.isPlaying = false;
            this.delayedCallGame1 = this.time.delayedCall(2800, () => {
                this.arrows.forEach(element => {
                    element.destroy();
                });

                this.arrows = this.showSetArrows(this.score);
                this.currentArrow = 0;
                this.timebar.width = 300;
                this.isPlaying = true;
            });
            this.level2.fillBeer();
            this.delayedCallGame2 = this.time.delayedCall(800, () => {
                this.level2.animateGuyBlue("GB_spills_beer");
            })
        }

        if (this.currentArrow >= this.arrows.length) { // completed all the sequence

            this.isPlaying = false;
            this.level2.fillBeer();
            this.delayedCallGame3 = this.time.delayedCall(800, () => {
                this.level2.animateGuyBlue("GB_drinks_beer");
            })
            this.delayedCallGame4 = this.time.delayedCall(2800, () => {
                this.arrows.forEach(element => {
                    element.destroy();
                });

                this.score++;
                this.scoreText.text = ("x " + this.score)

                this.arrows = this.showSetArrows(this.score);
                this.currentArrow = 0;
                this.timebar.width = 300;
                this.isPlaying = true;
            });
        }
    },
    guyBlueTalks() {
        this.level2.animateGuyBlue("GB_Talking");
        this.level2.redguy.anims.stop();
        if (this.numberDialog < 8) this.level2.redguy.setTexture("RG neutral_nb");
        else this.level2.redguy.setTexture("RG neutral_wb");
    },
    redguyTalks_no_beer() {
        this.level2.blueguy.anims.stop();
        this.level2.blueguy.setTexture("GB neutral");
        this.level2.animateRedguy("RG_talking_no_beer");
    },
    redguyTalks_beer() {
        this.level2.blueguy.anims.stop();
        this.level2.blueguy.setTexture("GB neutral");
        this.level2.animateRedguy("RG_talking_with_beer");
    },

    nextDialog() {
        if (this.nextCall !== undefined) this.nextCall.remove(false);

        if (this.numberDialog >= this.finalDialogs_A.length) { //finish the dialogs
            this.hideDialogue();
            this.level2.redguy.anims.stop();
            this.level2.animateGuyBlue("GB_Falling")
            this.level2.redguy.setTexture("RG neutral_wb");

            this.time.delayedCall(1000, () => {
                this.level2.animateRedguy("RG_checks_on_GB_after_he_falls");
            })

            this.time.delayedCall(2000, () => {
                this.level2.cameras.main.fadeOut(1000);
            })
            this.time.delayedCall(3000, () => {
                //this.scene.stop("level_2_2");
                this.level2.scene.start("level_2_3");
            })
            this.showFormAtEnd()


            return;
        }


        if (this.numberDialog == 8) { //pass the beer
            this.passBeer();
            this.hideDialogue();
            this.nextCall = this.time.delayedCall(4000, () => {
                this.numberDialog++;
                this.nextDialog();
            })
            return;
        }

        if (this.score < 5) {
            this.showDialogue(this.finalDialogs_A[this.numberDialog][0], false, this.finalDialogs_A[this.numberDialog][1], false)

            this.nextCall = this.time.delayedCall(this.finalDialogs_A[this.numberDialog][2], () => {
                this.nextDialog();
            })

        } else {
            this.showDialogue(this.finalDialogs_B[this.numberDialog][0], false, this.finalDialogs_B[this.numberDialog][1], false)

            this.nextCall = this.time.delayedCall(this.finalDialogs_B[this.numberDialog][2], () => {
                this.nextDialog();
            })
        }

        if (this.finalDialogs_A[this.numberDialog][1] === "Guy Blue") {
            this.guyBlueTalks();
            this.textTitle.setFill('#0000ff');
        } else {
            this.textTitle.setFill('#ff0000');
            if (this.numberDialog > 8) this.redguyTalks_beer();
            else this.redguyTalks_no_beer();
        }
        this.numberDialog++;

    },

    passBeer() {
        this.level2.blueguy.anims.stop();
        this.level2.blueguy.setTexture("GB neutral");
        this.level2.redguy.anims.stop();
        this.level2.redguy.setTexture("RG neutral_nb");

        this.level2.fillBeer();
        this.time.delayedCall(1200, () => {
            this.level2.animateGuyBlue("GB_drinks_beer");

            this.level2.fillBeer();
            this.time.delayedCall(1200, () => {
                this.level2.redguy.setTexture("RG talking with beer_1");
                this.score++;
                this.scoreText.text = ("x " + this.score);
            })
        })
    },

    showFormAtEnd() {
        this.time.delayedCall(5000, () => {

            this.textDialogue.y = 430;
            this.textDialogue.x = 240;
            this.textDialogue.setShadow(3, 3, 'rgba(0,0,0,0.9)', 4);
            this.rectangleDialog.setVisible(true);
            this.textDialogue.setVisible(true);
            this.typingEffect("Good, you’re still here. Remind me of your name again?", false, true, 2000);
        })


        this.time.delayedCall(9000, () => {

            this.textDialogue.visible = false;
            this.form.visible = true;
            this.buttonSkipRect.visible = true;
            this.buttonSubmitRect.visible = true;
            this.buttonSubmit.visible = true;
            this.buttonSkip.visible = true;
            outroMusic.play();
            outroMusic.setLoop(true);
            this.tweens.add({
                targets: outroMusic,
                volume: {
                    from: 0,
                    to: 0.8
                },
                duration: 10000,
                ease: 'Sine.easeInOut',
                loop: 0,
            });
        })
    }
})