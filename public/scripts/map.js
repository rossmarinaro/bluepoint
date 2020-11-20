var map = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function map() {

        Phaser.Scene.call(this, {
            key: 'map',
            active: false
        });
    },

    preload: function () {},

    create: function () {

        this.selectedGlow = null;
        this.selectedLevel = -1;

        mapMusic = this.sound.add('map_music', {
            delay: 0
        }).setVolume(0.8).setLoop(true);

        selectMusic = this.sound.add('map_select', {
            delay: 0
        });

        mapMusic.play();

        // ------------------------------------------------------------------------texts
        this.levelTitle = this.add.text(650, 475, "Tap or click an icon to explore", {
            fontFamily: 'euroStyle_condensed',
            fontSize: 20
        }).setDepth(2).setOrigin(0.5);

        this.levelNumber = this.add.text(370, 475, "", {
            fontFamily: 'euroStyle_condensed',
            fontSize: 20
        }).setDepth(2).setOrigin(0.5).setVisible(false);

        this.levelSubtitle = this.add.text(650, 485, "", {
            fontFamily: 'euroStyle_condensed',
            fontSize: 15
        }).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5).setDepth(2).setOrigin(0.5).setVisible(false);

        this.separator = this.add.text(430, 475, "|", {
            fontSize: 40
        }).setDepth(2).setOrigin(0.5).setVisible(false);

        this.base = this.add.image(0, 0, "map_base").setOrigin(0).setScale(2);


        //----road (level 3)
        this.map_golden_glow = this.add.image(258, 0, "map_golden_road_glow").setOrigin(0).setScale(2).setInteractive().setVisible(false);
        //this.map_golden_road = this.add.image(258, 0, "map_golden_road").setOrigin(0).setScale(2).setInteractive().setVisible(false);
        this.map_golden_road_grey = this.add.image(258, 0, "map_golden_road_grey").setOrigin(0).setScale(2).setInteractive();

        this.map_golden_road_grey.on('pointerdown', () => {
            this.selectIcon("No Vision | Manhattan Ave ", 3, false, this.map_golden_glow);
        })


        //---building 204   (level 6)
        this.map_204_glow = this.add.image(190, 160, "map_204_glow").setOrigin(0).setScale(2).setInteractive().setVisible(false);
        this.map_204_grey = this.add.image(190, 160, "map_204_grey").setOrigin(0).setScale(2).setInteractive();
        //this.map_204_color = this.add.image(190, 160, "map_204_color").setOrigin(0).setScale(2).setInteractive().setVisible(false);

        this.map_204_grey.on('pointerdown', () => {

            this.selectIcon("Sermon | Death By Audio ", 6, false, this.map_204_glow);

        })


        //---building 203  (level 2)
        this.map_203_glow = this.add.image(250, 85, "map_203_glow").setOrigin(0).setScale(2).setVisible(false);
        //this.map_203_grey = this.add.image(250, 85, "map_203_grey").setOrigin(0).setScale(2).setInteractive();
        this.map_203_color = this.add.image(250, 85, "map_203_color").setOrigin(0).setScale(2).setInteractive();

        this.map_203_color.on('pointerdown', () => {



            if (this.selectedLevel === 2) {
                this.game.sound.stopAll();
                this.scene.start("intro_2");
            } else
                this.selectIcon("New Pallet Theme | Matchless ", 2, true, this.map_203_glow);

        })

        //---building 202  (level 4)
        this.map_202_glow = this.add.image(480, 305, "map_202_glow").setOrigin(0).setScale(2).setInteractive().setVisible(false);
        this.map_202_grey = this.add.image(480, 305, "map_202_grey").setOrigin(0).setScale(2).setInteractive();
        //this.map_202_color = this.add.image(480, 305, "map_202_color").setOrigin(0).setScale(2).setInteractive().setVisible(false);

        this.map_202_grey.on('pointerdown', () => {

            this.selectIcon("Let’s Get Out of Here | Silent Barn ", 4, false, this.map_202_glow);

        })

        //---building 201  (level 1)
        this.map_201_glow = this.add.image(430, 170, "map_201_glow").setOrigin(0).setScale(2).setInteractive().setVisible(false);
        //this.map_201_grey = this.add.image(430, 170, "map_201_grey").setOrigin(0).setScale(2).setInteractive().setVisible(false);
        this.map_201_color = this.add.image(430, 170, "map_201_color").setOrigin(0).setScale(2).setInteractive();


        this.map_201_color.on('pointerdown', () => {

            if (this.selectedLevel === 1) {
                this.game.sound.stopAll();
                this.scene.start("intro_1");
            } else
                this.selectIcon("Gutted | Shea Stadium ", 1, true, this.map_201_glow);
        })


        //---bridge (Lvl 5)
        this.map_bridge_glow = this.add.image(540, 90, "map_bridge_glow").setOrigin(0).setScale(2).setInteractive().setVisible(false);
        this.map_bridge_color = this.add.image(540, 90, "map_bridge_color").setOrigin(0).setScale(2).setInteractive();
        //this.map_bridge_color = this.add.image(540, 90, "map_bridge_grey").setOrigin(0).setScale(2).setInteractive().setVisible(false);

        this.map_bridge_color.on('pointerdown', () => {

            this.selectIcon("Idle | Old Kosciuszko Bridge ", 5, false, this.map_bridge_glow);
        })




        this.trees = this.add.image(0, 0, "map_trees").setOrigin(0).setScale(2);


        this.banner = this.add.rectangle(444, 480, 888, 100).setFillStyle(0x000000).setInteractive();
        this.banner.on('pointerdown', () => {
            if (this.selectedLevel === 1) {
                this.game.sound.stopAll();
                this.scene.start("intro_1");
            }

            if (this.selectedLevel === 2) {
                this.game.sound.stopAll();
                this.scene.start("intro_2");
            }

        })


        map_logo = this.add.image(20, 450, "map_logo").setOrigin(0).setScale(0.8);


        createSocialMediaMenu(this,"Explore%20%23Bluepoint-"); // create the social media menu for facebook, twiter and copy link

        
        //-------------hamburger icon
        this.hamburguer = this.add.image(830, 40, "hambugerIcon").setScale(0.4).setInteractive();

        this.hamburguer.on('pointerover', () => {
            this.hamburguer.setScale(0.45);
        });
        this.hamburguer.on('pointerout', () => {
            this.hamburguer.setScale(0.4);
        });

        this.hamburguer.on('pointerdown', () => {
            if (!this.buttonLvl1[0].visible) { // show the icons


                this.buttonLvl1[0].visible = true;
                this.buttonLvl1[0].tweenIn.play();
                this.buttonLvl2[0].visible = true;
                this.buttonLvl2[0].tweenIn.play();
                this.buttonLvl3[0].visible = true;
                this.buttonLvl3[0].tweenIn.play();
                this.buttonLvl4[0].visible = true;
                this.buttonLvl4[0].tweenIn.play();
                this.buttonLvl5[0].visible = true;
                this.buttonLvl5[0].tweenIn.play();
                this.buttonLvl6[0].visible = true;
                this.buttonLvl6[0].tweenIn.play();
                this.time.delayedCall(200, () => {
                    this.buttonLvl1[1].setVisible(true);
                    this.buttonLvl2[1].setVisible(true);
                    this.buttonLvl3[1].setVisible(true);
                    this.buttonLvl4[1].setVisible(true);
                    this.buttonLvl5[1].setVisible(true);
                    this.buttonLvl6[1].setVisible(true);

                });

            } else { //hide the icons
                this.buttonLvl1[1].visible = false;
                this.buttonLvl2[1].visible = false;
                this.buttonLvl3[1].visible = false;
                this.buttonLvl4[1].visible = false;
                this.buttonLvl5[1].visible = false;
                this.buttonLvl6[1].visible = false;


                this.time.delayedCall(200, () => {
                    this.buttonLvl1[0].setVisible(false);
                    this.buttonLvl2[0].setVisible(false);
                    this.buttonLvl3[0].setVisible(false);
                    this.buttonLvl4[0].setVisible(false);
                    this.buttonLvl5[0].setVisible(false);
                    this.buttonLvl6[0].setVisible(false);


                });
                this.buttonLvl1[0].tweenOut.play();
                this.buttonLvl2[0].tweenOut.play();
                this.buttonLvl3[0].tweenOut.play();
                this.buttonLvl4[0].tweenOut.play();
                this.buttonLvl5[0].tweenOut.play();
                this.buttonLvl6[0].tweenOut.play();

            }
        })




        this.buttonLvl1 = this.createButtonMenu(750, 80, "Shea Stadium", 0x4063FF, () => {
            this.game.sound.stopAll();
            this.scene.start("intro_1")
        });
        this.buttonLvl2 = this.createButtonMenu(750, 120, "Matchless", 0x4063FF, () => {
            this.game.sound.stopAll();
            this.scene.start("intro_2")
        });
        this.buttonLvl3 = this.createButtonMenu(750, 160, "Manhattan Ave", 0xa9afc9, () => {});
        this.buttonLvl4 = this.createButtonMenu(750, 200, "Silent Barn", 0xa9afc9, () => {});
        this.buttonLvl5 = this.createButtonMenu(750, 240, "Old Kosciuszko Bridge", 0xa9afc9, () => {});
        this.buttonLvl6 = this.createButtonMenu(750, 280, "Death By Audio", 0xa9afc9, () => {});

    },

    update: function () {},


    selectIcon: function (textLevel, levelNumber, available, glow) {
        selectMusic.play();
        if (this.selectedGlow !== null) this.selectedGlow.setVisible(false);
        this.levelTitle.y = 465;
        this.selectedGlow = glow;
        this.selectedGlow.setVisible(true);

        this.levelNumber.text = "Lvl " + levelNumber + " ";
        this.levelTitle.text = textLevel;
        this.levelSubtitle.text = available ? "Tap or click to start " : "Coming Soon ";

        this.levelNumber.setVisible(true);
        this.levelTitle.setVisible(true);
        this.levelSubtitle.setVisible(true);
        this.separator.setVisible(true);

        this.selectedLevel = levelNumber;


    },


    createButtonMenu: function (x, y, title, color, callback) {
        let rectangle = this.add.rectangle(x, y, 250, 30).setFillStyle(color, 0.7).setInteractive().setVisible(false);
        let text = this.add.text(x, y, title, {
            fontFamily: 'euroStyle',
            fontSize: 20
        }).setOrigin(0.5, 0.5).setVisible(false);

        rectangle.on('pointerover', () => {
            rectangle.setFillStyle(color, 1);
        });
        rectangle.on('pointerout', () => {
            rectangle.setFillStyle(color, 0.7);
        });

        rectangle.on('pointerdown', () => {
            callback();
        });

        rectangle.tweenIn = this.tweens.add({
            targets: [rectangle, text],
            y: {
                from: 40,
                to: y
            },
            duration: 200,
            ease: 'Linear',
            loop: 0,
        }).stop();

        rectangle.tweenOut = this.tweens.add({
            targets: [rectangle, text],
            y: {
                from: y,
                to: 40
            },
            duration: 200,
            ease: 'Linear',
            loop: 0,
        }).stop();




        return [rectangle, text];
    }

})