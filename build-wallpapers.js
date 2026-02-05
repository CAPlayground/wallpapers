const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'dist');
fs.mkdirSync(OUT_DIR, { recursive: true });

const jsonsDir = path.join(__dirname, 'jsons');
const wallpapersFile = path.join(OUT_DIR, 'wallpapers.json');

const wallpapersData = {};

const jsonFiles = fs.readdirSync(jsonsDir)
  .filter(file => file.endsWith('.json'))
  .sort();

const wallpapers = [];
for (const file of jsonFiles) {
  const filePath = path.join(jsonsDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  wallpapers.push(data);
}

wallpapersData.wallpapers = wallpapers;

fs.writeFileSync(wallpapersFile, JSON.stringify(wallpapersData, null, 2) + '\n', 'utf8');

console.log(`Successfully merged ${wallpapers.length} wallpapers`);