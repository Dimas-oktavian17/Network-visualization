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
import CardAllocation from '../components/card/CardAllocation.vue';
import CardAllocationChart from '../components/card/CardAllocationChart.vue';
import Card from '@/components/ui/card/Card.vue';
import CardSpaceChart from '../components/card/CardSpaceChart.vue';
import { useSpaceVisualStore } from '../store/SpaceVisualStore';
import CardSubnetDetails from '../components/card/CardSubnetDetails.vue';
import { Toaster } from 'vue-sonner';

const visualStore = useVisualizationStore();
const subnetStore = useSubnetsStore();
const { totalIps, SubnetsDataComputed, unsupportedClassAlert, SubnetsData } =
  storeToRefs(visualStore);
const { optimalSubnets, totalAvaibleIps } = storeToRefs(subnetStore);
const { allocatedIps, subnetDetails } = storeToRefs(useSpaceVisualStore());
// Subnets calculation on mount
const calculateSubnets = () => subnetStore.SubnetsCalculated(SubnetsData.value);
</script>

<template>
  <div>
    <Toaster />
    <NavMenuCommon />
    <SidebarLayout>
      <div class="grid gap-4 md:grid-cols-2 w-full min-w-0">
        <div class="w-full max-w-full space-y-4">
          <!-- Visualization header -->
          <HeaderVisualizer>
            <HeaderToggle :json_data="subnetDetails" />
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
          <!-- Allocation -->
          <Card class="w-full max-w-full outline-none shadow-none border-none bg-inherit">
            <CardHeader>
              <Item class="flex justify-between items-center">
                <ItemContent>
                  <ItemTitle>Allocation Summary</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <BadgeCommon variant="secondary" class="rounded-sm">
                    {{ optimalSubnets }}
                  </BadgeCommon>
                </ItemActions>
              </Item>
            </CardHeader>
            <div class="grid lg:grid-cols-2 gap-4">
              <CardAllocationChart :-chart-datas="totalAvaibleIps.chartDatas" :percent="totalAvaibleIps.percent" />
              <CardAllocation :footer-description="totalAvaibleIps.avaible" :header-description="totalIps" />
            </div>
          </Card>
          <!-- address space visual -->
          <Card v-if="allocatedIps.length > 0" class="w-full max-w-full border-0">
            <CardHeader>
              <Item class="flex justify-between items-center">
                <ItemContent>
                  <ItemTitle>Address Space Visualizer</ItemTitle>
                </ItemContent>
              </Item>
            </CardHeader>
            <div class="grid gap-4">
              <CardSpaceChart :data="allocatedIps" :with-bits="true" />
            </div>
          </Card>
          <!-- Subnets Details -->
          <!-- Subnets Details -->
          <Card v-if="allocatedIps.length > 0"
            class="w-full max-w-full outline-none shadow-none border-none bg-inherit">
            <CardHeader>
              <Item class="flex justify-between items-center">
                <ItemContent>
                  <ItemTitle>Subnets Details</ItemTitle>
                </ItemContent>
              </Item>
            </CardHeader>
            <div class="grid gap-4">
              <CardSubnetDetails v-for="(subnet, index) in subnetDetails" :key="index" :data="[subnet]">
                <template #footer>
                  <CardSpaceChart :card-allocate="true" :class="'relative h-5 mb-8 space-y-4'" :data="[subnet]" />
                </template>
              </CardSubnetDetails>
            </div>
          </Card>
        </div>
        <IntroContent />
      </div>
    </SidebarLayout>
  </div>
</template>
