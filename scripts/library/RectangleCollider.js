class RectangleCollider {
    constructor(x, y, w, h, name) {
        this.x = x;
        this.y = y;
        
        this.w = w;
        this.h = h;

        this.contact_times = [];

        this.name = name;

        this.collisions = [];

        this.enterCollisions = [];
        this.stayCollisions = [];
        this.exitCollisions = [];
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

    addCollision(collider) {
        let is_old_collision = false;
        this.collisions.forEach((old_collider) => {
            if (old_collider == collider) {
                is_old_collision = true;
            }
        });

        if (!is_old_collision) {
            this.collisions.push(collider);
            this.enterCollisions.push(collider);
        }
        else {
            this.stayCollisions.push(collider);
        }
    }

    deleteCollision(collider) {
        let is_old_collision = false;
        this.collisions.forEach((old_collider) => {
            if (old_collider == collider) {
                is_old_collision = true;
            }
        });

        if (!is_old_collision) {
            this.collisions.splice(this.collisions.indexOf(collider), 1);
            this.exitCollisions.push(collider);
        }
    }

    doOnCollisionActions() {
        this.contact_times = [];

        this.enterCollisions.forEach((other_collider => {
            this.onCollisionEnter(other_collider);
        }));
        this.enterCollisions = [];

        this.stayCollisions.forEach((other_collider => {
            this.onCollisionStay(other_collider);
        }));
        this.stayCollisions = [];

        this.exitCollisions.forEach((other_collider => {
            this.onCollisionExit(other_collider);
        }));
        this.exitCollisions = [];
    }
}