const Recorder = require("./");

(async () => {
    const recorder = new Recorder({
        width: 1920,
        height: 1080,
        url: "https://www.bilibili.com/video/BV1hY411J7j5?spm_id_from=333.934.0.0"
    });
    await recorder.init();
    
    console.log("ok")
})()
.catch(err => console.error(err));