
export default class LazyLoading {
    constructor() {
        this.setDomMap();
        this.bindEvents();
    };

    setDomMap = () => {
        this.blurredImageDiv = document.querySelectorAll(".blurred-img")
    };

    bindEvents = () => {
        this.blurredImageDiv.forEach((currentValue)=>{
            const img = currentValue.querySelector("img.lazy");
            if (img.complete) {
                this.loaded(img)
            } else {
                img.addEventListener("load", ()=>{
                    this.loaded(img)
                })
            }
        });
    }

    loaded = (img) => {
        img.parentElement.classList.add("loaded")
    }
}