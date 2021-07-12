(function () {
    let ws = new WebSocket("ws://localhost:7722");
    ws.addEventListener("message", (ev) => {
        const event = JSON.parse(ev.data);
        if (event) {
            if (event.type == "run-code") {
                console.log(new Date().toTimeString(), "Running new code");
                eval(event.code);
            }
        }
    });
})();
