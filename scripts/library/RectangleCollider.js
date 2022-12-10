class RectangleCollider {
    constructor(l, t, w, h) {
        this.l = this.ol = l;
        this.r = this.or = l + w;
        this.t = this.ot = t;
        this.b = this.ob = t + h;
        this.w = w;
        this.h = h;
    }

    setBottom(b) {this.b = b; this.t = b - this.h; }
    setLeft(l) {this.l = l; this.r = l + this.w; }
    setRight(r) {this.r = r; this.l = r - this.w; }
    setTop(t) {this.t = t; this.b = t + this.h; }
}