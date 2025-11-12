class Section {
    constructor({items, renderer, containerSelector}) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
        
    }

    renderItems(){
        this._items.forEach(item => {
            //call the renderer and pass it the item as argument
            this.addItem(this._renderer(item));
        });
    }

    addItem(element){
        this._container.prepend(element);
    }

    
}

export default Section;