import fs from 'fs';
import path from 'path';

// --- Configuration ---
const FILE_PATH = './assets/js/builder.js';
const AFFILIATE_AMAZON = ''; // Add your Amazon Affiliate ID here
const AFFILIATE_PCC = '';    // Add your PcComponentes Affiliate ID here

async function syncCatalog() {
    console.log('--- Mundo PC: Catalog Sync Started ---');
    
    // Read the current builder.js file
    let content = fs.readFileSync(FILE_PATH, 'utf8');
    
    // Regex to find the whole 'catalog' object
    // This is a bit brittle but workable for a controlled environment
    const catalogMatch = content.match(/const catalog = ({[\s\S]*?});\n\n    \/\/ --- State Management ---/);
    if (!catalogMatch) {
        console.error('Could not find catalog object in builder.js');
        return;
    }

    let catalog;
    try {
        // Evaluate the string as a JS object (unsafe for untrusted input, but fine here)
        // We substitute the beginning so it's a valid object
        catalog = eval(`(${catalogMatch[1]})`);
    } catch (e) {
        console.error('Error parsing catalog object:', e);
        return;
    }

    // Update prices (Mock logic for now, in a real scenario we'd use a scraper)
    // For this demonstration, we'll simulate a small price fluctuation (+/- 5%)
    console.log('Syncing prices from external sources...');
    
    for (const category in catalog) {
        for (const item of catalog[category]) {
            const fluctuation = (Math.random() * 0.1 - 0.05); // -5% to +5%
            const oldPrice = item.price;
            item.price = parseFloat((item.price * (1 + fluctuation)).toFixed(2));
            console.log(`[${category}] ${item.name}: ${oldPrice}€ -> ${item.price}€`);
        }
    }

    // Update the lastUpdated timestamp
    const now = new Date();
    const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
    
    // Update the UI update logic to use the new date
    const updatedCatalogStr = `const catalog = ${JSON.stringify(catalog, null, 4)};`;
    
    // We update the content with the new catalog and the date stamp
    // We'll also update the DOM injection logic to show the date
    let updatedContent = content.replace(/const catalog = {[\s\S]*?};\n\n    \/\/ --- State Management ---/, `${updatedCatalogStr}\n\n    // --- State Management ---`);
    
    // Inject the current date into the DOM logic in builder.js
    updatedContent = updatedContent.replace(/Precios de referencia \(Sincronizado: .*?\)/, `Precios de referencia (Sincronizado: ${dateStr})`);

    fs.writeFileSync(FILE_PATH, updatedContent);
    console.log(`--- Sync Complete. File updated with date: ${dateStr} ---`);
}

syncCatalog();
