<script lang="ts" setup>
import CardCommon from '@/components/common/card/CardCommon.vue';
import CardFooter from '@/components/ui/card/CardFooter.vue';
import type { CardAllocationProps } from './types';

withDefaults(defineProps<CardAllocationProps>(), {
  headerTitle: 'TOTAL IPS',
  headerDescription: 256,
  footerTitle: 'AVAILABLE',
  footerDescription: 256
});
</script>
<template>
  <CardCommon title="" description="" class="pb-12 bg-muted gap-y-4 w-full max-w-full">
    <template #content>
      <CardContent class="px-6 flex items-start flex-col gap-2">
        <CardTitle class="text-muted-foreground font-medium text-lg">
          {{ headerTitle }}
        </CardTitle>
        <CardDescription class="dark:text-white text-black font-semibold text-4xl">
          {{ headerDescription }}
        </CardDescription>
      </CardContent>
    </template>
    <template #footer>
      <CardFooter class="flex items-start flex-col gap-2">
        <CardTitle class="text-muted-foreground font-medium text-lg">
          {{ footerTitle }}
        </CardTitle>
        <CardDescription class="dark:text-green-500 text-black font-semibold text-4xl">
          {{ footerDescription }}
        </CardDescription>
      </CardFooter>
    </template>
  </CardCommon>
</template>



<style></style>
