export const smoothScrollToElement = (elementId: string) => {
    // Remove the # if it's included
    const targetId = elementId.replace('#', '');

    // For root path, animate to top
    if (targetId === '/') {
        const startPosition = window.pageYOffset;
        const distance = -startPosition; // Distance to scroll up to 0

        let start: number | null = null;
        const duration = 500; // Duration in ms

        function animation(currentTime: number) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        requestAnimationFrame(animation);
        return;
    }

    const element = document.getElementById(targetId);

    if (!element) return;

    // Get the sticky nav element and offset
    const nav = document.querySelector('nav');
    const navHeight = nav ? nav.offsetHeight : 80;
    const isMobile = window.innerWidth <= 768;
    const offset = targetId.toLowerCase() === 'services'
        ? (isMobile ? navHeight + 16 : navHeight)
        : navHeight - 16;

    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;
    const startPosition = window.pageYOffset;
    const distance = offsetPosition - startPosition;

    let start: number | null = null;
    const duration = 500; // Duration in ms

    function animation(currentTime: number) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Easing function
    function ease(t: number, b: number, c: number, d: number) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
};