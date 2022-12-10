class PlayerPlatform extends MovingNode {
    constructor(selector, playerNum, keyUpCode, keyDownCode, baseSpeed){
        super(selector);
        
        let middle_x = this.x + this.width/2;
        let middle_y = this.y + this.height/2;

        let collider_top = new BoxCollider(middle_x, middle_y - 11*this.height/26, this.width, 2*this.height/13, 'playerPlatform' + playerNum + '-top');
        collider_top.onCollisionEnter = (collider) => this.onCollisionEnter_top(collider);
        collider_top.onCollisionExit = (collider) => this.onCollisionExit_top(collider);
        let collider_middle_top = new BoxCollider(middle_x, middle_y - 5*this.height/26, this.width, 4*this.height/13, 'playerPlatform' + playerNum + '-middle-top');
        let collider_middle = new BoxCollider(middle_x, middle_y, this.width, this.height/13, 'playerPlatform' + playerNum + '-middle');
        let collider_middle_bottom = new BoxCollider(middle_x, middle_y + 5*this.height/26, this.width, 4*this.height/13, 'playerPlatform' + playerNum + '-middle-bottom');
        let collider_bottom = new BoxCollider(middle_x, middle_y + 11*this.height/26, this.width, 2*this.height/13, 'playerPlatform' + playerNum + '-bottom');
        collider_bottom.onCollisionEnter = (collider) => this.onCollisionEnter_bottom(collider);
        collider_bottom.onCollisionExit = (collider) => this.onCollisionExit_bottom(collider);
        
        this.colliders.push(collider_top);
        this.colliders.push(collider_middle_top);
        this.colliders.push(collider_middle);
        this.colliders.push(collider_middle_bottom);
        this.colliders.push(collider_bottom);

        this.collided_top = false;
        this.collided_bottom = false;

        this.keyUpCode = keyUpCode;
        this.keyDownCode = keyDownCode;

        this.keyDownPushed = false;
        this.keyUpPushed = false;

        this.baseSpeed = baseSpeed;

        this.active = false;

        document.addEventListener('keydown', (event) => this.onKeyDown(event), false);
        document.addEventListener('keyup', (event) => this.onKeyUp(event), false);
    }

    onKeyDown(event) {
        if (!this.active) {
            this.setVelocity(0, 0);
            return;
        }

        if (event.key.toLowerCase() === this.keyUpCode.toLowerCase() && !this.collided_top) {
            this.keyUpPushed = true;
            this.keyDownPushed = false;
            this.setVelocity(0, -this.baseSpeed);
        }
        else if (event.key.toLowerCase() === this.keyDownCode.toLowerCase() && !this.collided_bottom) {
            this.keyDownPushed = true;
            this.keyUpPushed = false;
            this.setVelocity(0, this.baseSpeed);
        }
    }

    onKeyUp(event) {
        if (event.key.toLowerCase() === this.keyUpCode.toLowerCase() && (this.keyUpPushed && !this.keyDownPushed)) {
            this.setVelocity(0, 0);
        }
        else if (event.key.toLowerCase() === this.keyDownCode.toLowerCase() && (this.keyDownPushed && !this.keyUpPushed)) {
            this.setVelocity(0, 0);
        }
    }

    onCollisionEnter_top(collider) {
        if (collider.name === "topWall") {
            this.collided_top = true;
            if (this.velocity_y < 0) {
                this.setVelocity(0,0);
            }
        }
    }

    onCollisionExit_top(collider) {
        if (collider.name === "topWall") {
            this.collided_top = false;
        }
    }

    onCollisionEnter_bottom(collider) {
        if (collider.name === "bottomWall") {
            this.collided_bottom = true;
            if (this.velocity_y > 0) {
                this.setVelocity(0,0);
            }
        }
    }

    onCollisionExit_bottom(collider) {
        if (collider.name === "bottomWall") {
            this.collided_bottom = false;
        }
    }
}