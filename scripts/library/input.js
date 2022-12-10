class Input extends SVGNode{
    constructor(selector, inputHandlerObj = null, placeHolderText="") {
        super(selector);

        this.typed = false;
        this.typedValue = "";
        this.focused = false;

        this.textValue = this.textContent;
        this.color = "#FFFFFF";

        this.placeHolderText = placeHolderText;
        this.placeHolderColor = "#888888";

        if (inputHandlerObj != null) {
            inputHandlerObj.node.onclick = (event) => this.focused = true;
        }
        this.node.onclick = (event) => this.focused = true;

        document.addEventListener('keydown', (event) => this.onKeyDown(event), false);
    }

    onEnter() {
        return;
    }

    setPlaceHolderColor(val) {
        this.placeHolderColor = val;
    }

    setColor(val) {
        this.color = val;
    }

    onKeyDown(event) {
        if (event.keyCode === 9){
            return;
        }
        else if (event.keyCode >= 16 && event.keyCode <= 31) {
            return;
        }
        else if (event.keyCode >= 33 && event.keyCode <= 45) {
            return;
        }
        else if (event.keyCode >= 91 && event.keyCode <= 93) {
            return;
        }
        else if (event.keyCode >= 106 && event.keyCode <= 222) {
            return;
        }
    
        this.typed = true;
        let extraKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "!", "@", 
                        "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "=", "-", 
                        "[", "]", "{", "}", ":", ";" , "?", "/", ".", ">", ",", "<",
                        "~", "\\", "\`", "\'", "\""];
        if (event.keyCode === 8) {
            this.typedValue = 'back';
            return;
        }
        else if (event.keyCode === 13) {
            this.typedValue = 'enter';
            return;
        }
        else if (event.keyCode === 32) {
            this.typedValue = 'space';
            return;
        }
    
        if ((event.key >= 'A' && event.key <= 'Z') || (event.key >= 'a' && event.key <= 'z')) {
            this.typedValue = event.key;
            return;
        }

        let is_in_keys = false;
        extraKeys.forEach((key) => {
            if (key == event.key){
                is_in_keys = true;
            }
        });
        if (is_in_keys){
            this.typedValue = event.key;
            return;
        }

        this.typed = false;
    }

    updateInputContent() {
        if (this.typedValue === 'back') {
            this.textValue = this.textValue.slice(0, -1);
            return;
        }
        else if (this.typedValue === 'space') {
            this.textValue += " ";
            return;
        }
        else if (this.typedValue === 'enter') {
            this.focused = false;
            this.onEnter();
            return;
        }
        else {
            this.textValue += this.typedValue;
            return;
        }
    }

    updateUI() {
        if (this.textValue === "") {
            this.textContent = this.placeHolderText;
            this.set("fill", this.placeHolderColor);
        }
        else {
            this.textContent = this.textValue;
            this.set("fill", this.color);
        }

        if (!this.focused) {
            this.typed = false;
            return;
        }

        if (this.typed) {
            this.typed = false;
            this.updateInputContent();
        }
    }

    get textContent () {
        return this.node.textContent;
    }

    set textContent (newText) {
        this.node.textContent = newText;
    }
}