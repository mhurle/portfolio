import VanillaTilt from "vanilla-tilt";

export default function initTiltAnimation() {
  const elements = Array.from(document.querySelectorAll(".js-tilt"));
  const elementsToInit = elements.filter(el => !el.vanillaTilt);

  if (elementsToInit.length > 0) {
    VanillaTilt.init(elementsToInit);
  }
}
