document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle ---
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        if (body.hasAttribute('data-theme')) {
            body.removeAttribute('data-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        }
    });

    // --- Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        const isClosed = navLinks.style.display === 'none' || navLinks.style.display === '';

        if (isClosed) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '80px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = getComputedStyle(document.querySelector('header')).backgroundColor;
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        } else {
            navLinks.style.display = ''; // Revert to CSS
        }
    });

    // --- Configurator Logic ---
    const steps = document.querySelectorAll('.step');
    const usageOptions = document.querySelectorAll('[data-usage]');
    const budgetOptions = document.querySelectorAll('[data-budget]');
    const backBtn = document.querySelector('.back-btn');
    const restartBtn = document.querySelector('.restart-btn');
    const recommendationBox = document.getElementById('recommendation-content');

    let currentSelection = {
        usage: null,
        budget: null
    };

    // Step 1: Usage Selection
    usageOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove previous selection visual
            usageOptions.forEach(opt => opt.classList.remove('selected'));
            // Add new
            option.classList.add('selected');
            currentSelection.usage = option.dataset.usage;

            // Go to next step after small delay
            setTimeout(() => {
                goToStep(1);
            }, 300);
        });
    });

    // Step 2: Budget Selection
    budgetOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove previous selection visual
            budgetOptions.forEach(opt => opt.classList.remove('selected'));
            // Add new
            option.classList.add('selected');
            currentSelection.budget = option.dataset.budget;

            // Generate Result
            setTimeout(() => {
                showResult();
                goToStep(2);
            }, 300);
        });
    });

    // Navigation
    backBtn.addEventListener('click', () => {
        goToStep(0);
    });

    restartBtn.addEventListener('click', () => {
        currentSelection = { usage: null, budget: null };
        document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
        goToStep(0);
    });

    function goToStep(index) {
        steps.forEach((step, i) => {
            if (i === index) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    // Recommendation Logic
    const recommendations = {
        gaming: {
            low: {
                cpu: { name: 'Intel Core i3-12100F', amazon: 'https://www.amazon.es/s?k=Intel+Core+i3-12100F', pccomp: 'https://www.pccomponentes.com/search/?query=Intel+Core+i3-12100F' },
                gpu: { name: 'Radeon RX 6600', amazon: 'https://www.amazon.es/s?k=Radeon+RX+6600', pccomp: 'https://www.pccomponentes.com/search/?query=Radeon+RX+6600' },
                ram: { name: '16GB DDR4', amazon: 'https://www.amazon.es/s?k=16GB+DDR4+3200MHz', pccomp: 'https://www.pccomponentes.com/search/?query=16GB+DDR4' },
                storage: { name: '500GB NVMe SSD', amazon: 'https://www.amazon.es/s?k=500GB+NVMe+SSD', pccomp: 'https://www.pccomponentes.com/search/?query=500GB+NVMe+SSD' },
                case: { name: 'Cooler Master MasterBox Q300L', amazon: 'https://www.amazon.es/s?k=Cooler+Master+MasterBox+Q300L', pccomp: 'https://www.pccomponentes.com/search/?query=Cooler+Master+MasterBox+Q300L' },
                psu: { name: '550W 80+ Bronze', amazon: 'https://www.amazon.es/s?k=fuente+alimentacion+550W+80+plus+bronze', pccomp: 'https://www.pccomponentes.com/search/?query=fuente+550W+80+plus+bronze' }
            },
            mid: {
                cpu: { name: 'AMD Ryzen 5 7600X', amazon: 'https://www.amazon.es/s?k=AMD+Ryzen+5+7600X', pccomp: 'https://www.pccomponentes.com/search/?query=AMD+Ryzen+5+7600X' },
                gpu: { name: 'NVIDIA RTX 4060 Ti', amazon: 'https://www.amazon.es/s?k=NVIDIA+RTX+4060+Ti', pccomp: 'https://www.pccomponentes.com/search/?query=RTX+4060+Ti' },
                ram: { name: '32GB DDR5', amazon: 'https://www.amazon.es/s?k=32GB+DDR5', pccomp: 'https://www.pccomponentes.com/search/?query=32GB+DDR5' },
                storage: { name: '1TB NVMe SSD', amazon: 'https://www.amazon.es/s?k=1TB+NVMe+SSD', pccomp: 'https://www.pccomponentes.com/search/?query=1TB+NVMe+SSD' },
                case: { name: 'NZXT H510 Flow', amazon: 'https://www.amazon.es/s?k=NZXT+H510+Flow', pccomp: 'https://www.pccomponentes.com/search/?query=NZXT+H510+Flow' },
                psu: { name: '650W 80+ Gold', amazon: 'https://www.amazon.es/s?k=fuente+650W+80+plus+gold', pccomp: 'https://www.pccomponentes.com/search/?query=fuente+650W+80+plus+gold' }
            },
            high: {
                cpu: { name: 'AMD Ryzen 7 7800X3D', amazon: 'https://www.amazon.es/s?k=AMD+Ryzen+7+7800X3D', pccomp: 'https://www.pccomponentes.com/search/?query=AMD+Ryzen+7+7800X3D' },
                gpu: { name: 'NVIDIA RTX 4080 Super', amazon: 'https://www.amazon.es/s?k=NVIDIA+RTX+4080+Super', pccomp: 'https://www.pccomponentes.com/search/?query=RTX+4080+Super' },
                ram: { name: '32GB DDR5 6000MHz', amazon: 'https://www.amazon.es/s?k=32GB+DDR5+6000MHz', pccomp: 'https://www.pccomponentes.com/search/?query=32GB+DDR5+6000MHz' },
                storage: { name: '2TB NVMe Gen4', amazon: 'https://www.amazon.es/s?k=2TB+NVMe+Gen4', pccomp: 'https://www.pccomponentes.com/search/?query=2TB+NVMe+Gen4' },
                case: { name: 'Lian Li O11 Dynamic EVO', amazon: 'https://www.amazon.es/s?k=Lian+Li+O11+Dynamic+EVO', pccomp: 'https://www.pccomponentes.com/search/?query=Lian+Li+O11+Dynamic+EVO' },
                psu: { name: '850W 80+ Gold Modular', amazon: 'https://www.amazon.es/s?k=fuente+850W+80+plus+gold+modular', pccomp: 'https://www.pccomponentes.com/search/?query=fuente+850W+80+plus+gold+modular' }
            }
        },
        editing: {
            low: {
                cpu: { name: 'AMD Ryzen 5 5600', amazon: 'https://www.amazon.es/s?k=AMD+Ryzen+5+5600', pccomp: 'https://www.pccomponentes.com/search/?query=AMD+Ryzen+5+5600' },
                gpu: { name: 'NVIDIA RTX 3050', amazon: 'https://www.amazon.es/s?k=NVIDIA+RTX+3050', pccomp: 'https://www.pccomponentes.com/search/?query=RTX+3050' },
                ram: { name: '16GB DDR4', amazon: 'https://www.amazon.es/s?k=16GB+DDR4', pccomp: 'https://www.pccomponentes.com/search/?query=16GB+DDR4' },
                storage: { name: '1TB SSD', amazon: 'https://www.amazon.es/s?k=1TB+SSD', pccomp: 'https://www.pccomponentes.com/search/?query=1TB+SSD' },
                case: { name: 'Fractal Design Focus G', amazon: 'https://www.amazon.es/s?k=Fractal+Design+Focus+G', pccomp: 'https://www.pccomponentes.com/search/?query=Fractal+Design+Focus+G' },
                psu: { name: '500W 80+ Bronze', amazon: 'https://www.amazon.es/s?k=fuente+500W+80+plus+bronze', pccomp: 'https://www.pccomponentes.com/search/?query=fuente+500W+80+plus+bronze' }
            },
            mid: {
                cpu: { name: 'Intel Core i5-13600K', amazon: 'https://www.amazon.es/s?k=Intel+Core+i5-13600K', pccomp: 'https://www.pccomponentes.com/search/?query=Intel+Core+i5-13600K' },
                gpu: { name: 'NVIDIA RTX 4060 16GB', amazon: 'https://www.amazon.es/s?k=NVIDIA+RTX+4060', pccomp: 'https://www.pccomponentes.com/search/?query=RTX+4060' },
                ram: { name: '32GB DDR5', amazon: 'https://www.amazon.es/s?k=32GB+DDR5', pccomp: 'https://www.pccomponentes.com/search/?query=32GB+DDR5' },
                storage: { name: '1TB Gen4 SSD', amazon: 'https://www.amazon.es/s?k=1TB+NVMe+Gen4', pccomp: 'https://www.pccomponentes.com/search/?query=1TB+NVMe+Gen4' },
                case: { name: 'Corsair 4000D Airflow', amazon: 'https://www.amazon.es/s?k=Corsair+4000D+Airflow', pccomp: 'https://www.pccomponentes.com/search/?query=Corsair+4000D+Airflow' },
                psu: { name: '750W 80+ Gold', amazon: 'https://www.amazon.es/s?k=fuente+750W+80+plus+gold', pccomp: 'https://www.pccomponentes.com/search/?query=fuente+750W+80+plus+gold' }
            },
            high: {
                cpu: { name: 'Intel Core i9-14900K', amazon: 'https://www.amazon.es/s?k=Intel+Core+i9-14900K', pccomp: 'https://www.pccomponentes.com/search/?query=Intel+Core+i9-14900K' },
                gpu: { name: 'NVIDIA RTX 4090', amazon: 'https://www.amazon.es/s?k=NVIDIA+RTX+4090', pccomp: 'https://www.pccomponentes.com/search/?query=RTX+4090' },
                ram: { name: '64GB DDR5', amazon: 'https://www.amazon.es/s?k=64GB+DDR5', pccomp: 'https://www.pccomponentes.com/search/?query=64GB+DDR5' },
                storage: { name: '2TB Gen5 SSD + 4TB HDD', amazon: 'https://www.amazon.es/s?k=2TB+NVMe+Gen5', pccomp: 'https://www.pccomponentes.com/search/?query=2TB+NVMe+Gen5' },
                case: { name: 'Corsair 5000D Airflow', amazon: 'https://www.amazon.es/s?k=Corsair+5000D+Airflow', pccomp: 'https://www.pccomponentes.com/search/?query=Corsair+5000D+Airflow' },
                psu: { name: '1000W 80+ Platinum Modular', amazon: 'https://www.amazon.es/s?k=fuente+1000W+80+plus+platinum+modular', pccomp: 'https://www.pccomponentes.com/search/?query=fuente+1000W+80+plus+platinum+modular' }
            }
        },
        office: {
            low: {
                cpu: { name: 'Intel Pentium Gold', amazon: 'https://www.amazon.es/s?k=Intel+Pentium+Gold', pccomp: 'https://www.pccomponentes.com/search/?query=Intel+Pentium+Gold' },
                gpu: { name: 'Gráficos Integrados', amazon: '#', pccomp: '#' },
                ram: { name: '8GB DDR4', amazon: 'https://www.amazon.es/s?k=8GB+DDR4', pccomp: 'https://www.pccomponentes.com/search/?query=8GB+DDR4' },
                storage: { name: '256GB SSD', amazon: 'https://www.amazon.es/s?k=256GB+SSD', pccomp: 'https://www.pccomponentes.com/search/?query=256GB+SSD' },
                case: { name: 'Aerocool Cylon Mini', amazon: 'https://www.amazon.es/s?k=Aerocool+Cylon+Mini', pccomp: 'https://www.pccomponentes.com/search/?query=Aerocool+Cylon+Mini' },
                psu: { name: '400W 80+', amazon: 'https://www.amazon.es/s?k=fuente+400W+80+plus', pccomp: 'https://www.pccomponentes.com/search/?query=fuente+400W' }
            },
            mid: {
                cpu: { name: 'Intel Core i3-12100', amazon: 'https://www.amazon.es/s?k=Intel+Core+i3-12100', pccomp: 'https://www.pccomponentes.com/search/?query=Intel+Core+i3-12100' },
                gpu: { name: 'Gráficos Integrados', amazon: '#', pccomp: '#' },
                ram: { name: '16GB DDR4', amazon: 'https://www.amazon.es/s?k=16GB+DDR4', pccomp: 'https://www.pccomponentes.com/search/?query=16GB+DDR4' },
                storage: { name: '500GB SSD', amazon: 'https://www.amazon.es/s?k=500GB+SSD', pccomp: 'https://www.pccomponentes.com/search/?query=500GB+SSD' },
                case: { name: 'Cooler Master N200', amazon: 'https://www.amazon.es/s?k=Cooler+Master+N200', pccomp: 'https://www.pccomponentes.com/search/?query=Cooler+Master+N200' },
                psu: { name: '450W 80+ Bronze', amazon: 'https://www.amazon.es/s?k=fuente+450W+80+plus+bronze', pccomp: 'https://www.pccomponentes.com/search/?query=fuente+450W+80+plus+bronze' }
            },
            high: {
                cpu: { name: 'AMD Ryzen 5 8600G', amazon: 'https://www.amazon.es/s?k=AMD+Ryzen+5+8600G', pccomp: 'https://www.pccomponentes.com/search/?query=AMD+Ryzen+5+8600G' },
                gpu: { name: 'Radeon 760M (iGPU)', amazon: '#', pccomp: '#' },
                ram: { name: '32GB DDR5', amazon: 'https://www.amazon.es/s?k=32GB+DDR5', pccomp: 'https://www.pccomponentes.com/search/?query=32GB+DDR5' },
                storage: { name: '1TB SSD', amazon: 'https://www.amazon.es/s?k=1TB+SSD', pccomp: 'https://www.pccomponentes.com/search/?query=1TB+SSD' },
                case: { name: 'Fractal Design Define 7 Compact', amazon: 'https://www.amazon.es/s?k=Fractal+Design+Define+7+Compact', pccomp: 'https://www.pccomponentes.com/search/?query=Fractal+Design+Define+7+Compact' },
                psu: { name: '550W 80+ Gold', amazon: 'https://www.amazon.es/s?k=fuente+550W+80+plus+gold', pccomp: 'https://www.pccomponentes.com/search/?query=fuente+550W+80+plus+gold' }
            }
        },
        coding: {
            low: {
                cpu: { name: 'AMD Ryzen 5 5600G', amazon: 'https://www.amazon.es/s?k=AMD+Ryzen+5+5600G', pccomp: 'https://www.pccomponentes.com/search/?query=AMD+Ryzen+5+5600G' },
                gpu: { name: 'Integrada', amazon: '#', pccomp: '#' },
                ram: { name: '16GB DDR4', amazon: 'https://www.amazon.es/s?k=16GB+DDR4', pccomp: 'https://www.pccomponentes.com/search/?query=16GB+DDR4' },
                storage: { name: '500GB SSD', amazon: 'https://www.amazon.es/s?k=500GB+SSD', pccomp: 'https://www.pccomponentes.com/search/?query=500GB+SSD' },
                case: { name: 'Thermaltake Versa H18', amazon: 'https://www.amazon.es/s?k=Thermaltake+Versa+H18', pccomp: 'https://www.pccomponentes.com/search/?query=Thermaltake+Versa+H18' },
                psu: { name: '450W 80+ Bronze', amazon: 'https://www.amazon.es/s?k=fuente+450W+80+plus+bronze', pccomp: 'https://www.pccomponentes.com/search/?query=fuente+450W+80+plus+bronze' }
            },
            mid: {
                cpu: { name: 'Intel Core i5-13400F', amazon: 'https://www.amazon.es/s?k=Intel+Core+i5-13400F', pccomp: 'https://www.pccomponentes.com/search/?query=Intel+Core+i5-13400F' },
                gpu: { name: 'Radeon RX 6600', amazon: 'https://www.amazon.es/s?k=Radeon+RX+6600', pccomp: 'https://www.pccomponentes.com/search/?query=Radeon+RX+6600' },
                ram: { name: '32GB DDR4', amazon: 'https://www.amazon.es/s?k=32GB+DDR4', pccomp: 'https://www.pccomponentes.com/search/?query=32GB+DDR4' },
                storage: { name: '1TB NVMe', amazon: 'https://www.amazon.es/s?k=1TB+NVMe', pccomp: 'https://www.pccomponentes.com/search/?query=1TB+NVMe' },
                case: { name: 'be quiet! Pure Base 500DX', amazon: 'https://www.amazon.es/s?k=be+quiet+Pure+Base+500DX', pccomp: 'https://www.pccomponentes.com/search/?query=be+quiet+Pure+Base+500DX' },
                psu: { name: '650W 80+ Gold', amazon: 'https://www.amazon.es/s?k=fuente+650W+80+plus+gold', pccomp: 'https://www.pccomponentes.com/search/?query=fuente+650W+80+plus+gold' }
            },
            high: {
                cpu: { name: 'AMD Ryzen 9 7900X', amazon: 'https://www.amazon.es/s?k=AMD+Ryzen+9+7900X', pccomp: 'https://www.pccomponentes.com/search/?query=AMD+Ryzen+9+7900X' },
                gpu: { name: 'NVIDIA RTX 4070', amazon: 'https://www.amazon.es/s?k=NVIDIA+RTX+4070', pccomp: 'https://www.pccomponentes.com/search/?query=RTX+4070' },
                ram: { name: '64GB DDR5', amazon: 'https://www.amazon.es/s?k=64GB+DDR5', pccomp: 'https://www.pccomponentes.com/search/?query=64GB+DDR5' },
                storage: { name: '2TB NVMe Gen4', amazon: 'https://www.amazon.es/s?k=2TB+NVMe+Gen4', pccomp: 'https://www.pccomponentes.com/search/?query=2TB+NVMe+Gen4' },
                case: { name: 'Fractal Design Meshify 2', amazon: 'https://www.amazon.es/s?k=Fractal+Design+Meshify+2', pccomp: 'https://www.pccomponentes.com/search/?query=Fractal+Design+Meshify+2' },
                psu: { name: '750W 80+ Gold Modular', amazon: 'https://www.amazon.es/s?k=fuente+750W+80+plus+gold+modular', pccomp: 'https://www.pccomponentes.com/search/?query=fuente+750W+80+plus+gold+modular' }
            }
        }
    };

    function showResult() {
        // Fallback or specific logic
        let rec = recommendations[currentSelection.usage][currentSelection.budget];

        // Handle edge case just in case
        if (!rec) rec = recommendations.gaming.mid;

        // Helper function to create component HTML with links
        const createComponentHTML = (icon, label, component) => {
            const linksHTML = component.amazon !== '#' || component.pccomp !== '#' ? `
                <div class="buy-links">
                    ${component.amazon !== '#' ? `<a href="${component.amazon}" target="_blank" rel="noopener" class="buy-btn amazon-btn"><i class="fa-brands fa-amazon"></i> Amazon</a>` : ''}
                    ${component.pccomp !== '#' ? `<a href="${component.pccomp}" target="_blank" rel="noopener" class="buy-btn pccomp-btn"><i class="fa-solid fa-desktop"></i> PcComp</a>` : ''}
                </div>
            ` : '';

            return `
                <div class="spec-item">
                    <div class="spec-info">
                        <span class="spec-label"><i class="${icon}"></i> ${label}</span>
                        <span class="spec-value highlight">${component.name}</span>
                    </div>
                    ${linksHTML}
                </div>
            `;
        };

        const html = `
            <div class="result-card">
                ${createComponentHTML('fa-solid fa-microchip', 'Procesador', rec.cpu)}
                ${createComponentHTML('fa-solid fa-memory', 'Tarjeta Gráfica', rec.gpu)}
                ${createComponentHTML('fa-solid fa-sd-card', 'Memoria RAM', rec.ram)}
                ${createComponentHTML('fa-solid fa-hard-drive', 'Almacenamiento', rec.storage)}
                ${createComponentHTML('fa-solid fa-box', 'Caja', rec.case)}
                ${createComponentHTML('fa-solid fa-plug', 'Fuente de Alimentación', rec.psu)}
            </div>
            <p style="margin-top: 20px; font-size: 0.9rem; color: var(--text-muted);">
                *Nota: Estas son recomendaciones de referencia. Los precios y disponibilidad pueden variar.
            </p>
        `;

        recommendationBox.innerHTML = html;
    }
});
