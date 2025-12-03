import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment',
    // Isso injeta a importação necessária automaticamente em todos os arquivos
    jsxInject: `import { createElement } from 'inferno-create-element'`
  }
});