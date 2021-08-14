window.cttv = window.cttv || { state: {} };
window.cttv.pluginstate = null;
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

let icons = {};
let menus = {};

window.cttv.startCTTVTask = startCTTVTask;

if (window.cttv.dev) {
    /*<ICONS>*/
    /*<MENUS>*/
    if (window.cttv.devRemove) window.cttv.devRemove();
    if (window.cttvTask) {
        clearInterval(window.cttv.task);
        window.cttv.task = null;
    }
    startCTTVTask();
} else {
    fetch("https://raw.githubusercontent.com/cassiomaciell/CTTV/master/assets/icons.json")
        .then((res) => res.json())
        .then((j) => {
            icons = j;
        })
        .catch((err) => {
            window.cttv.pluginstate = "ICONSERROR";
            console.error(err);
        });
    fetch("https://raw.githubusercontent.com/cassiomaciell/CTTV/master/assets/menus.json")
        .then((res) => res.json())
        .then((j) => {
            menus = j;
        })
        .catch((err) => {
            window.cttv.pluginstate = "MENUSSERROR";
            console.error(err);
        });
}

function find(obj, key) {
    return obj[Object.keys(obj).filter((e) => e.startsWith(key))];
}

function getState(obj, key) {
    if (Object.hasOwnProperty.call(window.cttv.state, obj) && Object.hasOwnProperty.call(window.cttv.state[obj], key)) {
        return window.cttv.state[obj][key];
    }
    return null;
}
function setState(obj, key, value) {
    if (getState(obj, key) != null) {
        window.cttv.state[obj][key] = value;
    } else {
        window.cttv.state[obj] = {};
        window.cttv.state[obj][key] = value;
    }
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

/*
    @TODO msgs from JSON 
*/
function buildSimpleChatMsgButton(name, slots, text) {
    const btnOnClick = (e) => {
        setChatMessage(getChatMessage() + text);
        getChat().focus();
        if (e.shiftKey) {
            const chatSendButton = document.querySelector('[data-a-target="chat-send-button"]');
            if (chatSendButton) chatSendButton.click();
        }
    };
    return buildButton(name, slots, btnOnClick);
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

function buildButton(name, slots, onClick) {
    const btn = document.createElement("div");
    btn.id = "cttv-btn-" + name;
    btn.classList.add("cttv-btn");
    for (const render of find(icons[name], "renders")) {
        if (render.type == "img") {
            const imgElem = document.createElement("img");
            imgElem.src = find(render, "img");
            btn.appendChild(imgElem);
        } else if (render.type == "imgs") {
            for (const img of find(render, "imgs")) {
                const imgElem = document.createElement("img");
                imgElem.src = img;
                btn.appendChild(imgElem);
            }
        } else if (render.type == "pathlist") {
            const btnIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

            btnIconSvg.setAttribute("viewBox", "0 0 24 24");
            btnIconSvg.setAttribute("x", "0px");
            btnIconSvg.setAttribute("y", "0px");
            btnIconSvg.setAttribute("viewBox", "0 0 24 24");

            for (const path of find(render, "pathlist")) {
                const btnPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
                if (path.fill) btnPath.setAttribute("fill", path.fill);
                if (path.d) btnPath.setAttribute("d", path.d);
                btnIconSvg.appendChild(btnPath);
            }
            btn.appendChild(btnIconSvg);
        } else if (render.type == "text") {
            const text = document.createElement("div");
            text.classList.add("cttv-icon-text");
            text.classList.add("cttv-icon-text-" + render.text.length);
            text.innerText = render.text;
            btn.appendChild(text);
        }
    }

    btn.classList.add("cttv-btn-x" + slots);

    if (onClick) btn.addEventListener("click", onClick);

    return btn;
}

function init() {
    console.time("[CTTV] Init time");
    if (window.cttv.dev) {
        LOGGER.info("init");
    }

    const style = document.createElement("style");
    style.id = "cttv-style";
    const styleData = document.createTextNode(`/*<STYLE>*/`);
    style.appendChild(styleData);
    document.body.appendChild(style);

    /**
     * CTTV Root
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
     * Create Menus
     */
    let menuID = 1;
    for (const menuName of Object.keys(menus)) {
        const menuItems = [];
        for (const item of menus[menuName]) {
            switch (item.type) {
                case "SETSEND":
                    menuItems.push(buildSimpleChatMsgButton(item.name, find(item, "slots"), item.text));
                    break;
                case "ADD":
                    menuItems.push(
                        buildButton(item.name, find(item, "slots"), () => {
                            setChatMessage(getChatMessage() + item.text);
                            getChat().focus();
                        })
                    );
                    break;
                case "ADDORSET":
                    window.cttv.state[item.name] = item.max;
                    menuItems.push(
                        buildButton(item.name, find(item, "slots"), (e) => {
                            let text = "";
                            if (e.shiftKey) {
                                const t = window.cttv.state[item.name];
                                for (let i = 0; i < t; i++) {
                                    text += item.text + " ";
                                }
                                t == item.max ? (window.cttv.state[item.name] = item.min) : (window.cttv.state[item.name] = item.max);
                            } else {
                                text = getChatMessage() + item.text + " ";
                            }
                            setChatMessage(text);
                            getChat().focus();
                        })
                    );
                    break;
                case "SPECIAL00":
                    window.cttv.state[item.name] = {
                        lastMsg: 0,
                        msg: "",
                        blankCharInLast: false,
                    };
                    menuItems.push(
                        buildButton(item.name, find(item, "slots"), (e) => {
                            if (!e.shiftKey) return;
                            if (Date.now() - getState(item.name, "lastMsg") < 1000) return;
                            if (getChatMessage().length < 1) return;
                            if (getChatMessage().split(String.fromCharCode("0x2800")).join("").trim().length < 1) return;
                            const addBlank = !!getState(item.name, "blankCharInLast");
                            const currentMsg = getState(item.name, "msg") || getChatMessage();

                            if (currentMsg != getChatMessage()) setState(item.name, "msg", getChatMessage());

                            const msgToSend =
                                currentMsg + (currentMsg.endsWith(" ") ? "" : " ") + (addBlank ? "" : String.fromCharCode("0x2800"));

                            setChatMessage(msgToSend);
                            document.querySelector('[data-a-target="chat-send-button"]').click();
                            setState(item.name, "lastMsg", Date.now());
                            setChatMessage(currentMsg);
                            setState(item.name, "blankCharInLast", !addBlank);
                        })
                    );
                    break;
                default:
                    break;
            }
        }
        cttvMenus.appendChild(buildMenu(menuID++, menuItems, !cttvMenus.childElementCount));
    }

    cttvRoot.appendChild(cttvMenus);

    const loc = document.querySelector('[data-test-selector="chat-input-buttons-container"]');

    const menuController = document.createElement("div");
    menuController.id = "cttv-menu-controller";

    //Controllers

    function changeMenu(menuID) {
        const currentMenu = Number(cttvMenus.getAttribute("current-menu"));
        const newMenuElem = document.querySelector(`[menu="${menuID}"]`);
        if (newMenuElem) {
            const currentMenuElem = document.querySelector(`[menu="${currentMenu}"]`);
            currentMenuElem.setAttribute("visible", false);
            newMenuElem.setAttribute("visible", true);
            cttvMenus.setAttribute("current-menu", menuID);
        }
    }

    const btnUp = buildButton("upbtn", 1, (e) => updateMenu(e, -1));
    menuController.appendChild(btnUp);

    let lastMenuUpdateReq = 0;
    const updateMenu = (e, m) => {
        const currentMenu = Number(cttvMenus.getAttribute("current-menu"));

        const dbClick = Date.now() - lastMenuUpdateReq < 200;
        let newMenu = e.shiftKey || dbClick ? (m < 0 ? 1 : cttvMenus.childElementCount) : currentMenu + m;

        if (newMenu > cttvMenus.childElementCount) newMenu = 1;
        if (newMenu <= 0) newMenu = cttvMenus.childElementCount;

        if (currentMenu == newMenu) return;

        changeMenu(newMenu);
        lastMenuUpdateReq = Date.now();
    };

    const downBtn = buildButton("downbtn", 1, (e) => updateMenu(e, 1));
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

    console.timeEnd("[CTTV] Init time");
}

function tryInit() {
    if (window.cttv.pluginstate == "ICONSERROR" || window.cttv.pluginstate == "MENUSSERROR") {
        if (window.cttv.devRemove) cttv.devRemove();
        if (window.cttv.task) clearInterval(cttv.task);
        return false;
    }
    if (Object.keys(icons).length > 0) {
        const hasRoot = !!document.querySelector("#cttv-root");
        const chatInputExists = !!document.querySelector('[data-a-target="chat-input"]');
        const chatButtonIsDisabled = !!document.querySelector('[data-a-target="chat-send-button"][disabled]');
        const canAdd = chatInputExists && !hasRoot && !chatButtonIsDisabled;

        if (canAdd) init();

        return canAdd;
    }
    return false;
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
