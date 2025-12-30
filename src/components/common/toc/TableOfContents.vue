<!-- src/components/TableOfContents.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface TocItem {
  id: string;
  text: string;
  level?: number;
}

const items = ref<TocItem[]>([]);

onMounted(() => {
  setTimeout(() => {
    const headings = document.querySelectorAll('.markdown-body h1, .markdown-body h2, .markdown-body h3');

    items.value = Array.from(headings).map(h => {
      const level = h.tagName && h.tagName[1] ? parseInt(h.tagName[1]) : 0; // set level to 0 if it's null
      return {
        id: h.id,
        text: h.textContent?.replace('#', '').trim() || '',
        level: level
      };
    });

    // Active highlight
    const o = new IntersectionObserver(
      e => e.forEach(x => {
        if (x.isIntersecting) {
          document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('toc-active'));
          document.querySelector(`.toc-link[href="#${x.target.id}"]`)?.classList.add('toc-active');
        }
      }),
      { rootMargin: '-100px 0px -66%' }
    );
    headings.forEach(h => o.observe(h));
  }, 100);
});
</script>

<template>
  <div v-if="items.length" class="p-4 xl:w-1/3 w-1/4 top-auto  right-0 fixed">
    <h4 class="text-sm font-semibold text-gray-300 mb-3 uppercase">On This Page</h4>
    <nav class="space-y-1.5">
      <a v-for="item in items" :key="item.id" :href="`#${item.id}`" class="toc-link block text-sm text-gray-400 no-underline transition-all py-1.5 px-2 rounded hover:text-gray-200
      hover:bg-gray-700/50" :class="{
        'pl-2': item.level === 1,
        'pl-5': item.level === 2,
        'pl-8': item.level === 3,
      }">
        {{ item.text }}
      </a>
    </nav>
  </div>
</template>
