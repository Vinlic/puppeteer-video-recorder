const EventEmitter = require("events").EventEmitter;

class Page extends EventEmitter {

    #target;
    #options;
    #locked = false;

    constructor(target, options = {}) {
        super();
        this.#target = target;
        this.#options = options;
    }

    async init() {
        await this.#target.setViewport(this.#options);
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