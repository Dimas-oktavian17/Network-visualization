<script setup lang="ts">
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import type { AlertCommonProps } from '.';
withDefaults(defineProps<AlertCommonProps>(), {
  title: 'Success! Your changes have been saved',
  description: 'This is an alert with icon, title and description.',
  variant: 'destructive',
});
</script>

<template>
  <div class="grid w-full  items-start gap-4">
    <Alert :variant="variant">
      <slot name="icon" />
      <AlertTitle>{{ title }}</AlertTitle>
      <AlertDescription>
        {{ description }}
      </AlertDescription>
    </Alert>
  </div>
</template>
