# Portfolio 2026

Portfolio personal de Álvaro Fernández Prieto. Desarrollo web y automatización con IA.

## Stack

- Vite + React + TypeScript
- TailwindCSS v4
- Framer Motion
- React Router DOM

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
```

## Deploy en Vercel

1. Conecta el repositorio a Vercel
2. Vercel detectará automáticamente que es un proyecto Vite
3. Deploy automático en cada push

## Estructura

```
src/
  app/          → Router y Layout
  pages/        → Páginas (Home, Projects, Contact)
  sections/     → Secciones de las páginas
  components/   → Componentes reutilizables
  content/      → Contenido centralizado
  styles/       → Estilos globales y tokens
```

## Editar contenido

Todo el contenido está en `src/content/content.ts`. También hay una versión legible en `CONTENT.md` en la raíz.
