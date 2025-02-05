# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


```
my-latex-converter-extension/
├── public/
│   ├── manifest.json
│   └── icon.png
├── src/
│   ├── main.tsx
│   └── Popup.tsx
├── index.html
├── vite.config.ts
└── package.json
```


```
dist/
├── manifest.json    // publicからコピーされた
├── icon.png         // publicからコピーされた
├── assets/
│   ├── index-xxxx.js
│   ├── index-xxxx.css
│   └── ...
└── index.html
```
