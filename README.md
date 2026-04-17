# 🖥️ Mundo PC | Configurador Interactivo

Bienvenido a **Mundo PC**, la herramienta definitiva para entusiastas del hardware. Este proyecto ofrece un configurador de PC interactivo con validación de compatibilidad en tiempo real y sincronización automática de precios.

## 🚀 Características Principales

- **Configurador Inteligente**: Selección de componentes paso a paso con filtrado dinámico.
- **Motor de Compatibilidad**:
  - Verificación de **Socket** (CPU vs Placa Base).
  - Verificación de **Tipo de Memoria** (DDR4 vs DDR5).
  - Cálculo de **Potencia Requerida** (GPU vs Fuente de Alimentación).
- **Sincronización Diaria**: Los precios se actualizan automáticamente desde fuentes externas como Amazon y PcComponentes.
- **Enlaces a Tiendas Reales**: Botones directos para verificar el precio real y disponibilidad en un clic.
- **Modo Oscuro/Claro**: Interfaz premium adaptada a tus preferencias.

## 📂 Estructura del Proyecto

- `index.html`: Página principal (Landing Page).
- `builder.html`: Herramienta de configuración de PC.
- `assets/`:
  - `css/`: Estilos del sitio.
  - `js/`: Lógica del configurador (`builder.js`) y de la landing (`landing.js`).
  - `img/`: Recursos gráficos y fotografías de componentes.
- `tools/`: Script de sincronización de catálogo (`sync.mjs`).
- `.github/workflows/`: Automatización para la actualización diaria de precios.

## ⚙️ Automatización (Daily Sync)

El proyecto incluye un flujo de trabajo de **GitHub Actions** que se ejecuta cada noche a las 3:00 AM. 
1. Escanea los componentes en `assets/js/builder.js`.
2. Busca los precios más recientes.
3. Actualiza el catálogo y la fecha de sincronización en la web.

## 🛠️ Instalación Local

Si quieres trabajar en el proyecto localmente:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Alvite24/BETA.git
   ```
2. Ejecuta un servidor local (ej. Live Server en VS Code o `npx serve .`).
3. Para sincronizar precios manualmente, necesitas Node.js instalado:
   ```bash
   node tools/sync.mjs
   ```

## 🤝 Créditos

Proyecto desarrollado por **Alvite24** y **Mundo PC Team**.
