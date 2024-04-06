import { Application } from "pixi.js";

(async () => {
    const app = new Application();
    await app.init({ background: "#660044", resizeTo: window });
    document.body.appendChild(app.canvas);
})();
