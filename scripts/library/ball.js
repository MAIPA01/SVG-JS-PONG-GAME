class Ball extends MovingNode {
    constructor(selector) {
        super(selector);
        let collider = new BoxCollider(this.x + this.width/2, this.y + this.height/2, this.width, this.height, "ball");
        collider.onCollisionEnter = (collider) => this.onCollisionEnter(collider);
        this.addBoxColider(collider);

        this.wallSound = new Audio("sounds/Pong_Wall.mp3");
        this.wallSound.volume = 1;
        this.wallSound.load();
        this.paddleSound = new Audio("sounds/Pong_Paddle.mp3");
        this.paddleSound.volume = 1;
        this.paddleSound.load();
    }

    onCollisionEnter(collider) {
        if (collider.name.endsWith("Wall")) {
            if (collider.name.startsWith("top") || collider.name.startsWith("bottom")) {
                this.velocity_y = -this.velocity_y;
                this.wallSound.play();
            }
        }
        else if (collider.name.startsWith("playerPlatform")) {
            this.paddleSound.play();
            if (collider.name.includes("1")) {
                if (collider.name.endsWith("middle-top")){
                    this.setAngleVelocity(this.speed, 25);
                }
                else if (collider.name.endsWith("top")){
                    this.setAngleVelocity(this.speed, 45);
                } 
                else if (collider.name.endsWith("middle")){
                    this.setAngleVelocity(this.speed, 0);
                }
                else if (collider.name.endsWith("middle-bottom")){
                    this.setAngleVelocity(this.speed, -25);
                }
                else if (collider.name.endsWith("bottom")){
                    this.setAngleVelocity(this.speed, -45);
                }
            }
            else {
                if (collider.name.endsWith("middle-top")){
                    this.setAngleVelocity(this.speed, 115);
                }
                else if (collider.name.endsWith("top")){
                    this.setAngleVelocity(this.speed, 135);
                } 
                else if (collider.name.endsWith("middle")){
                    this.setAngleVelocity(this.speed, 180);
                }
                else if (collider.name.endsWith("middle-bottom")){
                    this.setAngleVelocity(this.speed, -135);
                }
                else if (collider.name.endsWith("bottom")){
                    this.setAngleVelocity(this.speed, -115);
                }
            }
        }
    }
}