const left = 37;
const up = 38;
const right = 39;
const down = 40;
const speed = 0.8;
const radiusInteraction = 30;
let NPCS = [];

const timeStartGame = 68000;
const timeEndGame = 142000;


//NPCS
let Ella;
let Chester;
let Tyler;
let Bela;
let Nick;
let Jon;
let Sally;
let Benny;
let Anna;
let Dillon;
let Sam;
let Aaron;
let Alex;
let Door1;
let Door2;
let Exit;
let drummer;
let bassist;
let guitarist;


class Player_Lvl_1 {
    constructor(x, y, poly) {
        this.x = x;
        this.y = y;
        this.shirt = "Blue";
        this.moving = false;
        this.direction = null;
        this.avatar = null;
        this.poly = poly;
    //move player
        this.move = (params) => {
            if (params === left) {
                if (Phaser.Geom.Polygon.Contains(this.poly, this.avatar.x - speed, this.avatar.y + 16) &&
                    !checkCollisionNPCS(this.avatar.x - speed, this.avatar.y + 16))
                    this.avatar.x -= speed;
                if (!this.moving) {
                    this.direction = left;
                    this.avatar.play("walkLeft" + this.shirt);
                }
                this.moving = true;
            }
            if (params === right) {
                if (Phaser.Geom.Polygon.Contains(poly, this.avatar.x + speed, this.avatar.y + 16) &&
                    !checkCollisionNPCS(this.avatar.x + speed, this.avatar.y + 16))
                    this.avatar.x += speed;
                if (!this.moving) {
                    this.avatar.play("walkRight" + this.shirt);
                    this.direction = right;
                }
                this.moving = true;
            }
            if (params === up) {
                if (Phaser.Geom.Polygon.Contains(poly, this.avatar.x, this.avatar.y - speed + 16) &&
                    !checkCollisionNPCS(this.avatar.x, this.avatar.y + 16 - speed))
                    this.avatar.y -= speed;
                if (this.direction != up) this.avatar.play("walkUp" + this.shirt);
                this.direction = up;
                this.moving = true;
                this.avatar.depth = this.avatar.y;
            }
            if (params === down) {
                if (Phaser.Geom.Polygon.Contains(poly, this.avatar.x, this.avatar.y + speed + 16) &&
                    !checkCollisionNPCS(this.avatar.x, this.avatar.y + 16 + speed))
                    this.avatar.y += speed;
                if (this.direction != down) this.avatar.play("walkDown" + this.shirt);
                this.direction = down;
                this.moving = true;
                this.avatar.depth = this.avatar.y;
            }
        };

        this.moveJoyStick = (x, y) => {
            // movement
            if (x > 30 && Phaser.Geom.Polygon.Contains(poly, this.avatar.x + speed, this.avatar.y + 16) &&
                !checkCollisionNPCS(this.avatar.x + speed, this.avatar.y + 16)) {
                this.avatar.x += speed * 1.2;
            }
            if (x < -30 && Phaser.Geom.Polygon.Contains(poly, this.avatar.x - speed, this.avatar.y + 16) &&
                !checkCollisionNPCS(this.avatar.x - speed, this.avatar.y + 16)) {
                this.avatar.x -= speed * 1.2;
            }
            if (y < -30 && Phaser.Geom.Polygon.Contains(poly, this.avatar.x, this.avatar.y + 16 - speed) &&
                !checkCollisionNPCS(this.avatar.x, this.avatar.y + 16 - speed)) {
                this.avatar.y -= speed;
                this.avatar.depth = this.avatar.y;
            }
            if (y > 30 && Phaser.Geom.Polygon.Contains(poly, this.avatar.x, this.avatar.y + 16 + speed) &&
                !checkCollisionNPCS(this.avatar.x, this.avatar.y + 16 + speed)) {
                this.avatar.y += speed;
                this.avatar.depth = this.avatar.y;
            }

            // direction
            if (Math.abs(x) > 20 || Math.abs(y) > 20) {
                this.moving = true;
                if (Math.abs(x) > Math.abs(y)) {
                    if (x > 0) {
                        this.direction = right;
                        if (this.avatar.anims.currentAnim.key !== "walkRight" + this.shirt) this.avatar.play("walkRight" + this.shirt);
                    } else {
                        this.direction = left;
                        if (this.avatar.anims.currentAnim.key !== "walkLeft" + this.shirt) this.avatar.play("walkLeft" + this.shirt);
                    }
                } else {
                    if (y > 0) {
                        this.direction = down;
                        if (this.avatar.anims.currentAnim.key !== "walkDown" + this.shirt) this.avatar.play("walkDown" + this.shirt);
                    } else {
                        this.direction = up;
                        if (this.avatar.anims.currentAnim.key !== "walkUp" + this.shirt) this.avatar.play("walkUp" + this.shirt);
                    }
                }
            } else {
                this.returnToIdle();
            }
        };

    //return to idle
        this.returnToIdle = () => {
            switch (this.direction) {
                case up: this.avatar.play("idleUp" + this.shirt); break;
                case down: this.avatar.play("idleDown" + this.shirt); break;
                case right: this.avatar.play("idleRight" + this.shirt); break;
                case left: this.avatar.play("idleLeft" + this.shirt); break;
            }
        };
    };


}

class NPC {
    constructor(name, x, y, message1, message2, numberSprite, idleSprite) {
        this.x = x;
        this.y = y;
        this.message1 = message1;
        this.message2 = message2;
        this.name = name;
        this.numberSprite = numberSprite;
        this.message = 0;
        this.sleeping = 0; //0--> normal , 1-->slept , 2-->awaken
        this.timeToSleep = 999999.9;
        this.timeToDisappear = Math.random() * 74000 + 112000;
        this.visible = true;
        this.idleSprite = idleSprite;
    }
}


function createNPCS_Level_1() {
    // with rotation
    Ella = new NPC("Ella", 210, 190, "All my friends are out on the balcony but this bassist can really hold it down.", null, 44, 46);
    Chester = new NPC("Chester", 270, 200, "It's not that crowded tonight. I'm gonna graffiti the bathroom while I have the chance.", null, 33, 35);
    Tyler = new NPC("Tyler", 350, 200, "Did you see Future Islands on Letterman? Crazy. I saw them play here back in 2010.", null, 77, 79);
    Bela = new NPC("Bela", 310, 110, "Did you know that Titus Andronicus practices here? The lead singer took my ticket at the door.", null, 55, 56);
    Nick = new NPC("Nick", 300, 150, "Shhh... I hear they record the shows here. Don't want to mess it up.", null, 88, 90);
    Jon = new NPC("Jon", 330, 180, "I threw up last time I saw these guys.", "Don't worry, it probably won't happen this time", 0, 2);

    // without rotation
    Sally = new NPC("Sally", 100, 110, "You shouldn't sit on this couch. It's disgusting.", null, 11, 13);
    Benny = new NPC("Benny", 140, 100, "I don't care what she thinks. This couch is comfy", null, null, 121);

    // without rotation , with sequential interaction
    Anna = new NPC("Anna", 240, 160, "", "", null, 68);
    Anna.sequence = {
        name1: "Anna",
        name2: "Dillon",
        msg1_1: "Have you noticed companies are hiring people to graffiti their warehouses? Just be a fucking warehouse, man!",
        msg2_1: "Huh. I guess I haven't really noticed.",
        msg1_2: "Corporate jocks desperately trying to appeal to the youth. It's pathetic",
        msg2_2: "ok...",
        message: 0,
        sequentialName: "Anna and Dillon"
    }
    Dillon = new NPC("Dillon", 255, 150, "Huh. I guess I haven't really noticed.", null, null, 24);
    Dillon.sequence = Anna.sequence;

    Sam = new NPC("Sam", 50, 200, "*why is this guy creeping?*", "Piss off, creep", null, 110);
    Sam.sequence = {
        name1: "Sam",
        name2: "Aaron",
        msg1_1: "*why is this guy creeping?*",
        msg2_1: "...and so with the coupon it only ended up being--hey, can I help you asshole?",
        msg1_2: " *he's still here…*",
        msg2_2: "Piss off, creep",
        message: 0,
        sequentialName: "Sam and Aaron"
    }
    Aaron = new NPC("Aaron", 65, 190, "", '', null, 100);
    Aaron.sequence = Sam.sequence;


    Alex = new NPC("Alex", 235, 87, "You wanna buy a shirt? Sure thing.", "You already have a shirt.", null, 132);
    Door1 = new NPC("Guy Blue", 180, 55, "It's locked", "I don't want to leave yet, we gotta do something!", null, null);
    Door2 = new NPC("Guy Blue", 350, 105, "It's locked", "I don't want to leave yet, we gotta do something!", null, null);
    Exit = new NPC("Guy Blue", 80, 115, " I don't want to leave yet, the concert just started.", "I don't want to leave yet, we gotta do something!", null, null);


    // without interaction
    drummer = new NPC("Drummer", 380, 150, "", "", null, 165)
    bassist = new NPC("Bassist", 400, 185, "slap* slap", null, null, 143)
    guitarist = new NPC("Guitarist", 330, 140, "can't you see I'm shredding?", null, null, 154)
    NPCS.push(Ella, Chester, Tyler, Bela, Nick, Jon, Sally, Benny, Anna, Dillon, Sam, Aaron, Alex, guitarist, bassist, drummer, Door1, Door2, Exit);

}



// --------------------------------- global functions ----------------------------------

function resetGame() {
    controls.joystickLocked = true;
    controls.buttonsLocked = false;
    NPCS = [];
    createNPCS_Level_1();
    Object.assign(player, {
        x: 98,
        y: 141,
        shirt: "Blue",
        moving: false,
        direction: null,
        avatar: null,
    })
}

function minDistance() { // compute the min distance between the player and the NPCS from the npc array
    return NPCS.reduce((acc, val) => {
        if (Math.sqrt((player.avatar.x - val.avatar.x) ** 2 + (player.avatar.y - val.avatar.y) ** 2) < acc[0] && val.visible) {
            acc[0] = Math.sqrt((player.avatar.x - val.avatar.x) ** 2 + (player.avatar.y - val.avatar.y) ** 2);
            acc[1] = val;
        }
        return acc;
    }, [999])
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function NpcLookPlayer(npc) {
    if (npc.numberSprite != null) {
        let x = npc.avatar.x - player.avatar.x;
        let y = npc.avatar.y - player.avatar.y;
        let lookDirection;
        if (Math.abs(x) > Math.abs(y)) {
            if (x > 0) lookDirection = 3;
            else lookDirection = 2;
        } else {
            if (y > 0) lookDirection = 0
            else lookDirection = 1;
        }
        npc.avatar.anims.stop();
        npc.avatar.setTexture('NPC', npc.numberSprite + lookDirection);
    }
}

// function sleepEveryone() {
//     NPCS.forEach((el) => {
//         if (el.avatar.anims !== undefined) {
//             el.avatar.anims.play("sleep" + el.name);
//             el.sleeping = 1;
//             el["zzz"].visible = true;
//         }
//     })
// }

function checkCollisionNPCS(X, Y) {
    return NPCS.some((el) => {
        X1 = el.avatar.x;
        Y1 = el.avatar.y + 16;
        return (X > X1 - 10 && X < X1 + 10 && Y < Y1 + 5 && Y > Y1 - 5)
    })
}

function hideAllCharacters() {
    if (NPCS.length > 0) {
        NPCS.forEach((el, index, object) => {
            el.visible = false;
            el.avatar.visible = false;
            if (el.zzz !== undefined) el["zzz"].visible = false;
            if (el.tween !== undefined) el["tween"].stop();
        });
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


//---------------------------------------- load animations of the player 

window.loadAnimationsPlayer = function (scene) {
    scene.anims.create({
        key: "walkRightBlue",
        repeat: -1,
        frameRate: 7,
        frames: scene.anims.generateFrameNumbers('blueGuy', {
            frames: [14, 15]
        })
    })
    scene.anims.create({
        key: "walkLeftBlue",
        repeat: -1,
        frameRate: 7,
        frames: scene.anims.generateFrameNumbers('blueGuy', {
            frames: [12, 13]
        })
    })
    scene.anims.create({
        key: "walkDownBlue",
        repeat: -1,
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers('blueGuy', {
            frames: [4, 5, 6, 7]
        })
    })
    scene.anims.create({
        key: "walkUpBlue",
        repeat: -1,
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers('blueGuy', {
            frames: [8, 9, 10, 11]
        })
    })
    scene.anims.create({
        key: "idleDownBlue",
        repeat: -1,
        frameRate: 5,
        frames: scene.anims.generateFrameNumbers('blueGuy', {
            frames: [0]
        })
    })
    scene.anims.create({
        key: "idleLeftBlue",
        repeat: -1,
        frameRate: 5,
        frames: scene.anims.generateFrameNumbers('blueGuy', {
            frames: [1]
        })
    })
    scene.anims.create({
        key: "idleRightBlue",
        repeat: -1,
        frameRate: 5,
        frames: scene.anims.generateFrameNumbers('blueGuy', {
            frames: [3]
        })
    })
    scene.anims.create({
        key: "idleUpBlue",
        repeat: -1,
        frameRate: 5,
        frames: scene.anims.generateFrameNumbers('blueGuy', {
            frames: [2]
        })
    })

    //----------------------------------------     Player Red shirt
    scene.anims.create({
        key: "walkRightRed",
        repeat: -1,
        frameRate: 7,
        frames: scene.anims.generateFrameNumbers('redGuy', {
            frames: [14, 15]
        })
    })
    scene.anims.create({
        key: "walkLeftRed",
        repeat: -1,
        frameRate: 7,
        frames: scene.anims.generateFrameNumbers('redGuy', {
            frames: [12, 13]
        })
    })
    scene.anims.create({
        key: "walkDownRed",
        repeat: -1,
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers('redGuy', {
            frames: [4, 5, 6, 7]
        })
    })
    scene.anims.create({
        key: "walkUpRed",
        repeat: -1,
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers('redGuy', {
            frames: [8, 9, 10, 11]
        })
    })
    scene.anims.create({
        key: "idleDownRed",
        repeat: -1,
        frameRate: 5,
        frames: scene.anims.generateFrameNumbers('redGuy', {
            frames: [0]
        })
    })
    scene.anims.create({
        key: "idleLeftRed",
        repeat: -1,
        frameRate: 5,
        frames: scene.anims.generateFrameNumbers('redGuy', {
            frames: [1]
        })
    })
    scene.anims.create({
        key: "idleRightRed",
        repeat: -1,
        frameRate: 5,
        frames: scene.anims.generateFrameNumbers('redGuy', {
            frames: [3]
        })
    })
    scene.anims.create({
        key: "idleUpRed",
        repeat: -1,
        frameRate: 5,
        frames: scene.anims.generateFrameNumbers('redGuy', {
            frames: [2]
        })
    })
}

class Player_Lvl_2 {
    constructor(x, y, poly, colliders) {
        this.x = x;
        this.y = y;
        this.shirt = "Blue";
        this.moving = false;
        this.direction = null;
        this.avatar = null;
        this.poly = poly
        this.colliders = colliders;

        this.move = (params) => {


            if (params === left) {
                if (Phaser.Geom.Polygon.Contains(this.poly, this.avatar.x - speed, this.avatar.y + 16) &&
                    !this.checkCollisions(this.avatar.x - speed, this.avatar.y + 16))
                    this.avatar.x -= speed;
                if (!this.moving) {
                    this.direction = left;
                    this.avatar.play("walkLeft" + this.shirt);
                }
                this.moving = true;
            }

            if (params === right) {
                if (Phaser.Geom.Polygon.Contains(this.poly, this.avatar.x + speed, this.avatar.y + 16) &&
                    !this.checkCollisions(this.avatar.x + speed, this.avatar.y + 16)) {
                    this.avatar.x += speed;
                }
                if (!this.moving) {
                    this.avatar.play("walkRight" + this.shirt);
                    this.direction = right;
                }
                this.moving = true;
            }
            //return;
            if (params === up) {
                if (Phaser.Geom.Polygon.Contains(this.poly, this.avatar.x, this.avatar.y - speed + 16) &&
                    !this.checkCollisions(this.avatar.x, this.avatar.y + 16 - speed))
                    this.avatar.y -= speed;
                if (this.direction != up) this.avatar.play("walkUp" + this.shirt);
                this.direction = up;
                this.moving = true;
                this.avatar.depth = this.avatar.y;
            }
            if (params === down) {
                if (Phaser.Geom.Polygon.Contains(this.poly, this.avatar.x, this.avatar.y + speed + 16) &&
                    !this.checkCollisions(this.avatar.x, this.avatar.y + 16 + speed))
                    this.avatar.y += speed;
                if (this.direction != down) this.avatar.play("walkDown" + this.shirt);
                this.direction = down;
                this.moving = true;
                this.avatar.depth = this.avatar.y;
            }
        }

        this.moveJoyStick = (x, y) => {
            // movement
            if (x > 30 && Phaser.Geom.Polygon.Contains(this.poly, this.avatar.x + speed, this.avatar.y + 16) &&
                !this.checkCollisions(this.avatar.x + speed, this.avatar.y + 16)) {
                this.avatar.x += speed * 1.2;
            }
            if (x < -30 && Phaser.Geom.Polygon.Contains(this.poly, this.avatar.x - speed, this.avatar.y + 16) &&
                !this.checkCollisions(this.avatar.x - speed, this.avatar.y + 16)) {
                this.avatar.x -= speed * 1.2;
            }
            if (y < -30 && Phaser.Geom.Polygon.Contains(this.poly, this.avatar.x, this.avatar.y + 16 - speed) &&
                !this.checkCollisions(this.avatar.x, this.avatar.y + 16 - speed)) {
                this.avatar.y -= speed;
                this.avatar.depth = this.avatar.y;
            }
            if (y > 30 && Phaser.Geom.Polygon.Contains(this.poly, this.avatar.x, this.avatar.y + 16 + speed) &&
                !this.checkCollisions(this.avatar.x, this.avatar.y + 16 + speed)) {
                this.avatar.y += speed;
                this.avatar.depth = this.avatar.y;
            }

            // direction
            if (Math.abs(x) > 20 || Math.abs(y) > 20) {
                this.moving = true;
                if (Math.abs(x) > Math.abs(y)) {
                    if (x > 0) {
                        this.direction = right;
                        if (this.avatar.anims.currentAnim.key !== "walkRight" + this.shirt) this.avatar.play("walkRight" + this.shirt);
                    } else {
                        this.direction = left;
                        if (this.avatar.anims.currentAnim.key !== "walkLeft" + this.shirt) this.avatar.play("walkLeft" + this.shirt);
                    }
                } else {
                    if (y > 0) {
                        this.direction = down;
                        if (this.avatar.anims.currentAnim.key !== "walkDown" + this.shirt) this.avatar.play("walkDown" + this.shirt);
                    } else {
                        this.direction = up;
                        if (this.avatar.anims.currentAnim.key !== "walkUp" + this.shirt) this.avatar.play("walkUp" + this.shirt);
                    }
                }
            } else {
                this.returnToIdle();
            }
        }

        this.returnToIdle = () => {
            switch (this.direction) {
                case up:
                    this.avatar.play("idleUp" + this.shirt);
                    break;
                case down:
                    this.avatar.play("idleDown" + this.shirt);
                    break;
                case right:
                    this.avatar.play("idleRight" + this.shirt);
                    break;
                case left:
                    this.avatar.play("idleLeft" + this.shirt);
                    break;
            }
        }

        this.checkCollisions = (X, Y) => { //check collisions with circular colliders
            return this.colliders.some((el) => {

                let X1 = el[0];
                let Y1 = el[1];
                let radius = el[2]
                return (distance(X, Y, X1, Y1) < radius)
            })
        }
    };
}

function loadLevel2(scene) {
    scene.anims.create({
        key: "level2_blueguy_drop_beer",
        repeat: -1,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_blueguy_drop_beer', {
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        })
    })

    scene.anims.create({
        key: "level2_blueguy_sleeping",
        repeat: -1,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_blueguy_sleeping', {
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8]
        })
    })

    scene.anims.create({
        key: "level2_redguy_drink_beer",
        repeat: -1,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_redguy_drink_beer', {
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8]
        })
    })

    scene.anims.create({
        key: "level2_redguy_looking_down",
        repeat: -1,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_redguy_looking_down', {
            frames: [0, 1, 2]
        })
    })

    scene.anims.create({
        key: "level2_blueguy_drinking",
        repeat: -1,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_blueguy_drinking', {
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        })
    })

    scene.anims.create({
        key: "level2_blueguy_falling",
        repeat: -1,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_blueguy_falling', {
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
        })
    })

    scene.anims.create({
        key: "level2_redguy_poke",
        repeat: -1,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_redguy_poke', {
            frames: [0, 1, 2, 3, 4, 5, 6]
        })
    })

    scene.anims.create({
        key: "level2_blueguy_talking",
        repeat: -1,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_blueguy_talking', {
            frames: [0, 1, 2, 3, 4, 5]
        })
    })

    scene.anims.create({
        key: "level2_redguy_talking_no_beer",
        repeat: -1,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_redguy_talking_no_beer', {
            frames: [0, 1, 2, 3, 4, 5]
        })
    })

    scene.anims.create({
        key: "level2_redguy_talking_beer",
        repeat: -1,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_redguy_talking_beer', {
            frames: [0, 1, 2, 3, 4, 5]
        })
    })
    //----other animations
    scene.anims.create({
        key: "level2_beerCrane",
        repeat: 0,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_beerCrane', {
            frames: [0, 1, 0]
        })
    })

    scene.anims.create({
        key: "level2_beer_fill",
        repeat: 0,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_beer', {
            frames: [0, 1]
        })
    })

    scene.anims.create({
        key: "level2_beer_drop",
        repeat: 0,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_beer', {
            frames: [2, 3]
        })
    })


}


//------------ create menu
createMenu = (scene, names, callbacks, width, height, posX, posY) => {

    let buttons=[];
    let texts=[];

    names.forEach((element,index) => {
        let button = scene.add.rectangle(posX, posY+(index+1)*60, width, height).setFillStyle(0x4063FF, 0.6).setInteractive().setVisible(false);
        
        // add interactivity to the button
        button.on('pointerover', () => button.setFillStyle(0x4063FF, 1));
        button.on('pointerout', () => button.setFillStyle(0x4063FF, 0.6));
        button.on('pointerdown', () => callbacks[index]());
        
        
        // add tweens in and tween out to the button
        button.tweenIn = scene.tweens.add({
            targets: button,
            y: {
                from: posY,
                to: posY+(index+1)*60
            },
            duration: 200,
            ease: 'Linear',
            loop: 0,
        }).stop();

        button.tweenOut = scene.tweens.add({
            targets: button,
            y: {
                from: posY+(index+1)*60,
                to: posY
            },
            duration: 200,
            ease: 'Linear',
            loop: 0,
        }).stop();

        //add the text
        let text = scene.add.text(button.x, button.y, element, {
            fontFamily: 'euroStyle',
            fontSize: 30
        }).setOrigin(0.5, 0.5).setVisible(false);

        //add the text and buttons to the array
        texts.push(text);
        buttons.push(button);
    });

    
        //-------------hamburger icon
        scene.hamburguer = scene.add.image(830, 40, "hambugerIcon").setScale(0.4).setInteractive();
        scene.hamburguer.on('pointerover', () => scene.hamburguer.setScale(0.45));
        scene.hamburguer.on('pointerout', () => scene.hamburguer.setScale(0.4));
        scene.hamburguer.on('pointerdown', () => {
            if (!buttons[0].visible) { // show the icons
                buttons.forEach(el=>{
                    el.visible = true;
                    el.tweenIn.play();
                })
                scene.time.delayedCall(200, () => texts.forEach(el=> el.setVisible(true)));
            } else { //hide the icons
                texts.forEach(el=> el.setVisible(false));
                scene.time.delayedCall(200, () => buttons.forEach(el=> el.visible = false));
                buttons.forEach(el=> el.tweenOut.play());
            }
        });




}