class BoxCollider {
    constructor(x, y, width, height, name) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.name = name;

        this.collisions = [];
    }

    onCollisionEnter(collider) {
        return;
    }

    onCollisionStay(collider) {
        return;
    }

    onCollisionExit(collider) {
        return;
    }

    updateCollisionsTable() {
        this.collisions.forEach((collider) => {
            if (!this.isCollision(collider)) {
                this.collisions.splice(this.collisions.indexOf(collider), 1);
                this.onCollisionExit(collider);
            }
        });
    }

    isCollision(collider) {
        let is_collision = this.x + this.width/2 >= collider.x - collider.width/2; // left-edge
        is_collision = is_collision && this.x - this.width/2 <= collider.x + collider.width/2; // right-edge
        is_collision = is_collision && this.y + this.height/2 >= collider.y - collider.height/2; // top-edge
        is_collision = is_collision && this.y - this.height/2 <= collider.y + collider.height/2; // bottom-edge

        return is_collision;
    }

    collidesWith(collider) {
        let is_collision = this.isCollision(collider);

        if (is_collision) {
            let is_old_collision = false;
            this.collisions.forEach((old_collider) => {
                if (old_collider == collider) {
                    is_old_collision = true;
                }
            });

            if (!is_old_collision) {
                this.onCollisionEnter(collider);
                this.collisions.push(collider);
            }
            else {
                this.onCollisionStay(collider);
            }
        }

        this.updateCollisionsTable();

        return is_collision;
    }
}