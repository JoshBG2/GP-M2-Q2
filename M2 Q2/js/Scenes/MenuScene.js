class MenuScene extends Phaser.Scene{

    constructor() {
        super("MenuScene")
    }

    init() {

        // Initialize Image and Sprites
        this.background;
        this.player;
        this.meteors;

    }

    preload() {

        // Images and Sprites
        this.load.image('bg', '../assets/images/background.png');
        this.load.image('title', '../assets/images/titles/title.png');
        this.load.image('meteor', '../assets/images/meteor.png');
        this.load.image('player', '../assets/images/player.png');

        // Buttons
        this.load.image('play1', '../assets/images/buttons/play_u.png');
        this.load.image('play2', '../assets/images/buttons/play_p.png');
        this.load.image('credits1', '../assets/images/buttons/credits_u.png');
        this.load.image('credits2', '../assets/images/buttons/credits_p.png');
        this.load.image('controls1', '../assets/images/buttons/controls_u.png');
        this.load.image('controls2', '../assets/images/buttons/controls_p.png');

        //Audio
        this.load.audio('hover_sfx', '../assets/sfx/hover_sfx.mp3');
        this.load.audio('click_sfx', '../assets/sfx/click_sfx.mp3');

    }

    create() {

        // Background
        this.background = this.add.tileSprite(400,475, 800, 950, 'bg');

        // Audio SFX and Config
        this.hoverSFX = this.sound.add('hover_sfx');
        this.clickSFX = this.sound.add('click_sfx');
        this.sfxConfig = {
            mute: false,
            volume: 0.3
        };
        

        // Meteors
        this.meteor0 = this.add.image(Phaser.Math.Between(100,500),-150, 'meteor');
        this.meteor1 = this.add.image(Phaser.Math.Between(100,500),-150, 'meteor');
        this.meteor2 = this.add.image(Phaser.Math.Between(100,500),-150, 'meteor');
        this.meteor3 = this.add.image(Phaser.Math.Between(100,500),-150, 'meteor');
        this.meteor4 = this.add.image(Phaser.Math.Between(100,500),-150, 'meteor');
        this.meteor5 = this.add.image(Phaser.Math.Between(100,500),-150, 'meteor');
        this.meteor6 = this.add.image(Phaser.Math.Between(100,500),-150, 'meteor');

        // Meteor Group
        this.meteors = this.physics.add.group();
        this.meteors.add(this.meteor0);
        this.meteors.add(this.meteor1);
        this.meteors.add(this.meteor2);
        this.meteors.add(this.meteor3);
        this.meteors.add(this.meteor4);
        this.meteors.add(this.meteor5);
        this.meteors.add(this.meteor6);

        // Game Title
        this.add.image(300,200, 'title').setScale(1.2);
        this.add.image(425,245, 'player').setScale(0.8);

        // Play Button
        let playButton = this.add.image(300,450, 'play1').setInteractive({useHandCursor: true});
        playButton.on('pointerover', () => playButton.setTexture('play2'));
        playButton.on('pointerover', () => this.hoverSFX.play(this.sfxConfig));
        playButton.on('pointerout', () => playButton.setTexture('play1'));
        playButton.on('pointerdown', () => this.clickSFX.play());
        playButton.on('pointerdown', () => this.playButton());

        // Credits Button
        let credButton = this.add.image(300,550, 'credits1').setInteractive({useHandCursor: true});
        credButton.on('pointerover', () => credButton.setTexture('credits2'));
        credButton.on('pointerover', () => this.hoverSFX.play(this.sfxConfig));
        credButton.on('pointerout', () => credButton.setTexture('credits1'));
        credButton.on('pointerdown', () => this.clickSFX.play());
        credButton.on('pointerdown', () => this.credButton());

        // Controls Button
        let contButton = this.add.image(300,650, 'controls1').setInteractive({useHandCursor: true});
        contButton.on('pointerover', () => contButton.setTexture('controls2'));
        contButton.on('pointerover', () => this.hoverSFX.play(this.sfxConfig));
        contButton.on('pointerout', () => contButton.setTexture('controls1'));
        contButton.on('pointerdown', () => this.clickSFX.play());
        contButton.on('pointerdown', () => this.contButton());

    }

    update() {

       // Setting Moving Background 
       this.background.tilePositionY -= 0.75; 

       // Spin Meteors
       this.meteor0.angle +=0.5;
       this.meteor1.angle +=0.5;
       this.meteor2.angle +=1;
       this.meteor3.angle +=1.5;
       this.meteor4.angle +=2;
       this.meteor5.angle +=2.5;
       this.meteor6.angle +=3;

       // Meteor Speed
       this.moveMeteor(this.meteor0, 1);
       this.moveMeteor(this.meteor1, 1.5);
       this.moveMeteor(this.meteor2, 2);
       this.moveMeteor(this.meteor3, 2.5);
       this.moveMeteor(this.meteor4, 3);
       this.moveMeteor(this.meteor5, 3.5);
       this.moveMeteor(this.meteor6, 4);

    }
    
    // Setting Meteor Speed
    moveMeteor(meteor,speed){
        meteor.y += speed;
        if (meteor.y > 950) {
            this.resetMeteor(meteor);
        }
    }

    // Resetting Meteor Position
    resetMeteor(meteor) {
        meteor.y = 0;
        let randomX = Phaser.Math.Between(0,600);
        meteor.x = randomX;
    }

    // Button Interactions
    playButton() {
        this.scene.start("GameScene");
    }

    credButton() {
        this.scene.start("CreditScene");
    }

    contButton() {
        this.scene.start("ControlScene");
    }

}