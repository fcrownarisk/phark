import { createCanvas, Canvas, Image } from "canvas.ts";

/**
 * Creates a canvas and renders a simple natural landscape scene.
 */
async function createAndRenderCanvas(): Promise<void> {
  const canvas: Canvas = createCanvas(800, 600);
  const ctx = canvas.getContext("2d");

  // Background (sky)
  ctx.fillStyle = "#87CEEB";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Sun
  ctx.beginPath();
  ctx.arc(100, 100, 80, 0, Math.PI * 2);
  ctx.fillStyle = "#FDB813";
  ctx.fill();

  // Trees (trunks and leaves)
  ctx.fillStyle = "#333333"; // Dark brown for trunks
  ctx.fillRect(300, 400, 40, 200); // First tree trunk
  ctx.fillRect(500, 400, 40, 200); // Second tree trunk

  ctx.fillStyle = "#228B22"; // Green for leaves
  ctx.beginPath();
  ctx.moveTo(300 + 20, 400);
  ctx.bezierCurveTo(300 - 20, 300, 300 + 100, 300, 300 + 120, 400);
  ctx.closePath();
  ctx.fill(); // First tree leaves

  ctx.beginPath();
  ctx.moveTo(500 + 20, 400);
  ctx.bezierCurveTo(500 - 20, 300, 500 + 100, 300, 500 + 120, 400);
  ctx.closePath();
  ctx.fill(); // Second tree leaves

  // Grass
  ctx.fillStyle = "#2E8B57";
  ctx.fillRect(0, canvas.height - 200, canvas.width, 200);

  // Load and draw an image (clouds)
  const img = await loadImage("path/to/clouds.png");
  ctx.drawImage(img, 100, 100, 200, 100);

  // Save the canvas as an image
  const buffer = canvas.toBuffer("image/png");
}

/**
 * Loads an image asynchronously.
 * @param imagePath Path to the image.
 * @returns Promise resolving to an Image object.
 */
async function loadImage(imagePath: string): Promise<Image> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = imagePath;
  });
}

createAndRenderCanvas().catch(console.error);