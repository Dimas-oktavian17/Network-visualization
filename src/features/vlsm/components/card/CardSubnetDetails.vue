<script lang="ts" setup>
import CardCommon from '@/components/common/card/CardCommon.vue';
import CardFooter from '@/components/ui/card/CardFooter.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import { ref } from 'vue';
import type { SubnetCalculated } from '../../types';
import ItemSubnetDetails from '../item/ItemSubnetDetails.vue';

defineProps<{
  data: SubnetCalculated[],
}>();

const activeStates = ref<Record<number, boolean>>({});

const toggleActive = (index: number) => {
  activeStates.value[index] = !activeStates.value[index];
};

const isActive = (index: number) => {
  return activeStates.value[index] ?? false;
};
</script>

<template>
  <CardCommon v-for="(item, index) in data" :key="index" @click="toggleActive(index)"
    :style="{ borderLeft: `8px solid ${item.color}` }" class="bg-muted w-full max-w-full" :title="item.subnet.room" ;
    :description="`/${item.cidr} (${item.totalIps} IPs)`">
    <template #header-action>
      <header class="flex flex-col">
        <span class="text-sm font-medium text-muted-foreground">USAGE</span>
        <span class="text-sm font-medium text-black dark:text-white">
          {{ item.subnet.hosts }}/{{ item.usableHosts }}
        </span>
      </header>
    </template>

    <template #content>
      <CardContent class="px-6 gap-4 space-y-4">
        <div class="flex w-full flex-row justify-start items-center relative">
          <header class="w-1/2 flex flex-col">
            <span class="text-sm font-medium text-muted-foreground">NETWORK</span>
            <span class="text-sm font-medium text-black dark:text-white">
              {{ item.network }}
            </span>
          </header>

          <footer class="flex w-1/2 flex-col">
            <span class="text-sm font-medium text-muted-foreground">BROADCAST</span>
            <span class="text-sm font-medium text-black dark:text-white">
              {{ item.broadcast }}
            </span>
          </footer>
        </div>

        <div class="container dark:bg-input/30 border flex rounded-lg items-start flex-col space-y-2">
          <header class="text-sm pt-4 font-semibold w-full text-muted-foreground">
            USABLE RANGE
          </header>
          <span class="text-sm pb-4 font-medium text-black dark:text-white">
            {{ item.start }} - {{ item.end }}
          </span>
        </div>
      </CardContent>
    </template>

    <template #footer>
      <Transition>
        <section v-if="isActive(index)">
          <CardFooter>
            <ItemSubnetDetails :allocated="item.subnet.hosts" :avaible="item.usableHosts - item.subnet.hosts">
              <slot name="footer" />
            </ItemSubnetDetails>
          </CardFooter>
          <div class="container grid grid-cols-2 gap-4">
            <div class="container dark:bg-input/30 border flex rounded-lg items-start flex-col space-y-2">
              <header class="text-sm pt-4 font-semibold w-full text-muted-foreground">
                START IP
              </header>
              <span class="text-sm pb-4 font-medium text-black dark:text-white">
                {{ item.start }}
              </span>
            </div>
            <div class="container dark:bg-input/30 border flex rounded-lg items-start flex-col space-y-2">
              <header class="text-sm pt-4 font-semibold w-full text-muted-foreground">
                END IP
              </header>
              <span class="text-sm pb-4 font-medium text-black dark:text-white">
                {{ item.end }}
              </span>
            </div>
          </div>
        </section>
      </Transition>
    </template>
  </CardCommon>
</template>
