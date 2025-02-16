javascript:(function() {
    let glitchGif = "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2swYTVtY3kybGpzbWF5Y2p6Y2QwZXcyNWo4cHVpY2RibXdqNG42MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l378vMZ1IbLcmj3H2/giphy.gif";

    document.querySelectorAll("img").forEach((img, index) => {
        let newImg = document.createElement("img");
        newImg.src = glitchGif;
        newImg.style.width = img.width + "px";
        newImg.style.height = img.height + "px";
        newImg.style.objectFit = "cover";
        newImg.style.position = "relative";
        newImg.style.animation = `glitchDelay ${Math.random() * 2}s linear infinite alternate`;

        img.replaceWith(newImg);
    });

    let style = document.createElement("style");
    style.innerHTML = `
        @keyframes glitchDelay {
            0% { opacity: 1; transform: translate(0, 0); }
            25% { opacity: 0.8; transform: translate(-2px, 2px); }
            50% { opacity: 1; transform: translate(2px, -2px); }
            75% { opacity: 0.9; transform: translate(-1px, 1px); }
            100% { opacity: 1; transform: translate(0, 0); }
        }
    `;
    document.head.appendChild(style);
})();
