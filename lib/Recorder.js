const EventEmitter = require("events").EventEmitter;

const config = require("../config");
const Browser = require("./Browser");
const browser = new Browser(config);

class Recorder extends EventEmitter {

    width;
    height;
    url;
    #pageOptions;
    #page;

    constructor(options = {}) {
        super();
        this.width = options.width;
        this.height = options.height;
        this.url = options.url;
        this.#pageOptions = options.page;
    }

    async init() {
        if(!browser.launched)
            await browser.launch();
        this.#page = await browser.acquirePage({
            width: this.width,
            height: this.height,
            ...this.#pageOptions
        });
        await this.#page.load(this.url);
    }



}

module.exports = Recorder;