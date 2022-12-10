class TextNode extends SVGNode {
    constructor(selector) {
        super(selector);
    }

    get text(){
        return this.node.textContent;
    }

    set text(val) {
        this.node.textContent = val;
    }
}