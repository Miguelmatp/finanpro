# FinanPro

Dashboard de finanzas personales hecho con React, TypeScript, Vite, Tailwind y Recharts.
Los datos se guardan en el navegador (localStorage), así que no necesita servidor ni cuesta nada.

## Usar

```bash
npm install
npm run dev      # desarrollo en http://localhost:5173
npm run build    # genera la carpeta dist/
```

Al abrirlo por primera vez verás datos de ejemplo. Para empezar de cero usa
"Restablecer datos" en el menú lateral.

## Publicar gratis

Sube el proyecto a GitHub y conéctalo a Vercel, Netlify o Cloudflare Pages
(comando de build: `npm run build`, carpeta de salida: `dist`).

Importante: con localStorage los datos viven en cada navegador. Si publicas la web,
cada persona que entre verá solo sus propios datos y nada se sincroniza entre dispositivos.

## Pasar a base de datos en la nube

Toda la lectura y escritura de datos está en `src/hooks/useFinance.ts`.
Para usar Supabase o Firebase solo hay que reemplazar el cuerpo de esas funciones.

## Estructura

- `src/views/`: Dashboard y Transacciones
- `src/components/`: tarjetas, gráficos, formulario, menú
- `src/hooks/`: datos (`useFinance`) y persistencia (`useLocalStorage`)
- `src/lib/`: cálculos, formato y datos de ejemplo
