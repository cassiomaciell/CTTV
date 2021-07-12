window.cttv = window.cttv || {};

/*<STATE>*/

const LOGGER = {
    info: (t, dev = window.cttv.dev) => {
        if (dev) console.info("[CTTV] Info:", t);
    },
    log: (t, dev = window.cttv.dev) => {
        if (dev) console.log("[CTTV] Log:", t);
    },
    error: (t, dev = window.cttv.dev) => {
        if (dev) console.error("[CTTV] Log:", t);
    },
    warn: (t, dev = window.cttv.dev) => {
        if (dev) console.warn("[CTTV] Warn:", t);
    },
};

const icons = {};

if (window.cttv.dev) {
    if (window.cttv.devRemove) window.cttv.devRemove();
    if (window.cttvTask) {
        clearInterval(window.cttv.task);
        window.cttv.task = null;
    }
    startCTTVTask();
}

function find(obj, key) {
    return obj[Object.keys(obj).filter((e) => e.startsWith(key))];
}

const getChat = () => document.querySelector('[data-a-target="chat-input"]');

/**
 *
 * @returns {String}
 */
const getChatMessage = () => getChat().value;

function getChatInstance() {
    return find(getChat(), "__reactInternalInstance$");
}

function setChatMessage(text) {
    const chatTextArea = getChat();
    chatTextArea.value = text;
    const instance = getChatInstance();
    if (!instance) return;
    const props = find(instance, "memoizedProps");
    const onChange = find(props, "onChange");
    if (props && onChange) {
        onChange({
            target: chatTextArea,
        });
    }
}

function buildSimpleChatMsgButton(name, slots, icon, text) {
    const btnOnClick = (e) => {
        setChatMessage(getChatMessage() + text);
        getChat().focus();
        if (e.shiftKey) {
            const chatSendButton = document.querySelector('[data-a-target="chat-send-button"]');
            if (chatSendButton) chatSendButton.click();
        }
    };

    return buildButton(name, slots, icon, [], btnOnClick);
}

/**
 *
 * @param {number | string} id
 * @param {Array<HTMLElement>} childNodes
 * @returns
 */
function buildMenu(id, childNodes, visible = false) {
    const cttvMenu = document.createElement("div");
    cttvMenu.id = "cttv-menu-" + id;
    cttvMenu.classList.add("cttv-menu");
    cttvMenu.setAttribute("menu", id);
    cttvMenu.setAttribute("visible", visible);

    for (const child of childNodes) {
        cttvMenu.appendChild(child);
    }
    return cttvMenu;
}

/**
 *
 * @param {Array<any>} pathList
 * @param {Function} onClick
 */
function buildButton(name, slots, imgOrImgs, pathList, onClick) {
    const btn = document.createElement("div");

    btn.id = "cttv-btn-" + name;
    btn.classList.remove(btn.classList[1]);
    btn.classList.add("cttv-btn");
    if (slots) btn.classList.add("cttv-btn-x" + slots);
    /**
     * @type {SVGAElement}
     */
    if (!imgOrImgs) {
        const btnIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        btnIconSvg.setAttribute("viewBox", "0 0 24 24");
        btnIconSvg.setAttribute("x", "0px");
        btnIconSvg.setAttribute("y", "0px");
        btnIconSvg.setAttribute("viewBox", "0 0 24 24");

        for (const path of pathList) {
            const btnPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            if (path.fill) btnPath.setAttribute("fill", path.fill);
            if (path.d) btnPath.setAttribute("d", path.d);
            btnIconSvg.appendChild(btnPath);
        }
        btn.appendChild(btnIconSvg);
    } else if (slots == 1) {
        const imgElem = document.createElement("img");
        imgElem.src = imgOrImgs;
        btn.appendChild(imgElem);
    } else if (slots > 1) {
        for (const img of imgOrImgs) {
            const imgElem = document.createElement("img");
            imgElem.src = img;
            btn.appendChild(imgElem);
        }
    }

    btn.addEventListener("click", onClick);
    return btn;
}

function init() {
    if (window.cttv.dev) {
        LOGGER.info("init");
    }

    const style = document.createElement("style");
    style.id = "cttv-style";
    const styleData = document.createTextNode(`/*<STYLE>*/`);
    style.appendChild(styleData);
    document.body.appendChild(style);

    /**
     * Menu 1
     */
    let menu1ChildNodes = [];

    /**
     * Blank char BTN
     */
    const blankOnClick = () => {
        setChatMessage(getChatMessage() + String.fromCharCode("0x2800"));
        getChat().focus();
    };

    menu1ChildNodes.push(buildButton("blank", 1, null, icons.blank.pathlist, blankOnClick));

    /**
     * I ENJOYED MY STAY xqcL BTN
     */
    (() => {
        let t = 8;
        const xqcLOnClick = (e) => {
            let text = "";
            if (e.shiftKey) {
                for (let i = 0; i < t; i++) {
                    text += "I ENJOYED MY STAY xqcL ";
                }
                t == 8 ? (t = 7) : (t = 8);
            } else {
                text = getChatMessage() + "I ENJOYED MY STAY xqcL ";
            }
            setChatMessage(text);
            getChat().focus();
        };
        menu1ChildNodes.push(buildButton("xqcl", 1, icons.xqcl.img, [], xqcLOnClick));
    })();

    /**
     * PepegaChat
     */

    (() => {
        let msg = "";
        let blankCharInLast = false;
        let lastMsg = 0;
        const pepegachatOnClick = (e) => {
            if (
                !e.shiftKey ||
                Date.now() - lastMsg < 1000 ||
                getChatMessage().length < 1 ||
                getChatMessage().split(String.fromCharCode("0x2800")).join("").trim().length < 1
            )
                return;
            if (msg != getChatMessage()) {
                msg = getChatMessage();
            }
            const msgToSend = msg + (msg.endsWith(" ") ? "" : " ") + (blankCharInLast ? "" : String.fromCharCode("0x2800"));
            setChatMessage(msgToSend);
            document.querySelector('[data-a-target="chat-send-button"]').click();
            lastMsg = Date.now();
            setChatMessage(msg);
            blankCharInLast = !blankCharInLast;
        };
        menu1ChildNodes.push(buildButton("pepegachat", 1, icons.pepegachat.img, [], pepegachatOnClick));
    })();

    /**
     * Menu 2
     */

    /**
     * TeaTime
     */

    let menuTeaTimeChildNodes = [];

    menuTeaTimeChildNodes.push(buildSimpleChatMsgButton("tfteatime", 2, icons.tfteatime.imgs, ":tf: TeaTime "));
    menuTeaTimeChildNodes.push(buildSimpleChatMsgButton("pepelaughteatime", 2, icons.pepelaughteatime.imgs, "PepeLaugh TeaTime "));

    /**
     * Clap
     */

    let menuClapChildNodes = [];
    menuClapChildNodes.push(buildSimpleChatMsgButton("ayayaclap", 2, icons.ayayaclap.imgs, "AYAYA Clap "));
    menuClapChildNodes.push(buildSimpleChatMsgButton("tfclap", 2, icons.tfclap.imgs, ":tf: Clap "));
    menuClapChildNodes.push(buildSimpleChatMsgButton("wickedclap", 2, icons.wickedclap.imgs, "WICKED Clap "));
    menuClapChildNodes.push(buildSimpleChatMsgButton("ezclap", 2, icons.ezclap.imgs, "EZ Clap "));
    menuClapChildNodes.push(buildSimpleChatMsgButton("feelsstrongmanclap", 2, icons.feelsstrongmanclap.imgs, "FeelsStrongMan Clap "));
    menuClapChildNodes.push(buildSimpleChatMsgButton("omegalulclap", 2, icons.omegalulclap.imgs, "OMEGALUL Clap "));
    menuClapChildNodes.push(buildSimpleChatMsgButton("feelsgoodmanclap", 2, icons.feelsgoodmanclap.imgs, "FeelsGoodMan Clap "));

    /**
     * Misc
     */

    let menuMiscChildNodes = [];

    menuMiscChildNodes.push(buildSimpleChatMsgButton("xqctechnoppoverheat ", 2, icons.xqctechnoppoverheat.imgs, "xqcTechno ppOverheat "));
    menuMiscChildNodes.push(buildSimpleChatMsgButton("tfpinching", 2, icons.tfpinching.imgs, ":tf: 🤏 "));
    menuMiscChildNodes.push(buildSimpleChatMsgButton("pistolayaya", 2, icons.pistolayaya.imgs, "🔫 AYAYA "));
    menuMiscChildNodes.push(buildSimpleChatMsgButton("nampistolayaya", 2, icons.nampistolayaya.imgs, "NaM 🔫 AYAYA "));

    /**
     * Add CTTV Root
     */

    const cttvRoot = document.createElement("div");
    cttvRoot.id = "cttv-root";

    /**
     * Create menus container
     */

    const cttvMenus = document.createElement("div");
    cttvMenus.id = "cttv-menus";
    cttvMenus.setAttribute("current-menu", "1");

    /**
     * Add CTTV Menus
     */
    const cttvMenu1 = buildMenu("1", menu1ChildNodes, true);
    const cttvMenu2 = buildMenu("2", menuTeaTimeChildNodes, false);
    const cttvMenu3 = buildMenu("3", menuClapChildNodes, false);
    const cttvMenu4 = buildMenu("4", menuMiscChildNodes, false);

    cttvMenus.appendChild(cttvMenu1);
    cttvMenus.appendChild(cttvMenu2);
    cttvMenus.appendChild(cttvMenu3);
    cttvMenus.appendChild(cttvMenu4);

    cttvRoot.appendChild(cttvMenus);

    const loc = document.querySelector('[data-test-selector="chat-input-buttons-container"]');

    const menuController = document.createElement("div");
    menuController.id = "cttv-menu-controller";

    //Controllers

    function changeMenu(newMenu) {
        const currentMenu = Number(cttvMenus.getAttribute("current-menu"));
        const newMenuElem = document.querySelector(`[menu="${newMenu}"]`);
        if (newMenuElem) {
            const currentMenuElem = document.querySelector(`[menu="${currentMenu}"]`);
            currentMenuElem.setAttribute("visible", false);
            newMenuElem.setAttribute("visible", true);
            cttvMenus.setAttribute("current-menu", newMenu);
        }
    }

    /**
     * btnUp
     */
    const upBtnOnClick = () => {
        const currentMenu = Number(cttvMenus.getAttribute("current-menu"));
        const newMenu = currentMenu - 1;
        changeMenu(newMenu);
    };

    const btnUp = buildButton("down", 1, null, icons.upbtn.pathlist, upBtnOnClick);
    menuController.appendChild(btnUp);

    /**
     * downBtn
     */
    const downBtnOnClick = () => {
        const currentMenu = Number(cttvMenus.getAttribute("current-menu"));
        const newMenu = currentMenu + 1;
        changeMenu(newMenu);
    };

    const downBtn = buildButton("down", 1, null, icons.downbtn.pathlist, downBtnOnClick);
    menuController.appendChild(downBtn);

    cttvRoot.appendChild(menuController);

    loc.parentNode.appendChild(cttvRoot);

    /**
     * dev things
     */
    if (window.cttv.dev) {
        window.cttv.changeMenu = changeMenu;
        changeMenu(1);
        window.cttv.devRemove = () => {
            cttvRoot.remove();
            style.remove();
        };
    }
}

function tryInit() {
    const hasRoot = !!document.querySelector("#cttv-root");
    const chatInputExists = !!document.querySelector('[data-a-target="chat-input"]');
    const chatButtonIsDisabled = !!document.querySelector('[data-a-target="chat-send-button"][disabled]');
    const canAdd = chatInputExists && !hasRoot && !chatButtonIsDisabled;

    if (canAdd) init();

    return canAdd;
}

function startCTTVTask() {
    if (window.cttv.task) clearInterval(window.cttv.task);
    let lastPathname = "";
    window.cttv.task = setInterval(() => {
        const currentPathname = window.location.pathname;
        let shouldTryInit = currentPathname != lastPathname || !document.querySelector("#cttv-root");
        lastPathname = currentPathname;
        if (shouldTryInit) {
            tryInit();
            LOGGER.info("try init from task");
        }
    }, 500);
}

document.addEventListener("readystatechange", () => {
    if (document.readyState == "complete") {
        tryInit();
        LOGGER.info("try init from readystatechange");
        startCTTVTask();
    }
});
