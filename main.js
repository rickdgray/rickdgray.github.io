const card = document.querySelector('.card');

document.addEventListener('mousemove', (event) => {
    rotate(event, card);
});

rotate = (event, element) => {
    const x = event.clientX;
    const y = event.clientY;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const rotateX = ((x - centerX) / centerX) * 45;
    const rotateY = ((y - centerY) / centerY) * -45;

    // rotate X and Y are swapped because the axis is used in css
    element.style.setProperty('--rotateX', `${rotateY}deg`);
    element.style.setProperty('--rotateY', `${rotateX}deg`);
}