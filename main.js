const STAR_COUNT = 10000;
const STAR_MAX_SPEED = 4.5;
const STAR_MIN_SPEED = 0.01;
const STAR_FIELD_DEPTH = 1000;
const STAR_COLOR = '#FFFFFF';
const BACKGROUND_COLOR = '#07090E';
const CARD_MAX_ROTATION = 45;

// star field

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const setCanvasSize = () => {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
};

setCanvasSize();

window.onresize = () => {
    setCanvasSize();
};

const getStars = () => {
    const stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * canvas.width - canvas.width / 2,
            y: Math.random() * canvas.height - canvas.height / 2,
            z: Math.random() * STAR_FIELD_DEPTH
        });
    }
    return stars;
};

let stars = getStars();

const clear = () => {
    c.fillStyle = BACKGROUND_COLOR;
    c.fillRect(0, 0, canvas.width, canvas.height);
};

const colorHexToRgb = (colorHex) => {
    const hex = colorHex.replace('#', '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
};

const [red, green, blue] = colorHexToRgb(STAR_COLOR);

const drawStar = (x, y, brightness) => {
    c.fillStyle = `rgb(${brightness * red},${brightness * green},${brightness * blue})`;
    c.fillRect(x, y, 1, 1);
};

const drawStars = () => {
    stars.forEach(star => {
        const distance = star.z / STAR_FIELD_DEPTH;

        const x = star.x / distance + canvas.width / 2;
        const y = star.y / distance + canvas.height / 2;

        if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
            return;
        }

        const brightness = 1 - distance * distance;

        drawStar(x, y, brightness);
    });
};

let starFieldSpeed = 0.3;
const moveStars = (elapsedTime) => {
    stars.forEach(star => {
        star.z -= starFieldSpeed * elapsedTime;
        while (star.z <= 1) {
            star.z += STAR_FIELD_DEPTH;
        }
    });
};

let lastTime = 0;
const tick = (time) => {
    moveStars(time - lastTime);
    lastTime = time;

    clear();
    drawStars();

    requestAnimationFrame(tick);
};

requestAnimationFrame(tick);

// card

const card = document.querySelector('.card');

document.addEventListener('mousemove', (event) => {
    rotate(event, card);
});

rotate = (event, element) => {
    const x = event.clientX;
    const y = event.clientY;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const rotateX = ((x - centerX) / centerX) * CARD_MAX_ROTATION;
    const rotateY = ((y - centerY) / centerY) * -1 * CARD_MAX_ROTATION;

    // rotate X and Y are swapped because of how the axis is used in css
    element.style.setProperty('--rotateX', `${rotateY}deg`);
    element.style.setProperty('--rotateY', `${rotateX}deg`);
}

// speed slider

const speedSlider = document.querySelector('.speed-slider');

speedSlider.addEventListener('input', (event) => {
    starFieldSpeed = event.target.value;
});