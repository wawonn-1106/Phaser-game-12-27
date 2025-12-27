export default class House extends Phaser.Scene{
    constructor(){
        super({key:'House'});

    }
    create(){
        const map = this.make.tilemap({ key: 'map' });
    
        const tileset = map.addTilesetImage('pipo-map001','tileset');
        
        this.backgroundLayer = map.createLayer('ground', tileset, 0, 0); 
        this.worldLayer = map.createLayer('object', tileset, 0, 0); 
        this.worldLayer.setCollisionByProperty({ collides: true });

        this.player = this.physics.add.sprite(500, 400, 'player').setScale(0.1);
        this.physics.add.collider(this.player, this.worldLayer);

        this.cursors = this.input.keyboard.createCursorKeys();

    }
    update(){
        const speed = 200;
        this.player.setVelocity(0);

        const tile=this.worldLayer.getTileAtWorldXY(this.player.x,this.player.y);
        if(tile.index===99){
            this.cameras.main.fadeOut(500, 0, 0, 0);

            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start('World');
            });
        }

        if (this.cursors.left.isDown) this.player.setVelocityX(-speed);
        else if (this.cursors.right.isDown) this.player.setVelocityX(speed);

        if (this.cursors.up.isDown) this.player.setVelocityY(-speed);
        else if (this.cursors.down.isDown) this.player.setVelocityY(speed);
    }
}