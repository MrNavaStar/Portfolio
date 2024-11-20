const items = document.getElementsByClassName("win")
const placedPositions = []; // Track positions and sizes to avoid overlap
const screenWidth = window.innerWidth - 200;
const screenHeight = window.innerHeight - 200;
const padding = 50;

// Function to check for overlap
function isOverlapping(x, y, width, height) {
    return placedPositions.some(pos => {
        return (
            x < pos.x + pos.width &&
            x + width + padding > pos.x &&
            y < pos.y + pos.height &&
            y + height + padding > pos.y
        );
    });
}

// Function to get a random position without overlap
function getRandomPosition(itemWidth, itemHeight) {
    let x, y, hasOverlap;

    do {
        x = Math.random() * (screenWidth - itemWidth);
        y = Math.random() * (screenHeight - itemHeight);
        hasOverlap = isOverlapping(x, y, itemWidth, itemHeight);
    } while (hasOverlap);

    placedPositions.push({ x, y, width: itemWidth, height: itemHeight });
    return { x, y };
}

// Assign random positions to all items
for (let item of items) {
    const itemWidth = item.offsetWidth;
    const itemHeight = item.offsetHeight;

    // Get a random position for the current item's size
    const {x, y} = getRandomPosition(itemWidth, itemHeight);

    // Set the position and initialize data attributes
    item.style.transform = `translate(${x}px, ${y}px)`;
    item.setAttribute('data-x', x);
    item.setAttribute('data-y', y);
}