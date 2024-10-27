import "antimate.tsx"

// Define dimensions for the canvas and tile size.
const CANVAS_WIDTH = 2560;
const CANVAS_HEIGHT = 1440;
const TILE_SIZE = 50;

// Create a canvas object.
const canvas = CreateCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
const ctx = canvas.getContext('2d');

// Load an image representing an element from Arknights (e.g., a character silhouette).
let arknightsImage: HTMLImageElement | null = null;

function loadArknightsImage() {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = '/path/to/your/image.jpg'; // Replace with your image path.
        img.onload = () => resolve(img);
    });
}

async function drawPattern() {
     await loadArknightsImage();

    // Create a pattern from the loaded image.
    const pattern = ctx.createPattern(arknightsImage!, 'repeat');
    
    // Fill the entire canvas with the pattern.
    ctx.fillStyle = pattern!;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw additional elements or features if needed.
    // e.g., draw characters, items, etc., using ctx.drawImage or other methods.
}

drawPattern();

// Export the canvas so you can use it elsewhere (e.g., embed it in an HTML page).
export default canvas;