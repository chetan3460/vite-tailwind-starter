export default class CustomContainer {
    constructor() {
        this.init();
    }

    init = () => {
        this.setDomMap();
        this.bindEvents();
    };

    setDomMap = () => {
        this.window = $(window);
        this.body = $("body");
    }

    bindEvents = () => {
        console.log(2345)
    }
}