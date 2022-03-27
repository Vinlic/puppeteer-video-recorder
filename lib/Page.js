const EventEmitter = require("events").EventEmitter;

const util = require("./util");

class Page extends EventEmitter {

    id = util.uniqueId("Page@");
    #target;
    #locked = false;

    constructor(target) {
        super();
        this.#target = target;
    }

    async init(options) {
        await this.#target.setViewport(options);
    }

    async load(url) {
        await this.#target.goto(url);
    }

    lock() {
        this.#locked = true;
    }

    unlock() {
        this.#locked = false;
    }

    isLocked() {
        return this.#locked;
    }

}

module.exports = Page;