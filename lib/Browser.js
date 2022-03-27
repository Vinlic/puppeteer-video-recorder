const EventEmitter = require("events").EventEmitter;

const puppeteer = require("puppeteer-core");

const Page = require("./Page");

const BROWSER_ARGS = [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-extensions",
    "--hide-scrollbars",
    "--use-gl=egl",
    "--no-zygote",
    "--autoplay-policy=no-user-gesture-require",
    "--disable-dinosaur-easter-egg",
    "--disable-web-security",
    "--enable-surface-synchronization",
    "--disable-threaded-animation",
    "--disable-threaded-scrolling",
    "--disable-checker-imaging",
    "--disable-new-content-rendering-timeout",
    "--disable-gpu",
    "--disable-image-animation-resync",
    "--enable-features=SurfaceSynchronization",
    "--enable-begin-frame-control",
    "--run-all-compositor-stages-before-draw",
];

class Browser extends EventEmitter {

    #config;
    #target;
    #pages = new Map();
    #launched = false;

    constructor(config) {
        super();
        this.#config = config;
    }

    async launch() {
        this.#target = await puppeteer.launch({
            product: "chrome",
            ignoreHTTPSErrors: true,
            headless: true,
            channel: this.#config.browser.channel,
            executablePath: this.#config.browser.executablePath,
            args: [
                ...BROWSER_ARGS,
                ...(this.#config.browser.args || [])
            ],

        });
        this.#launched = true;
    }

    async acquirePage(options = {}) {
        let page;
        for(let _page of this.#pages.values()) {
            if(!_page.isLocked) {
                page = _page;
                break;
            }
        }
        if(!page) {
            if(this.#pages.size >= this.#config.pages.max)
                throw new Error("browser page count reached the maximum");
            const target = await this.#target.newPage();
            page = new Page(target, options);
            await page.init();
            this.#registerPageEvents(page);
            this.#pages.set(page.id, page);
            this.emit("pageCreated", page);
        }
        page.lock();
        return page;
    }

    #registerPageEvents(page) {

    }

    get launched() {
        return this.#launched;
    }

}

module.exports = Browser;