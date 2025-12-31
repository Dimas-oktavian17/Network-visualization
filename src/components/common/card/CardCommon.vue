<script setup lang="ts">
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

withDefaults(
  defineProps<{
    title?: string;
    description?: string;
  }>(),
  {
    title: 'NETWORK CONFIGURATION',
    description: ' Major Network Address',
  });
</script>

<template>
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
      <CardDescription>
        {{ description }}
      </CardDescription>
      <CardAction>
        <slot name="header-action" />
      </CardAction>
    </CardHeader>
    <slot name="content" />
    <slot name="footer" />
  </Card>
</template>
