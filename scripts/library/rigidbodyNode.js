class RigidbodyNode extends RectangleCollider {
    constructor(l, t, w, h, vx, vy) {
        super(l, t, w, h);
        this.vx = vx;
        this.vy = vy;
    }

    collideRectangle(rectangle) {
        if (this.b < rectangle.t || this.t > rectangle.b || this.l > rectangle.r || this.r < rectangle.l)
            return;

        if (this.b >= rectangle.t && this.ob < rectangle.ot) {
            this.setBottom(rectangle.t - 0.1);
            this.vy = rectangle.vy;
        }
        else if (this.t <= rectangle.b && this.ot > rectangle.ob) {
            this.setTop(rectangle.b + 0.1);
            this.vy = rectangle.vy;
        }
        else if (this.r >= rectangle.l && this.or < rectangle.ol) {
            this.setRight(rectangle.l - 0.1);
            this.vx = rectangle.vx;
        }
        else if (this.l <= rectangle.r && this.ol > rectangle.or) {
            this.setLeft(rectangle.r + 0.1);
            this.vx = rectangle.vx;
        }
    }

    update(time) {
        this.ob = this.b;
        this.ot = this.t;
        this.ol = this.l;
        this.or = this.r;

        this.l += this.vx*time;
        this.t += this.vy*time;
        this.r = this.l + this.w;
        this.b = this.t + this.h;
    }
}