const fs = require("fs");
const sharp = require("sharp");
const path = require("path");

const svgPath = path.join(__dirname, "../public/favicon.svg");
const svgBuffer = fs.readFileSync(svgPath);

// Генерируем favicon.png (32x32)
sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toFile(path.join(__dirname, "../public/favicon.png"))
  .then(() => console.log("✓ favicon.png created"))
  .catch((err) => console.error("Error creating favicon.png:", err));

// Генерируем apple-touch-icon.png (180x180)
sharp(svgBuffer)
  .resize(180, 180)
  .png()
  .toFile(path.join(__dirname, "../public/apple-touch-icon.png"))
  .then(() => console.log("✓ apple-touch-icon.png created"))
  .catch((err) => console.error("Error creating apple-touch-icon.png:", err));

// Генерируем favicon.ico (16x16 и 32x32)
Promise.all([
  sharp(svgBuffer).resize(16, 16).png().toBuffer(),
  sharp(svgBuffer).resize(32, 32).png().toBuffer(),
])
  .then(([icon16, icon32]) => {
    // Простое создание ICO (используем PNG как fallback)
    fs.writeFileSync(
      path.join(__dirname, "../public/favicon.ico"),
      icon32 // Используем 32x32 версию
    );
    console.log("✓ favicon.ico created");
  })
  .catch((err) => console.error("Error creating favicon.ico:", err));
