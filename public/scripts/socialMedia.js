//----------------------------------------S O C I A L     M E D I A



window.shareTwitter=(tweettxt)=> { //share score on twitter        
    var tweetbegin = 'https://twitter.com/intent/tweet?text=';

    var finaltweet = tweetbegin + tweettxt + window.location.href;
    window.open(finaltweet, '_blank');
}

window.shareFacebook=()=> {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href, '_blank')
}

window.copyStringToClipboard=()=> {
    var el = document.createElement('textarea');
    el.value = window.location.href;
    el.setAttribute('readonly', '');
    el.style = {
        position: 'absolute',
        left: '-9999px'
    };
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

window.ValidateEmail=(mail)=> {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
}




window.createSocialMediaMenu=(scene,twitterMessage)=> {

    //---------------Share button
    scene.share = scene.add.image(40, 40, "shareIcon").setScale(0.09);
    scene.share.setInteractive();
    scene.share.on('pointerover', () => {
        scene.share.setScale(0.1);
    });
    scene.share.on('pointerout', () => {
        scene.share.setScale(0.09);
    });
    scene.share.on('pointerdown', () => {

        if (!scene.facebook.visible) { // show the icons
            scene.facebook.visible = true;
            scene.facebook.tweenIn.play();
            scene.twitter.visible = true;
            scene.twitter.tweenIn.play();
            scene.copyURL.visible = true;
            scene.copyURL.tweenIn.play();

            scene.time.delayedCall(200, () => {
                scene.facebook.input.enabled = true;
                scene.twitter.input.enabled = true;
                scene.copyURL.input.enabled = true;
            });



        } else { //hide the icons
            scene.time.delayedCall(200, () => {
                scene.facebook.visible = false;
                scene.twitter.visible = false;
                scene.copyURL.visible = false;
            });
            scene.facebook.input.enabled = false;
            scene.twitter.input.enabled = false;
            scene.copyURL.input.enabled = false;
            scene.facebook.tweenOut.play();
            scene.twitter.tweenOut.play();
            scene.copyURL.tweenOut.play();

        }
    });


    //---------------Facebook
    scene.facebook = scene.add.image(40, 100, "facebook").setScale(0.4).setVisible(false);
    scene.facebook.setInteractive();
    scene.facebook.input.enabled = false;
    scene.facebook.on('pointerup', () => {
        shareFacebook();

    });

    scene.facebook.on('pointerover', () => {
        scene.facebook.setScale(0.5);
    });
    scene.facebook.on('pointerout', () => {
        scene.facebook.setScale(0.4);
    });

    scene.facebook.tweenIn = scene.tweens.add({
        targets: scene.facebook,
        y: {
            from: 40,
            to: 100
        },
        duration: 200,
        ease: 'Linear',
        loop: 0,
    });

    scene.facebook.tweenOut = scene.tweens.add({
        targets: scene.facebook,
        y: {
            from: 100,
            to: 40
        },
        duration: 200,
        ease: 'Linear',
        loop: 0,
    });

    //----------------Twitter
    scene.twitter = scene.add.image(40, 160, "twitter").setScale(0.4).setVisible(false);
    scene.twitter.setInteractive();
    scene.twitter.input.enabled = false;
    scene.twitter.on('pointerup', () => {
        shareTwitter(twitterMessage);
    });
    scene.twitter.on('pointerover', () => scene.twitter.setScale(0.5));
    scene.twitter.on('pointerout', () => scene.twitter.setScale(0.4));
    scene.twitter.tweenIn = scene.tweens.add({
        targets: scene.twitter,
        y: {
            from: 40,
            to: 150
        },
        duration: 200,
        ease: 'Linear',
        loop: 0,
    });
    scene.twitter.tweenOut = scene.tweens.add({
        targets: scene.twitter,
        y: {
            from: 150,
            to: 40
        },
        duration: 200,
        ease: 'Linear',
        loop: 0,
    });

    //----------------Copy to clipboard
    scene.copyURL = scene.add.image(40, 210, "copyIcon").setScale(1).setVisible(false);
    scene.copyURL.setInteractive();
    scene.copyURL.input.enabled = false;
    scene.copyURL.on('pointerdown', () => {
        copyStringToClipboard();
    });

    scene.copyURL.on('pointerover', () => {
        scene.copyURL.setScale(1.2);
    });
    scene.copyURL.on('pointerout', () => {
        scene.copyURL.setScale(1);
    });

    scene.copyURL.tweenIn = scene.tweens.add({
        targets: scene.copyURL,
        y: {
            from: 40,
            to: 210
        },
        duration: 200,
        ease: 'Linear',
        loop: 0,
    });


    scene.copyURL.tweenOut = scene.tweens.add({
        targets: scene.copyURL,
        y: {
            from: 210,
            to: 40
        },
        duration: 200,
        ease: 'Linear',
        loop: 0,
    });
}