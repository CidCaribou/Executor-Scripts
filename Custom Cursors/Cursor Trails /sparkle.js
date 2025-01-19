const pixelStyle = document.createElement("style");
pixelStyle.textContent = `
  .pixel {
    position: absolute;
    width: 12px;
    height: 12px;
    background: white; /* White color for the trail */
    pointer-events: none;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); /* Star shape */
    animation: pixelFade 0.4s ease-out forwards;
  }

  @keyframes pixelFade {
    0% {
      opacity: 1;
      transform: scale(1.5);
    }
    100% {
      opacity: 0;
      transform: scale(0.5);
    }
  }
`;
document.head.appendChild(pixelStyle);

// Default CursorTrail state
let CursorTrail = true;

function createPixelTrail(event) {
  if (!CursorTrail) return; // Do nothing if CursorTrail is false

  const numPixels = 4;
  const spread = 10;

  for (let i = 0; i < numPixels; i++) {
    const pixel = document.createElement("div");
    pixel.className = "pixel";

    pixel.style.left = `${event.pageX + (Math.random() - 0.5) * spread}px`;
    pixel.style.top = `${event.pageY + (Math.random() - 0.5) * spread}px`;

    document.body.appendChild(pixel);

    setTimeout(() => pixel.remove(), 800);
  }
}

document.addEventListener("mousemove", createPixelTrail);
