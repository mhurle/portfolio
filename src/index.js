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

        // Apply fade-in animation to each row
        const rows = moreProjects.querySelectorAll('.row');
        rows.forEach((row, index) => {
            row.style.opacity = '0'; // Ensure hidden initially
            row.classList.add('fade-in-up');
            row.style.animationDelay = `${index * 0.2}s`; // Stagger effect
        });

        seeMoreBtn.style.display = 'none';

        // Re-initialize tilt for new elements
        initTiltEffect();
    });
}
