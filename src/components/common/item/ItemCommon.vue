<script setup lang="ts">
import {
  Item,
} from '@/components/ui/item';
</script>

<template>
  <div class="flex w-full  flex-col gap-6">
    <Item variant="muted">
      <slot />
    </Item>
  </div>
</template>
