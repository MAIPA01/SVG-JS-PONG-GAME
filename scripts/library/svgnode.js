class SVGNode {
    constructor(selector) {
        this.node = document.querySelector(selector);
    }

    get(attrName) {
        return this.node.getAttribute(attrName)
    }

    set(attrName, value) {
        return this.node.setAttribute(attrName, value);
    }

    get x() {
        return Number(this.get("x"));
    }

    set x(value) {
        this.set("x", value);
    }

    get y() {
        return Number(this.get("y"));
    }

    set y(value) {
        this.set("y", value);
    }

    get width() {
        return Number(this.get("width"));
    }

    set width(value) {
        this.set("width", value);
    }

    get height() {
        return Number(this.get("height"));
    }

    set height(value) {
        this.set("height", value);
    }
}
