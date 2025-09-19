(function() {
    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function loadjQuery() {
        if (window.jQuery) return window.jQuery;
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
            script.onload = () => resolve(window.jQuery);
            script.onerror = () => reject("jQuery failed to load");
            document.head.appendChild(script);
        });
    }
    async function main($) {
        function GetUnblockName() {
            const text = $("#nickname")[0].value;
            let unblockedText = "";
            for (let i = 0; i < text.length; i++) {
                unblockedText += text[i] + "\u200b";
            }
            return unblockedText;
        }

        function initialize() {
            const div = $(".join__FormWrapper-sc-1ezg926-0");
            if (!div.length || $("#UnblockBtn").length) return;
            div.append('<button id="UnblockBtn"><span id="UnblockName">!!!Unblock name!!!</span></button>');
            const unblockBtn = $("#UnblockBtn")[0];
            unblockBtn.innerHTML += `<br><br>After clicking this button do these things.<br>1. Click at the end of name.<br>2. Press backspace once.<br>3. Click "OK, go" or press enter.`;
            $("#UnblockBtn").css({
                width: "100%",
                margin: "0px",
                border: "0px",
                cursor: "pointer",
                display: "inline-block",
                boxShadow: "rgb(0 0 0 / 15%) 0px 2px 4px, rgb(0 0 0 / 25%) 0px -4px inset",
                background: "rgb(51, 51, 51)",
                color: "rgb(255, 255, 255)",
                borderRadius: "4px",
                fontSize: "0.875rem",
                fontWeight: "bold",
                textAlign: "center",
                textDecoration: "none",
                minWidth: "48px",
                minHeight: "48px",
                padding: "0px 16px 4px",
                marginTop: "15px",
                whiteSpace: "pre-wrap",
                fontFamily: "Montserrat, 'Noto Sans Arabic', 'Helvetica Neue', Helvetica, Arial, sans-serif"
            });
            $("#UnblockBtn").hover(function() {
                $(this).css({
                    minHeight: "46px",
                    marginTop: "17px",
                    paddingBottom: "2px",
                    backgroundColor: "rgb(47, 47, 47)",
                    boxShadow: "rgb(0 0 0 / 25%) 0px -2px inset"
                });
            }, function() {
                $(this).css({
                    width: "100%",
                    margin: "0px",
                    border: "0px",
                    cursor: "pointer",
                    display: "inline-block",
                    boxShadow: "rgb(0 0 0 / 15%) 0px 2px 4px, rgb(0 0 0 / 25%) 0px -4px inset",
                    background: "rgb(51, 51, 51)",
                    color: "rgb(255, 255, 255)",
                    borderRadius: "4px",
                    fontSize: "0.875rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    textDecoration: "none",
                    minWidth: "48px",
                    minHeight: "48px",
                    padding: "0px 16px 4px",
                    marginTop: "15px",
                    whiteSpace: "pre-wrap",
                    fontFamily: "Montserrat, 'Noto Sans Arabic', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                });
            });
            $("#UnblockName").css({
                fontSize: "1.85rem",
                color: "rgb(255, 0, 0)"
            });
            const nickname = $("#nickname");
            unblockBtn.addEventListener("click", async function() {
                const unblockedName = GetUnblockName();
                console.log("Unlocked name is '" + unblockedName + "'");
                nickname[0].value = unblockedName;
            });
        }
        async function loop() {
            while (true) {
                while (!$(".join__FormWrapper-sc-1ezg926-0")[0]) await sleep(100);
                initialize();
                while ($(".join__FormWrapper-sc-1ezg926-0")[0]) await sleep(100);
            }
        }
        loop();
    }
    loadjQuery().then(main).catch(e => alert("Failed to load jQuery: " + e));
})();
