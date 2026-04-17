document.addEventListener('DOMContentLoaded', () => {
    // --- Data: Component Catalog ---
    const catalog = {
        cpu: [
            // Intel LGA1700
            { id: 'cpu-i1', name: 'Intel Core i9-14900K', price: 589.00, socket: 'LGA1700', tdp: 253, description: '24 núcleos, 32 hilos, 6.0GHz' },
            { id: 'cpu-i2', name: 'Intel Core i7-14700K', price: 409.00, socket: 'LGA1700', tdp: 253, description: '20 núcleos, 28 hilos, 5.6GHz' },
            { id: 'cpu-i3', name: 'Intel Core i5-14600K', price: 315.00, socket: 'LGA1700', tdp: 181, description: '14 núcleos, 20 hilos, 5.3GHz' },
            { id: 'cpu-i4', name: 'Intel Core i5-13400F', price: 209.00, socket: 'LGA1700', tdp: 148, description: '10 núcleos, 16 hilos, 4.6GHz' },
            { id: 'cpu-i5', name: 'Intel Core i3-12100F', price: 95.00, socket: 'LGA1700', tdp: 89, description: '4 núcleos, 8 hilos, 4.3GHz' },
            // AMD AM5
            { id: 'cpu-a1', name: 'AMD Ryzen 9 9950X', price: 649.00, socket: 'AM5', tdp: 170, description: '16 núcleos, 32 hilos, 5.7GHz (Zen 5)' },
            { id: 'cpu-a2', name: 'AMD Ryzen 7 9800X3D', price: 529.00, socket: 'AM5', tdp: 120, description: '8 núcleos, 16 hilos, 3D V-Cache (Gaming King)' },
            { id: 'cpu-a3', name: 'AMD Ryzen 7 9700X', price: 359.00, socket: 'AM5', tdp: 65, description: '8 núcleos, 16 hilos, eficiente Zen 5' },
            { id: 'cpu-a4', name: 'AMD Ryzen 5 9600X', price: 279.00, socket: 'AM5', tdp: 65, description: '6 núcleos, 12 hilos, Zen 5' },
            { id: 'cpu-a5', name: 'AMD Ryzen 7 7800X3D', price: 445.00, socket: 'AM5', tdp: 120, description: '8 núcleos, 16 hilos, 3D V-Cache' },
            { id: 'cpu-a6', name: 'AMD Ryzen 5 7600X', price: 215.00, socket: 'AM5', tdp: 105, description: '6 núcleos, 12 hilos, 5.3GHz' },
            // AMD AM4
            { id: 'cpu-a7', name: 'AMD Ryzen 7 5800X3D', price: 325.00, socket: 'AM4', tdp: 105, description: 'El mejor para AM4 Gaming' },
            { id: 'cpu-a8', name: 'AMD Ryzen 5 5600X', price: 145.00, socket: 'AM4', tdp: 65, description: '6 núcleos, 12 hilos, leyenda AM4' },
            { id: 'cpu-a9', name: 'AMD Ryzen 5 5500', price: 99.00, socket: 'AM4', tdp: 65, description: 'La opción más barata para AM4' }
        ],
        motherboard: [
            // LGA1700
            { id: 'mb-i1', name: 'ASUS ROG MAXIMUS Z790 HERO', price: 649.00, socket: 'LGA1700', ramType: 'DDR5', description: 'Gama ultra-entusiasta', img: 'assets/img/motherboard.png' },
            { id: 'mb-i2', name: 'MSI PRO Z790-A WIFI', price: 245.00, socket: 'LGA1700', ramType: 'DDR5', description: 'Gama alta equilibrada', img: 'assets/img/motherboard.png' },
            { id: 'mb-i3', name: 'Gigabyte B760 GAMING X', price: 155.00, socket: 'LGA1700', ramType: 'DDR5', description: 'Gama media versátil', img: 'assets/img/motherboard.png' },
            { id: 'mb-i4', name: 'ASRock H610M-HDV', price: 85.00, socket: 'LGA1700', ramType: 'DDR4', description: 'Básica y compacta', img: 'assets/img/motherboard.png' },
            // AM5
            { id: 'mb-a1', name: 'ASUS ROG CROSSHAIR X870E HERO', price: 699.00, socket: 'AM5', ramType: 'DDR5', description: 'El tope de gama para Zen 5', img: 'assets/img/motherboard.png' },
            { id: 'mb-a2', name: 'Gigabyte X870 AORUS ELITE', price: 325.00, socket: 'AM5', ramType: 'DDR5', description: 'Alto rendimiento AM5', img: 'assets/img/motherboard.png' },
            { id: 'mb-a3', name: 'MSI B650 GAMING PLUS WIFI', price: 175.00, socket: 'AM5', ramType: 'DDR5', description: 'Calidad/Precio AM5', img: 'assets/img/motherboard.png' },
            { id: 'mb-a4', name: 'ASRock A620M-HDV', price: 99.00, socket: 'AM5', ramType: 'DDR5', description: 'Económica para AM5', img: 'assets/img/motherboard.png' },
            // AM4
            { id: 'mb-a5', name: 'MSI MAG B550 TOMAHAWK', price: 149.00, socket: 'AM4', ramType: 'DDR4', description: 'La mejor B550', img: 'assets/img/motherboard.png' },
            { id: 'mb-a6', name: 'Gigabyte B450M DS3H', price: 75.00, socket: 'AM4', ramType: 'DDR4', description: 'Súper ventas económico', img: 'assets/img/motherboard.png' }
        ],
        ram: [
            { id: 'ram-d5-1', name: 'CORSAIR Vengeance 32GB (2x16) DDR5 6000MHz', price: 125.00, type: 'DDR5', description: 'Optimizado para AMD/Intel' },
            { id: 'ram-d5-2', name: 'G.Skill Trident Z5 RGB 32GB DDR5 6400MHz', price: 159.00, type: 'DDR5', description: 'Premium con RGB' },
            { id: 'ram-d5-3', name: 'Crucial 16GB (1x16) DDR5 4800MHz', price: 55.00, type: 'DDR5', description: 'Básico DDR5' },
            { id: 'ram-d4-1', name: 'Kingston FURY Beast 16GB (2x8) DDR4 3200MHz', price: 45.00, type: 'DDR4', description: 'Estándar oro DDR4' },
            { id: 'ram-d4-2', name: 'Corsair Vengeance LPX 32GB DDR4 3600MHz', price: 89.00, type: 'DDR4', description: 'Ideal para edición' },
            { id: 'ram-d4-3', name: 'G.Skill Aegis 8GB DDR4 3000MHz', price: 22.00, type: 'DDR4', description: 'Presupuesto ajustado' }
        ],
        gpu: [
            { id: 'gpu-59', name: 'NVIDIA GeForce RTX 5090 24GB', price: 1999.00, minPsu: 850, description: 'La reina absoluta (Next-Gen)' },
            { id: 'gpu-58', name: 'NVIDIA GeForce RTX 5080 16GB', price: 1199.00, minPsu: 750, description: 'Potencia 4K extrema' },
            { id: 'gpu-48s', name: 'NVIDIA GeForce RTX 4080 Super 16GB', price: 1049.00, minPsu: 750, description: 'Alto rendimiento 4K' },
            { id: 'gpu-47s', name: 'NVIDIA GeForce RTX 4070 Super 12GB', price: 629.00, minPsu: 650, description: 'La mejor calidad/precio 1440p' },
            { id: 'gpu-46', name: 'NVIDIA GeForce RTX 4060 8GB', price: 299.00, minPsu: 500, description: 'Eficiencia y DLSS 3.0' },
            { id: 'gpu-97', name: 'AMD Radeon RX 9070 XT 20GB', price: 799.00, minPsu: 750, description: 'Potencia AMD Zen 5 era' },
            { id: 'gpu-79', name: 'AMD Radeon RX 7900 XTX 24GB', price: 959.00, minPsu: 800, description: 'Tope de gama AMD' },
            { id: 'gpu-78', name: 'AMD Radeon RX 7800 XT 16GB', price: 529.00, minPsu: 700, description: 'Gran opción 1440p' },
            { id: 'gpu-base', name: 'AMD Radeon RX 6600 8GB', price: 215.00, minPsu: 450, description: '1080p imbatible' }
        ],
        storage: [
            { id: 'st-5', name: 'Crucial T705 2TB NVMe PCIe 5.0', price: 345.00, description: 'Velocidad de hasta 14.500 MB/s' },
            { id: 'st-4', name: 'Samsung 990 Pro 2TB Gen4', price: 179.00, description: 'El estándar de los profesionales' },
            { id: 'st-3', name: 'WD Black SN850X 1TB Gen4', price: 95.00, description: 'Excelente para gaming' },
            { id: 'st-2', name: 'Crucial P3 Plus 1TB Gen4', price: 75.00, description: 'Calidad/Precio inmejorable' },
            { id: 'st-1', name: 'Kingston NV2 500GB Gen4', price: 42.00, description: 'Básico pero rápido' }
        ],
        psu: [
            { id: 'psu-4', name: 'Corsair RM1000x 80+ Gold', price: 185.00, watts: 1000, description: 'Potencia para cualquier build' },
            { id: 'psu-3', name: 'NZXT C850 80+ Gold Modular', price: 125.00, watts: 850, description: 'Ideal para gráficas de gama alta' },
            { id: 'psu-2', name: 'Seasonic Focus GX-750W', price: 109.00, watts: 750, description: 'Calidad legendaria' },
            { id: 'psu-1', name: 'Evga 600W 80+ White', price: 55.00, watts: 600, description: 'Opción económica fiable' }
        ],
        case: [
            { id: 'cs-4', name: 'Lian Li O11 Dynamic EVO', price: 169.00, description: 'La vitrina favorita de los entusiastas' },
            { id: 'cs-3', name: 'Corsair 4000D Airflow', price: 95.00, description: 'Referencia en ventilación' },
            { id: 'cs-2', name: 'NZXT H5 Flow', price: 89.00, description: 'Elegancia y temperatura' },
            { id: 'cs-1', name: 'Montech AIR 903 MAX', price: 75.00, description: 'Incluye 4 ventiladores ARGB' }
        ]
    };

    // --- State Management ---
    let currentBuild = {
        cpu: null,
        motherboard: null,
        ram: null,
        gpu: null,
        storage: null,
        psu: null,
        case: null
    };

    let activeCategory = null;

    // --- DOM Elements ---
    const modal = document.getElementById('selection-modal');
    const modalTitle = document.getElementById('modal-title');
    const partsListContainer = document.getElementById('parts-list');
    const searchInput = document.getElementById('part-search');
    const summaryItems = document.getElementById('summary-items');
    const totalPriceEl = document.getElementById('total-price');
    const buyBtn = document.getElementById('buy-all-btn');
    const clearBtn = document.getElementById('clear-btn');
    const closeBtn = document.querySelector('.close-modal');
    const compStatusEl = document.getElementById('compatibility-status');
    const syncInfoEl = document.getElementById('sync-info');

    // --- Functions ---

    function openModal(category) {
        activeCategory = category;
        const labels = {
            cpu: 'Procesador',
            motherboard: 'Placa Base',
            ram: 'Memoria RAM',
            gpu: 'Tarjeta Gráfica',
            storage: 'Almacenamiento',
            psu: 'Fuente de Alimentación',
            case: 'Chasis'
        };
        modalTitle.textContent = `Seleccionar ${labels[category]}`;
        renderParts(category);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        searchInput.value = '';
    }

    function generateSearchLinks(itemName) {
        const query = encodeURIComponent(itemName);
        return {
            amazon: `https://www.amazon.es/s?k=${query}`,
            pccomp: `https://www.pccomponentes.com/buscar/?query=${query}`
        };
    }

    function renderParts(category, filterText = '') {
        partsListContainer.innerHTML = '';
        let parts = catalog[category];

        if (filterText) {
            parts = parts.filter(p => p.name.toLowerCase().includes(filterText.toLowerCase()));
        }

        parts.forEach(part => {
            const links = generateSearchLinks(part.name);
            const div = document.createElement('div');
            div.className = 'part-item';
            div.innerHTML = `
                <div class="part-item-info">
                    <h4>${part.name}</h4>
                    <p>${part.description}</p>
                    <div class="part-item-badges">
                        ${part.socket ? `<span class="badge">${part.socket}</span>` : ''}
                        ${part.ramType ? `<span class="badge">${part.ramType}</span>` : ''}
                        ${part.type ? `<span class="badge">${part.type}</span>` : ''}
                    </div>
                </div>
                <div class="part-item-actions" style="display: flex; flex-direction: column; align-items: flex-end; gap: 10px;">
                    <div class="part-item-price" style="font-weight: 700; color: var(--primary-color); font-size: 1.1rem;">${part.price.toFixed(2)}€</div>
                    <div class="quick-links" style="display: flex; gap: 5px;">
                        <a href="${links.amazon}" target="_blank" class="btn-mini" style="font-size: 0.7rem; padding: 4px 8px; background: #FF9900; color: black; border-radius: 4px; text-decoration: none;" onclick="event.stopPropagation()"><i class="fa-brands fa-amazon"></i></a>
                        <a href="${links.pccomp}" target="_blank" class="btn-mini" style="font-size: 0.7rem; padding: 4px 8px; background: #FF6000; color: white; border-radius: 4px; text-decoration: none;" onclick="event.stopPropagation()"><i class="fa-solid fa-cart-shopping"></i></a>
                    </div>
                </div>
            `;
            div.addEventListener('click', () => selectPart(part));
            partsListContainer.appendChild(div);
        });
    }

    function selectPart(part) {
        currentBuild[activeCategory] = part;
        updateUI();
        closeModal();
    }

    function updateUI() {
        Object.keys(currentBuild).forEach(cat => {
            const slot = document.getElementById(`slot-${cat}`);
            const nameEl = slot.querySelector('.selected-name');
            const item = currentBuild[cat];

            if (item) {
                slot.classList.add('completed');
                nameEl.textContent = item.name;
                slot.querySelector('.select-btn').innerHTML = 'Cambiar <i class="fa-solid fa-rotate"></i>';
                
                if (cat === 'motherboard' && item.img) {
                    const imgBox = document.getElementById('img-motherboard');
                    imgBox.innerHTML = `<img src="${item.img}" alt="Board Photo">`;
                }
            } else {
                slot.classList.remove('completed');
                nameEl.textContent = 'No seleccionado';
                slot.querySelector('.select-btn').innerHTML = 'Seleccionar <i class="fa-solid fa-plus"></i>';
                if (cat === 'motherboard') {
                    document.getElementById('img-motherboard').innerHTML = `<i class="fa-solid fa-microchip"></i>`;
                }
            }
        });

        summaryItems.innerHTML = '';
        let total = 0;
        let count = 0;

        Object.keys(currentBuild).forEach(cat => {
            const item = currentBuild[cat];
            if (item) {
                total += item.price;
                count++;
                const links = generateSearchLinks(item.name);
                const div = document.createElement('div');
                div.className = 'summary-item';
                div.style.display = 'flex';
                div.style.justifyContent = 'space-between';
                div.style.marginBottom = '10px';
                div.innerHTML = `
                    <div style="flex-grow: 1;">
                        <span style="font-size: 0.9rem;">${item.name}</span>
                        <div style="display: flex; gap: 10px; margin-top: 4px;">
                            <a href="${links.amazon}" target="_blank" style="font-size: 0.7rem; color: #FF9900;">Amazon <i class="fa-solid fa-external-link"></i></a>
                            <a href="${links.pccomp}" target="_blank" style="font-size: 0.7rem; color: #FF6000;">PcComp <i class="fa-solid fa-external-link"></i></a>
                        </div>
                    </div>
                    <span class="item-price" style="font-weight: 600;">${item.price.toFixed(2)}€</span>
                `;
                summaryItems.appendChild(div);
            }
        });

        if (count === 0) {
            summaryItems.innerHTML = '<p class="empty-msg">Empieza a añadir componentes...</p>';
            buyBtn.disabled = true;
        } else {
            buyBtn.disabled = false;
        }

        totalPriceEl.textContent = `${total.toFixed(2).replace('.', ',')}€`;
        checkCompatibility();
    }

    function checkCompatibility() {
        const issues = [];
        const { cpu, motherboard, ram, gpu, psu } = currentBuild;

        if (cpu && motherboard && cpu.socket !== motherboard.socket) {
            issues.push({ type: 'error', msg: `Incompatible: El ${cpu.name} usa ${cpu.socket}, pero la placa usa ${motherboard.socket}.` });
        }
        if (motherboard && ram && motherboard.ramType !== ram.type) {
            issues.push({ type: 'error', msg: `Incompatible: La placa requiere ${motherboard.ramType}, pero has elegido ${ram.type}.` });
        }
        if (gpu && psu && psu.watts < gpu.minPsu) {
            issues.push({ type: 'warning', msg: `Alerta: La gráfica recomienda min. ${gpu.minPsu}W. Tu fuente es de ${psu.watts}W.` });
        }

        const statusIcon = compStatusEl.querySelector('.comp-icon i');
        const statusTitle = compStatusEl.querySelector('.comp-text h4');
        const statusDesc = compStatusEl.querySelector('.comp-text p');

        compStatusEl.className = 'compatibility-card';
        const errors = issues.filter(i => i.type === 'error');
        const warnings = issues.filter(i => i.type === 'warning');

        if (errors.length > 0) {
            compStatusEl.classList.add('error');
            statusIcon.className = 'fa-solid fa-circle-xmark';
            statusTitle.textContent = 'Configuración incompatible';
            statusDesc.textContent = errors[0].msg;
        } else if (warnings.length > 0) {
            compStatusEl.classList.add('warning');
            statusIcon.className = 'fa-solid fa-triangle-exclamation';
            statusTitle.textContent = 'Atención recomendada';
            statusDesc.textContent = warnings[0].msg;
        } else if (Object.values(currentBuild).filter(v => v).length > 2) {
            compStatusEl.classList.add('success');
            statusIcon.className = 'fa-solid fa-circle-check';
            statusTitle.textContent = 'Todo es compatible';
            statusDesc.textContent = 'Tus componentes funcionarán perfectamente juntos.';
        } else {
            statusIcon.className = 'fa-solid fa-spinner';
            statusTitle.textContent = 'Estado de Compatibilidad';
            statusDesc.textContent = 'Esperando componentes...';
        }
    }

    // --- End UI Logic ---

    // Pre-populate with a demo timestamp
    const now = new Date();
    const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
    syncInfoEl.innerHTML = `<i class="fa-solid fa-clock-rotate-left"></i> Precios de referencia (Sincronizado: ${dateStr})`;

    // Header Links Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    if (localStorage.getItem('theme') === 'light') {
        body.setAttribute('data-theme', 'light');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        if (body.hasAttribute('data-theme')) {
            body.removeAttribute('data-theme');
            if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        }
    });

    document.querySelectorAll('.slot-card').forEach(card => {
        card.querySelector('.select-btn').addEventListener('click', () => {
            openModal(card.dataset.category);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    searchInput.addEventListener('input', (e) => { renderParts(activeCategory, e.target.value); });
    clearBtn.addEventListener('click', () => {
        if (confirm('¿Estás seguro?')) {
            Object.keys(currentBuild).forEach(k => currentBuild[k] = null);
            updateUI();
        }
    });
    buyBtn.addEventListener('click', () => { alert('¡Genial! Redirigiendo a Mundo PC...'); });

    // --- Supabase Save Build Logic ---
    const saveBuildBtn = document.getElementById('save-build-btn');
    if (saveBuildBtn) {
        saveBuildBtn.addEventListener('click', async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                alert('Debes iniciar sesión para guardar tu configuración.');
                return;
            }

            // Prepare data
            const buildData = {
                user_id: user.id,
                config: currentBuild,
                total_price: parseFloat(totalPriceEl.textContent.replace('€', '').replace(',', '.'))
            };

            const { data, error } = await supabase.from('builds').insert([buildData]);

            if (error) {
                alert('Error al guardar: ' + error.message);
                console.error(error);
            } else {
                alert('¡Configuración guardada con éxito en tu cuenta de Mundo PC!');
            }
        });
    }
});
