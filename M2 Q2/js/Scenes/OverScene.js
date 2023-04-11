class OverScene extends Phaser.Scene {
    
    constructor() {
        super("OverScene")
    }

    init() {

        // Initialize Image and Sprites
        this.background;

    }

    preload () {

        // Images and Sprties 
        this.load.image('bg', '../assets/images/background.png');
        this.load.image('over', '../assets/images/titles/game_over.png');
        this.load.image('meteor', '../assets/images/meteor.png');
        this.load.image('player', '../assets/images/player.png');

        // Buttons
        this.load.image('again1', '../assets/images/buttons/again_u.png');
        this.load.image('again2', '../assets/images/buttons/again_p.png');
        this.load.image('menu1', '../assets/images/buttons/menu_u.png');
        this.load.image('menu2', '../assets/images/buttons/menu_p.png');

        //Audio
        this.load.audio('hover_sfx', '../assets/sfx/hover_sfx.mp3');
        this.load.audio('click_sfx', '../assets/sfx/click_sfx.mp3');
        this.load.audio('lose_sfx', '../assets/sfx/lose_sfx.mp3');

    }

    create() {

        // Background
        this.background = this.add.tileSprite(400,475, 800, 950, 'bg');

        // Audio SFX and Config
        this.hoverSFX = this.sound.add('hover_sfx');
        this.clickSFX = this.sound.add('click_sfx');
        this.loseSFX = this.sound.add('lose_sfx');
        this.sfxConfig = {
            mute: false,
            volume: 0.3
        };

        this.loseSFX.play();

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

        // Over Title
        this.add.image(300,200, 'over').setScale(1.2);
        this.add.image(410,245, 'meteor').setScale(1); 

        // Score
        let scoreText = this.add.text(300,310, 'Score: ' + score, { font: '24px monospace', fill : '#ffffff'}).setOrigin(0.5);

        // Play Again Button
        let againButton = this.add.image(300,450, 'again1').setInteractive({useHandCursor: true});
        againButton.on('pointerover', () => againButton.setTexture('again2'));
        againButton.on('pointerover', () => this.hoverSFX.play(this.sfxConfig));
        againButton.on('pointerout', () => againButton.setTexture('again1'));
        againButton.on('pointerdown', () => {this.clickSFX.play(); score = 0});
        againButton.on('pointerdown', () => this.againButton());

        // Main Menu Button
        let menuButton = this.add.image(300,550, 'menu1').setInteractive({useHandCursor: true});
        menuButton.on('pointerover', () => menuButton.setTexture('menu2'));
        menuButton.on('pointerover', () => this.hoverSFX.play(this.sfxConfig));
        menuButton.on('pointerout', () => menuButton.setTexture('menu1'));
        menuButton.on('pointerdown', () => {this.clickSFX.play(); score = 0});
        menuButton.on('pointerdown', () => this.menuButton());

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
    againButton() {
        this.scene.start("GameScene");
    }

    menuButton() {
        this.scene.start("MenuScene");
    }

}
