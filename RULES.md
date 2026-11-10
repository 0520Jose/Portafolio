# Design System & Engineering Rules — Emanuel Monzón Portfolio

Este documento establece las reglas permanentes de diseño, identidad visual y directrices de proyectos para el portafolio. **Cualquier cambio futuro debe cumplir estrictamente con este estándar.**

---

## 1. Prohibición de Tropes y Patrones de IA (Anti-patterns)

* ❌ **Cero etiquetas de búsqueda laboral genéricas**:
  * Prohibido incluir badges o textos tipo *"Disponible para nuevas oportunidades"*, *"Available for hire"*, *"Contrátame"* o *"Hire me"*.
  * Toda comunicación o llamado a la acción debe ser profesional, editorial y centrado en la ingeniería: simplemente *"Contacto"*, *"Escribir mensaje"* o *"Iniciar conversación"*.
* ❌ **Cero terminales falsas o bucles de código de mentira**:
  * Prohibido colocar ventanas simuladas con código como `while(craft & resilience) build()`.
  * La presentación técnica debe basarse en arquitectura real, métricas comprobables y fichas de especificación técnica.
* ❌ **Cero gradientes saturados o esferas de neón flotantes**:
  * Prohibidos los halos púrpuras/cianes desenfocados (`blur-[120px]`) o textos con arcoíris degradado.
* ❌ **Cero botones redundantes en Navbar**:
  * Prohibido duplicar el acceso a *"Contacto"* con un botón adicional al final del header si ya existe el enlace *"Contacto"* en el menú de navegación principal. El header debe ser conciso, limpio y minimalista.
* ❌ **Cero botones 'volver arriba' incrustados en listas de iconos del footer**:
  * El botón de volver arriba debe colocarse de forma tradicional como un botón de acción flotante perimetral (`fixed bottom-6 right-6`), visible únicamente tras hacer scroll (> 400px).
* ❌ **Cero juguetes intrusivos en el Hero**:
  * Elementos interactivos o easter eggs (como el laboratorio retro) deben estar contenidos en módulos dedicados o modales secundarios bajo demanda, nunca interrumpiendo el flujo principal.

---

## 2. Continuidad Geométrica y Sistema de Bordes (Continuous Geometry)

Todos los componentes deben compartir una continuidad visual estricta en sus bordes y radios:

* **Bordes**:
  * Grosor uniforme de **1px hairline** en todos los contenedores, botones, tarjetas, inputs y divisores.
  * Colores de borde: `border-border` (`rgba(0, 0, 0, 0.08)` en modo claro, `#262626` / `rgba(255, 255, 255, 0.08)` en modo oscuro).
* **Radios de esquina consistentes (No mezclar formas)**:
  * **Contenedores, tarjetas, modales, botones e inputs**: Exclusivamente `rounded-sm` (2px a 4px de esquina limpia y disciplinada).
  * **Tags, pills y badges técnicos**: Exclusivamente `rounded-xs` o `rounded-sm`.
  * **Prohibido**: Utilizar `rounded-full` (píldoras infladas) o `rounded-2xl` en botones y tarjetas que rompan la continuidad arquitectónica.
* **Separadores y Ritmo**:
  * Líneas divisorias de sección minimalistas: `w-12 h-[1px] bg-neutral-300 dark:bg-neutral-700`.

---

## 3. Paleta Mate y Tipografía Suiza / Editorial

* **Dark Mode**:
  * Fondo: Obsidiana mate `#0a0a0a`.
  * Superficies: `#141414` con hover `#1c1c1f`.
  * Tipografía principal: `#fafafa`, secundaria `#a3a3a3` / `#737373`.
* **Light Mode**:
  * Fondo: Blanco puro `#ffffff`.
  * Superficies: `#f8fafc` con hover `#f1f5f9`.
  * Tipografía principal: `#0a0a0a`, secundaria `#52525b`.
* **Tipografía**:
  * Títulos: `font-serif` (`Newsreader`) o `font-display` con tracking negativo (`tracking-tight leading-[1.06]`).
  * Cuerpo: `Plus Jakarta Sans` / `Inter`.
  * Metadatos: Monospaciado en mayúsculas espaciadas (`font-mono text-xs uppercase tracking-[0.2em]`).

---

## 4. Política de Selección de Proyectos y Repositorios

* **Proyectos reales del grupo y USAC**:
  * Todos los proyectos destacados deben ser sistemas genuinos desarrollados con el grupo universitario (**USAC**) o el colectivo (**@Trebol4Devop**).
  * Prohibido sugerir o insertar mods de videojuegos ajenos, experimentos personales no solicitados o proyectos sin relación con la ingeniería colaborativa del grupo.
  * Ningún proyecto debe ser autorreferencial al mismo portafolio (cero bucles reflexivos).
  * Proyectos oficiales del ecosistema:
    1. **SAMNU** (Suite de Métodos Numéricos — Web / App / Flutter / LaTeX).
    2. **PEMTREE** (Visualizador y gestor de mallas curriculares y pensum USAC).
    3. **Colectivo Trebol4Devop** (Organización de ingeniería y sistemas distribuidos).
    4. **TODOMIGOBGT** (Plataforma cívica y red de alertas en Cloudflare Workers & R2).
    5. **Cartesian Plane Library** (Motor matemático de renderizado en Canvas).
    6. **Comunidad USAC** (Ecosistema colaborativo y marketplace estudiantil USAC en Flutter & Supabase).

---

## 5. Protocolo de Verificación Obligatoria

Antes de dar por completado cualquier cambio:
1. Validar que **todos los íconos e imágenes externas** respondan con **HTTP 200 OK** (sin 403 ni 404).
2. Mantener protección defensiva `onError` en todas las imágenes.
3. Ejecutar compilación limpia: `npm run build` sin errores.
4. Ejecutar chequeo estricto de tipos: `npm run lint` (`tsc --noEmit`).
5. Mantener coherencia en los 6 idiomas (`es`, `en`, `fr`, `de`, `it`, `pt`).
