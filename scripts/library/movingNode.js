class MovingNode extends CollisionNode {
    constructor(selector) {
        super(selector);
        this.velocity_x = 0;
        this.velocity_y = 0;
    }

    setPos(x, y) {
        let x_dif = x - this.x;
        let y_dif = y - this.y;

        this.colliders.forEach((collider) => {
            collider.x += x_dif;
            collider.y += y_dif;
        });

        this.x += x_dif;
        this.y += y_dif;
    }

    setVelocity(v_x, v_y) {
        this.velocity_x = v_x;
        this.velocity_y = v_y;
    }

    setAngleVelocity(velocity, euralAngel) {
        let radians = (euralAngel * Math.PI ) / 180;
        this.velocity_x = Math.cos(radians) * velocity;
        this.velocity_y = -Math.sin(radians) * velocity;
    }

    move(elapsedTime) {
        let x_dif = this.velocity_x * elapsedTime;
        let y_dif = this.velocity_y * elapsedTime;
        
        this.colliders.forEach((collider) => {
            collider.x += x_dif;
            collider.y += y_dif;
        });

        this.x += x_dif;
        this.y += y_dif;
    }

    get speed() {
        return Math.sqrt(this.velocity_x*this.velocity_x + this.velocity_y*this.velocity_y);
    }
}