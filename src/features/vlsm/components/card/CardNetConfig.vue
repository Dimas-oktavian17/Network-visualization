<template>
  <CardCommon class="bg-muted w-full max-w-full">
    <template #content>
      <div class="relative">
        <Input v-model="octets" disabled type="string" placeholder="127.0.0.1" class="pr-10" />
        <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none">
          <CircleCheck class="size-5 text-green-500 mr-2" />
        </div>
      </div>
    </template>
    <template #footer>
      <CardFooter class="flex items-start flex-col gap-2 space-y-4">
        <header class="text-sm font-medium w-full text-muted-foreground grid grid-cols-2">
          CIDR Prefix
          <CardAction class="text-white">/{{ cidrPrefix[0] }}</CardAction>
        </header>
        <Slider v-model="cidrPrefix" :default-value="[24]" :min="8" :max="30" :step="1">
        </Slider>
        <div class="flex gap-4 w-full justify-between items-center">
          <span class="text-sm font-medium" v-for="(item, index) in CIDRList" :key="index">/{{ item }}</span>
        </div>
      </CardFooter>
    </template>
  </CardCommon>
</template>

<script lang="ts" setup>
import CardCommon from '@/components/common/card/CardCommon.vue';
import CardAction from '@/components/ui/card/CardAction.vue';
import CardFooter from '@/components/ui/card/CardFooter.vue';
import Input from '@/components/ui/input/Input.vue';
import Slider from '@/components/ui/slider/Slider.vue';
import { CircleCheck } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { useVisualizationStore } from '@/features/vlsm/store/VisualizationStore';

const { CIDRList, octets, cidrPrefix } = storeToRefs(useVisualizationStore());
</script>

<style></style>
