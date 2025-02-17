javascript:(function() {
  let elements = document.body.getElementsByTagName("*");
  for (let i = 0; i < elements.length; i++) {
    let el = elements[i];
    el.style.transition = "transform 0.2s ease-in-out";
    el.style.transform = "rotate(0deg)";
    setInterval(() => {
      el.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
    }, 100);
  }
})();
