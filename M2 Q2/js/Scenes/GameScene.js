class GameScene extends Phaser.Scene{

    constructor() {
        super("GameScene");
    }

    init () {

        // Initialize Image and Sprites
        this.background;
        this.player;
        this.meteors;
        this.lasers;
        this.barrier;

        // Initialize Keybinds
        this.cursors;
        this.spacebar;
        
        // Initialize Game Text
        this.lives=3;
        this.livesText;
        let score=0;
        let scoreText;
        
    }

    preload () {

        // Images and Sprites
        this.load.image('bg', '../assets/images/background.png');
        this.load.image('projectile', '../assets/images/projectile.png');
        this.load.image('meteor', '../assets/images/meteor.png');
        this.load.image('player', '../assets/images/player.png');
        this.load.image('barrier', '../assets/images/barrier.png');

        // Audio
        this.load.audio('laser_sfx', '../assets/sfx/laser_sfx.mp3');
        this.load.audio('explode_sfx', '../assets/sfx/explode_sfx.mp3');
        this.load.audio('damage_sfx', '../assets/sfx/dmg_sfx.mp3');
        this.load.audio('bgm', '../assets/music/bgm.mp3');

    }

    create() {

        // Background
        this.background = this.add.tileSprite(400,475, 800, 950, 'bg');
    
        // Audio SFX and Config
        this.laserSFX = this.sound.add('laser_sfx');
        this.explodeSFX = this.sound.add('explode_sfx');
        this.damageSFX = this.sound.add('damage_sfx');
        this.bgm = this.sound.add('bgm');

        this.sfxConfig = {
            mute: false,
            volume: 0.3
        };
        
        this.musicConfig = {
            mute: false,
            volume: 0.1,
            loop: true
        };

        this.bgm.play(this.musicConfig);

        // Projectile Limit
        this.barrier = this.physics.add.staticGroup();
        this.barrier.create(400,350,'barrier');

        // Player Ship
        this.player = this.physics.add.sprite(300, 880, 'player');
        this.player.setCollideWorldBounds(true);

        // Keybinds
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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

        // Player and Meteor Collition
        this.physics.add.overlap(this.player, this.meteors, takeDamage, null, this);
        

        // Lives and Score Text
        this.livesText = this.add.text(16,16, 'Lives: ' + this.lives, { font: '24px monospace', fill : '#ffffff'});
        this.scoreText = this.add.text(450,16, 'Score: 0', { font: '24px monospace', fill : '#ffffff'});
        
    }

    update() {

        // Pressed Keybinds
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-300);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(300);
        }
        else {
            this.player.setVelocityX(0);
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
     
        // Shooting Lasers
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {

            // Adding Lasers
            this.lasers = this.physics.add.sprite(this.player.x, this.player.y-30, 'projectile');
            this.laserSFX.play(this.sfxConfig);
            this.lasers.setVelocityY(-500);
            
            // Laser Collision with Projectile Limit
            this.physics.add.collider(this.lasers, this.barrier, function(laser,barrier) {
                laser.destroy();
            });

            // Laser Collision with Meteors
            this.physics.add.overlap(this.lasers, this.meteors, explode, null, this);

        }
        

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
       this.moveMeteor(this.meteor0, 0.5);
       this.moveMeteor(this.meteor1, 0.8);
       this.moveMeteor(this.meteor2, 1.1);
       this.moveMeteor(this.meteor3, 1.4);
       this.moveMeteor(this.meteor4, 1.8);
       this.moveMeteor(this.meteor5, 2.2);
       this.moveMeteor(this.meteor6, 2.5);
       
    }

    // Setting Meteor Speed
    moveMeteor(meteor,speed){
        meteor.y += speed;
        if (meteor.y > 950) {
            this.resetMeteor(meteor);
        }
        if(score > 20) {
            meteor.y += 0.6;
        }
        if(score > 40) {
            meteor.y += 0.6;
        }
        if(score > 60) {
            meteor.y += 1.2;
        }
        if(score > 80) {
            meteor.y += 1.2;
        }
    }
    //Resetting Meteor Position
    resetMeteor(meteor) {
        meteor.y = 0;
        let randomX = Phaser.Math.Between(0,600);
        meteor.x = randomX;
    }
}  

// Audio Config
