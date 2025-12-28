<script lang="ts" setup>
withDefaults(
  defineProps<{
    title?: string;
  }>(),
  {
    title: 'VLSM Visualizer',
  }
);
</script>
<template>
  <header class="flex items-center justify-between p-4">
    <h1 class="text-xl font-semibold">{{ title }}</h1>
    <slot />
  </header>
</template>
