class RigidbodyNode extends SVGNode {
    constructor(selector) {
        super(selector);

        this.vel_x = 0;
        this.vel_y = 0;

        this.real_vel_x = 0;
        this.real_vel_y = 0;

        this.colliders = [];
    }

    collidePoint(x, y) {
        return (x >= this.collider.x && y >= this.collider.y && x < this.collider.x + this.collider.w && y < this.collider.y + this.collider.h);
    }

    collideRectangle(other) {
        return (this.collider.x < other.x + other.w && this.collider.x + this.collider.w > other.x &&
            this.collider.y < other.y + other.h && this.collider.y + this.collider.h > other.y);
    }

    collideRay(origin, dir, other, contact_point, contact_normal, t_hit_near) {
        let t_near = { x: (other.x - origin.x) / dir.x, y: (other.y - origin.y) / dir.y };
        let t_far = { x: (other.x + other.w - origin.x) / dir.x, y: (other.y + other.h - origin.y) / dir.y };

        if (isNaN(t_far.x) || isNaN(t_far.y)) return false;
        if (isNaN(t_near.x) || isNaN(t_near.y)) return false;

        if (t_near.x > t_far.x) {
            let temp = t_near.x;
            t_near.x = t_far.x;
            t_far.x = temp;
        }
        if (t_near.y > t_far.y) {
            let temp = t_near.y;
            t_near.y = t_far.y;
            t_far.y = temp;
        }

        if (t_near.x > t_far.y || t_near.y > t_far.x) return false;

        t_hit_near = Math.max(t_near.x, t_near.y);
        let t_hit_far = Math.min(t_far.x, t_far.y);

        if (t_hit_far < 0) return false;

        contact_point = {x: origin.x + t_hit_near.x * dir.x, y: origin.y + t_hit_near.y * dir.y};

        if (t_near.x < t_near.y) {
            if (dir.x < 0)
                contact_normal = {x: 1, y: 0 };
            else
                contact_normal = {x: -1, y: 0 };
        }
        else if (t_near.x < t_near.y) {
            if (dir.y < 0) {
                contact_normal = {x: 0, y: 1};
            }
            else {
                contact_normal = {x: 0, y: -1};
            }
        }

        return true;
    }

    collideDynamicRect(colIn, colInVel, other, contact_point, contact_normal, contact_time, elapsedTime) {
        if (colInVel.x == 0 && colInVel.y == 0) {
            return false;
        }

        if (other == null) {
            return false;
        }
        
        let expandedOther = new RectangleCollider(other.x - colIn.w / 2, other.y - colIn.h / 2, other.w + colIn.w, other.h + colIn.h);
        
        if (this.collideRay({x: colIn.x + colIn.w / 2, y: colIn.y + colIn.h / 2}, {x: colInVel.x * elapsedTime, y: colInVel.y * elapsedTime}, expandedOther, contact_point, contact_normal, contact_time)) {
            if (contact_time <= 1.0) {
                return true;
            } 
        }

        return false;
    }

    collidesWith(other, elapsedTime) {
        this.colliders.forEach((collider) => {
            other.colliders.forEach((other_collider) => {
                let cp = 0;
                let cn = 0;
                let ct = 0;
                if (this.collideDynamicRect(collider, {x: this.vel_x, y: this.vel_y }, other_collider, cp, cn, ct, elapsedTime)) {
                    collider.contact_times.push({collider: other_collider, contactTime: ct});
                    collider.addCollision(other_collider);
                }
                else {
                    collider.deleteCollision(other_collider);
                }
            });
            collider.contact_times.sort((a, b) => {a.ct < b.ct});
        });

        this.colliders.sort((a, b) => {
            if (a.contact_times.length > 0 && b.contact_times.length) {
                return a.contact_times[0].ct < b.contact_times[0].ct
            }
            return true;
        });
    }

    move(elapsedTime) {
        this.real_vel_x = this.vel_x;
        this.real_vel_y = this.vel_y;

        this.colliders.forEach((collider) => {
            collider.contact_times.forEach((contact) => {
                let cp, cn, ct;
                if (this.collideDynamicRect(this.collider, contact.collider, cp, cn, ct, elapsedTime)) {
                    this.real_vel_x = this.vel_x + cn * Math.abs(this.vel_x) * (1-ct);
                    this.real_vel_y = this.vel_y + cn * Math.abs(this.vel_y) * (1-ct);
                }
            });
        });

        let x_dif = this.real_vel_x * elapsedTime;
        let y_dif = this.real_vel_y * elapsedTime;
        
        this.colliders.forEach((collider) => {
            collider.x += x_dif;
            collider.y += y_dif;
        });

        this.x += x_dif;
        this.y += y_dif;

        this.colliders.forEach((collider) => {
            collider.doOnCollisionActions();
        });
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
        this.vel_x = v_x;
        this.vel_y = v_y;
    }

    setAngleVelocity(velocity, euralAngel) {
        let radians = (euralAngel * Math.PI ) / 180;
        this.vel_x = Math.cos(radians) * velocity;
        this.vel_y = -Math.sin(radians) * velocity;
    }

    get speed() {
        return Math.sqrt(this.vel_x*this.vel_x + this.vel_y*this.vel_y);
    }

    get real_speed() {
        return Math.sqrt(this.real_vel_x*this.real_vel_x + this.real_vel_y*this.real_vel_y);
    }

    addColider(collider) {
        this.colliders.push(collider);
    }
}