const style = document.createElement("style");
style.textContent = `
 .flame {
    position: absolute;
    width: 10px;
    height: 10px;
    background: rgba(255, 150, 0, 0.8); 
    border-radius: 50%; 
    pointer-events: none;
    animation: flicker 0.5s ease-out forwards, rise 1s linear forwards;
  }

  @keyframes flicker {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0.5);
      opacity: 0;
    }
  }

  @keyframes rise {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-50px); 
    }
  }
`;
document.head.appendChild(style);

function randomFlameColor() {
  const colors = [
    "rgba(255, 100, 0, 0.8)", 
    "rgba(255, 150, 0, 0.7)", 
    "rgba(255, 200, 50, 0.6)", 
    "rgba(255, 255, 100, 0.5)", 
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

let CursorTrail = true;

document.addEventListener("mousemove", (event) => {
  if (!CursorTrail) return;

  const numFlames = 5; 
  const spread = 15; 

  for (let i = 0; i < numFlames; i++) {
    const flame = document.createElement("div");
    flame.className = "flame";

    flame.style.width = `${Math.random() * 10 + 5}px`;
    flame.style.height = flame.style.width; 
    flame.style.background = randomFlameColor();
    flame.style.left = `${event.pageX + (Math.random() - 0.5) * spread}px`;
    flame.style.top = `${event.pageY + (Math.random() - 0.5) * spread}px`;

    document.body.appendChild(flame);

    setTimeout(() => {
      flame.remove();
    }, 1000);
  }
});

function toggleCursorTrail(state) {
  CursorTrail = state;
  console.log(`Cursor trail is now ${CursorTrail ? "active" : "inactive"}.`);
}
