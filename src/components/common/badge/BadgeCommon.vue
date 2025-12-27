<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import type { Props } from '.';

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
});
</script>

<template>
  <Badge :variant="props.variant">
    <slot></slot>
  </Badge>
</template>
