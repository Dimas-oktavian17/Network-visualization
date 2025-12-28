<template>
  <CardCommon class="bg-muted w-full max-w-svh">
    <template #content>
      <div class="relative">
        <Input v-model="octets" disabled type="string" placeholder="127.0.0.1" class="pr-10" />
        <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none">
          <CircleCheck class="size-5 text-green-500 mr-2" />
        </div>
      </div>
    </template>
    <template #footer>
      <CardFooter class="flex items-start flex-col gap-2">
        testing footer
      </CardFooter>
    </template>
  </CardCommon>
</template>

<script lang="ts" setup>
import CardCommon from '@/components/common/card/CardCommon.vue';
import CardFooter from '@/components/ui/card/CardFooter.vue';
import Input from '@/components/ui/input/Input.vue';
import { CircleCheck } from 'lucide-vue-next';
import { computed, ref } from 'vue';

const octets = ref<string>("192.168.1.0");

// octetsChunking
const octetsConfig = computed(() => {
  return octets.value.split('.').map((octet) => parseInt(octet));
});
</script>

<style></style>
