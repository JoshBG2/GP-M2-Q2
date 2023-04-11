// Setting Game Configuration

let config = {
    type: Phaser.AUTO,
    width: 600,
    height: 950,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [
        MenuScene,
        GameScene,
        CreditScene,
        ControlScene,
        WinScene,
        OverScene
    ]
};

let game = new Phaser.Game(config);

game.scene.start("MenuScene");

// Setting Score as Global Variable
let score = 0;

// Laser and Meteor Collision 
function explode(lasers,meteor) {
    lasers.destroy();
    this.resetMeteor(meteor);
    this.explodeSFX.play(this.sfxConfig);

    // Update Score Text
    score += 1;
    this.scoreText.setText('Score: ' + score);
    if(score == 100) {
        this.bgm.stop();
        this.scene.start("WinScene", {score: score});
    }
}

// Player and Meteor Collision
function takeDamage(player,meteor) {
    this.resetMeteor(meteor);
    this.damageSFX.play(this.sfxConfig);
    this.player.x = 300
    this.player.y = 880
    this.lives -= 1;
    this.livesText.setText('Lives: ' + this.lives);
    if(this.lives == 0) {
        this.bgm.stop();
        this.scene.start("OverScene", {score: score});
    }
} 

