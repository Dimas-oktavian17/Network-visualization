<script lang="ts" setup>
import CardCommon from '@/components/common/card/CardCommon.vue';
import CardAction from '@/components/ui/card/CardAction.vue';
import CardFooter from '@/components/ui/card/CardFooter.vue';
import Input from '@/components/ui/input/Input.vue';
import Slider from '@/components/ui/slider/Slider.vue';
import { CircleCheck } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { useVisualizationStore } from '@/features/vlsm/store/VisualizationStore';
import ItemSubnetDetails from '../item/ItemSubnetDetails.vue';
import { ref } from 'vue';

const { CIDRList, octets, cidrPrefix } = storeToRefs(useVisualizationStore());

const props = defineProps<{
  header: {
    title: string;
    description: string;
    actions: string;
  },

}>();
const active = ref(true);
</script>

<template>
  <CardCommon @click="active = !active" class="border-l-8 border-l-red-500 bg-muted w-full max-w-full"
    :title="props.header.title" ; :description="props.header.description">
    <template #header-action>
      <header class="flex flex-col">
        <span class="text-sm font-medium text-muted-foreground">USAGE</span>
        <span class="text-sm font-medium text-black dark:text-white">
          {{ props.header.actions }}
        </span>
      </header>
    </template>
    <template #content>
      <CardContent class="px-6 gap-4 space-y-4">
        <div class="flex w-full flex-row justify-start items-center relative">
          <header class="w-1/2 flex flex-col">
            <span class="text-sm font-medium text-muted-foreground">NETWORK</span>
            <span class="text-sm font-medium text-black dark:text-white">192.168.1.0</span>
          </header>

          <footer class="flex w-1/2 flex-col">
            <span class="text-sm font-medium text-muted-foreground">BROADCAST</span>
            <span class="text-sm font-medium text-black dark:text-white">192.168.1.0</span>
          </footer>
        </div>
        <div class="container dark:bg-input/30 border flex rounded-lg items-start flex-col  space-y-2">
          <header class="text-sm pt-4 font-semibold w-full text-muted-foreground">
            USABLE RANGE
          </header>
          <span class="text-sm pb-4 font-medium text-black dark:text-white">
            192.168.1.0 - 244.178.44.111
          </span>
        </div>
      </CardContent>
    </template>
    <template #footer>
      <Transition>
        <section v-if="active">
          <CardFooter>
            <slot name="footer" />
          </CardFooter>
          <div class="container grid grid-cols-2 gap-4">
            <div class="container dark:bg-input/30 border flex rounded-lg items-start flex-col  space-y-2">
              <header class="text-sm pt-4 font-semibold w-full text-muted-foreground">
                START IP
              </header>
              <span class="text-sm pb-4 font-medium text-black dark:text-white">
                192.168.1.0 - 244.178.44.111
              </span>
            </div>
            <div class="container dark:bg-input/30 border flex rounded-lg items-start flex-col  space-y-2">
              <header class="text-sm pt-4 font-semibold w-full text-muted-foreground">
                END IP
              </header>
              <span class="text-sm pb-4 font-medium text-black dark:text-white">
                192.168.1.0 - 244.178.44.111
              </span>
            </div>
          </div>
        </section>
      </Transition>
    </template>
  </CardCommon>
</template>


<style></style>
