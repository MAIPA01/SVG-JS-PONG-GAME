class CollisionNode extends SVGNode {
    constructor(selector) {
        super(selector);
        this.colliders = [];
    }

    addBoxColider(collider) {
        this.colliders.push(collider);
    }

    checkCollision(colliderNode) {
        this.colliders.forEach((my_collider) => {
            colliderNode.colliders.forEach((other_collider) => {
                other_collider.collidesWith(my_collider);
                my_collider.collidesWith(other_collider);
            });
        });
    }
}