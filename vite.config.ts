import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';
import Markdown from 'unplugin-vue-markdown/vite';
import MarkdownItAnchor from 'markdown-it-anchor';
import Shiki from '@shikijs/markdown-it';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      async markdownItSetup(md) {
        md.use(MarkdownItAnchor, {
          permalink: MarkdownItAnchor.permalink.headerLink()
        });
        md.use(await Shiki({
          themes: {
            light: 'houston',
            dark: 'houston',
          }
        }));
      },
      wrapperClasses: 'w-full min-w-0 markdown-body break-words prose dark:prose-invert md:mx-12',
    }),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
});
