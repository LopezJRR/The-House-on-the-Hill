class pauseMenu {
    constructor({onComplete}){
        this.onComplete = onComplete;
    }

    createElement(){
        this.element = document.createElement("div");
        this.element.classList.add("pauseMenu") 
        this.element.innerHTML = (`
            <h2>Pause Menu</h2>
        `)
            
    }

    init(container) {
        this.createElement();
        this.keyboardMenu = new KeyboardMenu({

        })
        this.keyboardMenu.init(this.element);
        this.keyboardMenu.setOptions([]);

        container.appendChild(this.element);

        this.esc = new KeyPressListener("Escape", () => {
            this.close();
        })

    }
}