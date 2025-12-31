<script setup lang="ts">
import NavMenuCommon from '@/components/common/navigation-menu/NavMenuCommon.vue';
import SidebarLayout from '@/components/layout/sidebar/SidebarLayout.vue';
import HeaderVisualizer from '../components/header/HeaderVisualizer.vue';
import HeaderToggle from '../components/header/HeaderToggle.vue';
import CardNetConfig from '../components/card/CardNetConfig.vue';
import IntroContent from '@/features/guide/components/IntroContent.vue';
import AlertCommon from '@/components/common/alert/AlertCommon.vue';
import { CircleAlert } from 'lucide-vue-next';
import { useVisualizationStore } from '../store/VisualizationStore';
import { storeToRefs } from 'pinia';
import FormsCalculate from '../components/forms/FormsCalculate.vue';
import ItemSubnets from '../components/item/ItemSubnets.vue';
import { useSubnetsStore } from '../store/SubentsStore';
const visualStore = useVisualizationStore();
const subnetStore = useSubnetsStore();
const { SubnetsDataComputed, unsupportedClassAlert, SubnetsData } = storeToRefs(visualStore);
const { optimalSubnets } = storeToRefs(subnetStore);
// Subnets calculation on mount
const calculateSubnets = () => subnetStore.SubnetsCalculated(SubnetsData.value);
</script>

<template>
  <div>
    <NavMenuCommon />
    <SidebarLayout>
      <div class="grid gap-4 md:grid-cols-2 w-full min-w-0">
        <div class="w-full max-w-full space-y-4">
          <!-- Visualization header -->
          <HeaderVisualizer>
            <HeaderToggle></HeaderToggle>
          </HeaderVisualizer>
          <!-- Alert -->
          <Transition>
            <AlertCommon v-if="unsupportedClassAlert" class="transition-all max-w-full w-full duration-1000"
              title="The current version of VLSM only supports Class C."
              description="We are working on adding support for Class A and Class B.">
              <template #icon>
                <CircleAlert class="size-5 text-destructive" />
              </template>
            </AlertCommon>
          </Transition>
          <!-- /Visualization content -->
          <CardNetConfig></CardNetConfig>
          <TransitionGroup>
            <Transition v-for="(item, index) in SubnetsDataComputed" :key="index" name="fade">
              <ItemSubnets @remove="visualStore.removeSubnet(item.id)" :title="item.room"
                :description="`Need ${item.hosts} hosts`" :avatar="item.room" />
            </Transition>
          </TransitionGroup>
          <FormsCalculate @calculate="calculateSubnets" />
          {{ optimalSubnets }}
        </div>
        <IntroContent />
      </div>
    </SidebarLayout>
  </div>
</template>
