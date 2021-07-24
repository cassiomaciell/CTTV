const emotes = {
    teatime: "https://cdn.betterttv.net/emote/56f6eb647ee3e8fc6e4fe48e/3x",
    clap: "https://cdn.betterttv.net/emote/55b6f480e66682f576dd94f5/3x",
    ayaya: "https://cdn.frankerfacez.com/emoticon/162146/4",
    tf: "https://cdn.betterttv.net/emote/54fa8f1401e468494b85b537/3x",
    nymnCorn: "https://cdn.betterttv.net/emote/56cb56f5500cb4cf51e25b90/3x",
    forsencd: "https://cdn.frankerfacez.com/emote/249060/4",
};

const icons = {
    blank: {
        renders: [
            {
                type: "pathlist",
                pathlist: [
                    {
                        d: "M0 0h24v24H0z",
                        fill: "none",
                    },
                    {
                        d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z",
                        fill: "#a970ff",
                    },
                ],
            },
        ],
    },
    xqcl: {
        renders: [
            {
                type: "img",
                img: "https://i.imgur.com/g0jL1jy.png",
            },
        ],
    },
    pepegachat: {
        renders: [
            {
                type: "img",
                img: "https://cdn.betterttv.net/emote/5f2e77591ab9be446c4e8d9b/3x",
            },
        ],
    },
    upbtn: {
        renders: [
            {
                type: "pathlist",
                pathlist: [
                    {
                        d: "M0 0h24v24H0V0z",
                        fill: "none",
                    },
                    {
                        d: "M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z",
                        fill: "#a970ff",
                    },
                ],
            },
        ],
    },
    downbtn: {
        renders: [
            {
                type: "pathlist",
                pathlist: [
                    {
                        d: "M24 24H0V0h24v24z",
                        fill: "none",
                    },
                    {
                        d: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z",
                        fill: "#a970ff",
                    },
                ],
            },
        ],
    },
    tfteatime: {
        renders: [
            {
                type: "imgs",
                imgs: [emotes.tf, emotes.teatime],
            },
        ],
    },
    tfpinching: {
        renders: [
            {
                type: "imgs",
                imgs: [emotes.tf, "https://cdn.frankerfacez.com/static/emoji/images/twemoji/1f90f.png"],
            },
        ],
    },
    tfclap: {
        renders: [
            {
                type: "imgs",
                imgs: [emotes.tf, emotes.clap],
            },
        ],
    },
    ayayaclap: {
        renders: [
            {
                type: "imgs",
                imgs: [emotes.ayaya, emotes.clap],
            },
        ],
    },
    xqctechnoppoverheat: {
        renders: [
            {
                type: "imgs",
                imgs: ["https://cdn.betterttv.net/emote/5ef4b2b2f58ddc0de9888b61/3x", "https://cdn.betterttv.net/emote/5b3e953a2c8a38720760c7f7/3x"],
            },
        ],
    },
    wickedclap: {
        renders: [
            {
                type: "imgs",
                imgs: ["https://cdn.frankerfacez.com/emote/457124/4", emotes.clap],
            },
        ],
    },
    pepelaughteatime: {
        renders: [
            {
                type: "imgs",
                imgs: ["https://cdn.frankerfacez.com/emoticon/263833/1", emotes.teatime],
            },
        ],
    },
    ezclap: {
        renders: [
            {
                type: "imgs",
                imgs: ["https://cdn.betterttv.net/emote/5590b223b344e2c42a9e28e3/3x", emotes.clap],
            },
        ],
    },
    feelsstrongmanclap: {
        renders: [
            {
                type: "imgs",
                imgs: ["https://cdn.frankerfacez.com/emoticon/64210/1", emotes.clap],
            },
        ],
    },
    omegalulclap: {
        renders: [
            {
                type: "imgs",
                imgs: ["https://cdn.frankerfacez.com/emote/128054/1", emotes.clap],
            },
        ],
    },
    feelsgoodmanclap: {
        renders: [
            {
                type: "imgs",
                imgs: ["https://cdn.betterttv.net/emote/566c9fde65dbbdab32ec053e/3x", emotes.clap],
            },
        ],
    },
    pistolayaya: {
        renders: [
            {
                type: "imgs",
                imgs: ["https://cdn.frankerfacez.com/static/emoji/images/twemoji/1f52b.png", emotes.ayaya],
            },
        ],
    },
    nampistolayaya: {
        renders: [
            {
                type: "imgs",
                imgs: ["https://cdn.betterttv.net/emote/566ca06065dbbdab32ec054e/3x", "https://cdn.frankerfacez.com/static/emoji/images/twemoji/1f52b.png", emotes.ayaya],
            },
        ],
    },
    monkawnymncorn: {
        renders: [
            {
                type: "imgs",
                imgs: ["https://cdn.frankerfacez.com/emote/214681/4", emotes.nymnCorn],
            },
        ],
    },
    forsencdvictory: {
        renders: [
            {
                type: "imgs",
                imgs: [emotes.forsencd, "https://cdn.frankerfacez.com/static/emoji/images/twemoji/270c.png"],
            },
        ],
    },
    forsencdclap: {
        renders: [
            {
                type: "imgs",
                imgs: [emotes.forsencd, emotes.clap],
            },
        ],
    },
    forsencdnice: {
        renders: [
            {
                type: "imgs",
                imgs: [emotes.forsencd],
            },
            {
                type: "text",
                text: "nice",
            },
        ],
    },
};

module.exports = {
    emotes,
    icons
}