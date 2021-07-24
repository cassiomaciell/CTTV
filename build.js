const fs = require("fs");
const prettier = require("prettier");
const terser = require("terser");

(async () => {
    const scriptData = fs.readFileSync("./src/script.js").toString();
    const styleData = fs.readFileSync("./src/style.css").toString();
    const iconsData = require("./src/icons.js");
    const templateData = fs.readFileSync("./src/template.js").toString();

    if (!fs.existsSync("./build/")) fs.mkdirSync("build");

    let code = scriptData;

    code = code.split("/*<STYLE>*/").join(styleData);
    code = code.split("/*<STATE>*/").join("window.cttv.dev = false;");
    code = code.split("/*<ICONS>*/").join("");
    code = (await terser.minify(code, { toplevel: true, mangle: { properties: true } })).code;
    code = templateData.split("/*<CODE>*/").join(code);
    code = prettier.format(code, { useTabs: true, parser: "babel", semi: true, printWidth: 120 });
    fs.writeFileSync("./build/cttv.user.js", code);
    fs.writeFileSync("current.js", code);

    if (!fs.existsSync("./assets")) fs.mkdirSync("./assets");
    fs.writeFileSync("./assets/icons.json", prettier.format(JSON.stringify(iconsData.icons), { useTabs: true, parser: "json", semi: true, printWidth: 120 }));
})();
