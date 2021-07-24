const menus = {
    main: [
        { name: "blank", type: "ADD", slots: 1, text: String.fromCharCode("0x2800") },
        { name: "pepegachat", type: "SPECIAL00", slots: 1, text: "I ENJOYED MY STAY xqcL" },
        { name: "xqcl", type: "ADDORSET", min: 7, max: 8, slots: 3, text: "I ENJOYED MY STAY xqcL" },
    ],
    teatime: [
        { name: "tfteatime", type: "SETSEND", slots: 2, text: ":tf: TeaTime " },
        { name: "pepelaughteatime", type: "SETSEND", slots: 2, text: "PepeLaugh TeaTime " },
    ],
    clap: [
        { name: "ayayaclap", type: "SETSEND", slots: 2, text: "AYAYA Clap " },
        { name: "tfclap", type: "SETSEND", slots: 2, text: ":tf: Clap " },
        { name: "wickedclap", type: "SETSEND", slots: 2, text: "WICKED Clap " },
        { name: "ezclap", type: "SETSEND", slots: 2, text: "EZ Clap " },
        {
            name: "feelsstrongmanclap",
            type: "SETSEND",
            slots: 2,
            text: "FeelsStrongMan Clap ",
        },
        { name: "omegalulclap", type: "SETSEND", slots: 2, text: "OMEGALUL Clap " },
        { name: "feelsgoodmanclap", type: "SETSEND", slots: 2, text: "FeelsGoodMan Clap " },
        { name: "forsencdclap", type: "SETSEND", slots: 2, text: "forsenCD Clap " },
    ],
    misc: [
        {
            name: "xqctechnoppoverheat",
            type: "SETSEND",
            slots: 2,
            text: "xqcTechno ppOverheat ",
        },
        { name: "tfpinching", type: "SETSEND", slots: 2, text: ":tf: 🤏 " },
        { name: "pistolayaya", type: "SETSEND", slots: 2, text: "🔫 AYAYA " },
        { name: "monkawnymncorn", type: "SETSEND", slots: 2, text: "monkaW nymnCorn " },
        { name: "forsencdnice", type: "SETSEND", slots: 2, text: "forsenCD nice " },
        { name: "forsencdvictory", type: "SETSEND", slots: 2, text: "forsenCD ✌️ " },
        { name: "nampistolayaya", type: "SETSEND", slots: 3, text: "NaM 🔫 AYAYA " },
    ],
};

module.exports = {
    menus,
};
