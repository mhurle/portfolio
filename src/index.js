import 'bootstrap';
import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import { targetElements, defaultProps } from "./data/scrollRevealConfig";

initScrollReveal(targetElements, defaultProps);
initTiltEffect();

// See More Projects Logic
const seeMoreBtn = document.getElementById('seeMoreBtn');
const moreProjects = document.getElementById('moreProjects');

if (seeMoreBtn && moreProjects) {
    seeMoreBtn.addEventListener('click', () => {
        moreProjects.classList.remove('d-none');
        seeMoreBtn.style.display = 'none';

        // Re-initialize tilt for new elements if needed, or just ensure they work
        initTiltEffect();
    });
}
