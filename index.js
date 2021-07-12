const WebSocket = require("ws");
const fs = require("fs");
const prettier = require("prettier");
const terser = require("terser");

const wss = new WebSocket.Server({ port: 7722 });

wss.on("connection", function connection(ws) {
    let lastScript = "";
    let lastStyle = "";
    let lastIcons = "";
    let lastTemplate = "";
    setInterval(async () => {
        const scriptData = fs.readFileSync("./src/script.js").toString();
        const styleData = fs.readFileSync("./src/style.css").toString();
        const iconsData = fs.readFileSync("./src/icons.js").toString();
        const templateData = fs.readFileSync("./src/template.js").toString();
        if (
            (styleData && styleData != lastStyle) ||
            (scriptData && scriptData != lastScript) ||
            (iconsData && iconsData != lastIcons) ||
            (templateData && templateData != lastTemplate)
        ) {
            lastScript = scriptData;
            lastStyle = styleData;
            lastIcons = iconsData;
            lastTemplate = templateData;

            console.log(new Date().toTimeString(), "Sending new code");

            let code = scriptData.split("/*<STYLE>*/").join(styleData);
            code = code.split("/*<STATE>*/").join("window.cttv.dev = true;");
            code = code.split("const icons = {};").join(iconsData);
            code = (await terser.minify(code, { toplevel: true, mangle: { properties: true } })).code;
            code = templateData.split("/*<CODE>*/").join(code);
            code = prettier.format(code, { useTabs: true, parser: "babel", semi: true, printWidth: 120 });

            const runCodeData = {
                type: "run-code",
                code,
            };
            ws.send(JSON.stringify(runCodeData));
            fs.writeFileSync("current.js", code);
        }
    }, 500);
});