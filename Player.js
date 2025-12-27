export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture){
        super(scene,x,y,texture);

        scene.physics.world.enable(this);
        scene.add.existing(this);

        this.setScale(0.1).refreshBody();
        this.setCollideWorldBounds(true);

        this.speed=200;
        this.jump_speed=-330;

        this.cursors=scene.cursors;
    }
    update(){
        if(!this.active) return;

        const isRightDown=this.cursors.right.isDown;
        const isLeftDown=this.cursors.left.isDown;
        const isUpDown=this.cursors.up.isDown;
        const isDownDown=this.cursors.down.isDown;

        if(this.scene.dialogManager.isTalking){
            this.setVelocity(0);
            return;
        }
        this.setVelocity(0);

        if(isRightDown){
            this.setVelocityX(this.speed);
        }
        else if(isLeftDown){
            this.setVelocityX(-this.speed);
        }

        if(isUpDown){
            this.setVelocityY(-this.speed);
        }
        else if(isDownDown){
            this.setVelocityY(this.speed);
        }
        
        if (this.body.velocity.x !== 0 && this.body.velocity.y !== 0) {
            this.body.velocity.normalize().scale(this.speed);
        }
    }
}