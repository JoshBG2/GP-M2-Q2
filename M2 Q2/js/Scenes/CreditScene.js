class CreditScene extends Phaser.Scene {

    constructor() {
        super("CreditScene")
    }

    init() {

        // Initialize Image and Sprites
        this.background;
        this.meteors;

    }

    preload () {
        
        // Images and Sprties
        this.load.image('bg', '../assets/images/background.png');
        this.load.image('credits', '../assets/images/titles/credits.png')
        this.load.image('sheet_cred', '../assets/images/titles/credits_sheet.png')
        this.load.image('meteor', '../assets/images/meteor.png');

        // Buttons
        this.load.image('back1', '../assets/images/buttons/back_u.png');
        this.load.image('back2', '../assets/images/buttons/back_p.png');

        //Audio
        this.load.audio('hover_sfx', '../assets/sfx/hover_sfx.mp3');
        this.load.audio('click_sfx', '../assets/sfx/click_sfx.mp3');

    }

    create() {

        // Background
        this.background = this.add.tileSprite(400,475, 800, 950, 'bg');

        // Audio SFX
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

        // Credits Title
        this.add.image(305,100, 'credits').setScale(1);
        this.add.image(300,475, 'sheet_cred');

        // Back Button
        let backButton = this.add.image(100,880, 'back1').setInteractive({useHandCursor: true});
        backButton.on('pointerover', () => backButton.setTexture('back2'));
        backButton.on('pointerover', () => this.hoverSFX.play(this.sfxConfig));
        backButton.on('pointerout', () => backButton.setTexture('back1'));
        backButton.on('pointerdown', () => this.clickSFX.play());
        backButton.on('pointerdown', () => this.backButton());

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

    // Back Button
    backButton() {
        this.scene.start("MenuScene");
    }

}
