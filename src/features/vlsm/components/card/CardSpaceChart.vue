<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { useVisualizationStore } from '../../store/VisualizationStore';
import type { SubnetCalculated } from '../../types';
import type { Segment } from './types';

const props = defineProps<{
  data: SubnetCalculated[],
  class?: string,
  withBits?: boolean,
  cardAllocate?: boolean,
}>();

const data = computed(() => props.data);
const hoveredSegment = ref<Segment | null>(null);
const tooltipPos = ref({ x: 0, y: 0 });

const total = computed(() => data.value.reduce((sum, item) => sum + item.value!, 0));

const handleMouseEnter = (segment: Segment, event: MouseEvent) => {
  hoveredSegment.value = segment;
  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  tooltipPos.value = {
    x: event.clientX,
    y: rect.top - 10
  };
};

const handleMouseMove = (event: MouseEvent) => {
  tooltipPos.value = {
    x: event.clientX,
    y: event.clientY - 40
  };
};

const handleMouseLeave = () => {
  hoveredSegment.value = null;
};

const getPercentage = (value: number) => {
  return (value / total.value) * 100;
};

const getPercentageForAllocate = (usableHosts: number, totalIps: number) => {
  return (usableHosts / totalIps) * 100;
};

const { BitsList } = storeToRefs(useVisualizationStore());
</script>

<template>
  <Card class="shadow-none outline-none border-0">
    <CardContent>
      <div :class="props.class ?? 'relative h-16 mb-8 space-y-4'">
        <!-- Original visualization (when cardAllocate is false or undefined) -->
        <div v-if="!cardAllocate" class="flex h-full rounded-lg overflow-hidden">
          <div v-for="(segment, index) in data" :key="index" :style="{
            width: getPercentage(segment.value!) + '%',
            backgroundColor: segment.color,
          }" class="relative cursor-pointer transition-all duration-200 hover:opacity-80"
            @mouseenter="handleMouseEnter(segment as Segment, $event)" @mousemove="handleMouseMove"
            @mouseleave="handleMouseLeave">
            <div v-if="getPercentage(segment.value!) > 10" class="absolute inset-0 flex items-center justify-center">
              <span class="text-white font-semibold text-sm">
                {{ segment.label! === 'Available' ? segment.label : segment.label!.slice(0, 4) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Card Allocate visualization (when cardAllocate is true) -->
        <div v-if="cardAllocate" class="space-y-2">
          <div v-for="(subnet, index) in data" :key="index" class="space-y-1">
            <div class="flex h-8 rounded-lg overflow-hidden">
              <!-- Usable Hosts segment -->
              <div :style="{
                width: getPercentageForAllocate(subnet.usableHosts, subnet.totalIps) + '%',
                backgroundColor: subnet.color || '#3b82f6',
              }" class="relative cursor-pointer transition-all duration-200 hover:opacity-80"
                @mouseenter="handleMouseEnter({ label: subnet.label || 'Usable Hosts', value: subnet.usableHosts, color: subnet.color } as Segment, $event)"
                @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
                <div v-if="getPercentageForAllocate(subnet.usableHosts, subnet.totalIps) > 15"
                  class="absolute inset-0 flex items-center justify-center">
                  <span class="text-white font-semibold text-xs">
                    {{ subnet.label }}
                  </span>
                </div>
              </div>

              <!-- Reserved IPs segment (Network + Broadcast) -->
              <div :style="{
                width: getPercentageForAllocate(subnet.totalIps - subnet.usableHosts, subnet.totalIps) + '%',
                backgroundColor: '#94a3b8',
              }" class="relative cursor-pointer transition-all duration-200 hover:opacity-80"
                @mouseenter="handleMouseEnter({ label: 'Reserved', value: subnet.totalIps - subnet.usableHosts, color: '#94a3b8' } as Segment, $event)"
                @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
              </div>
            </div>
          </div>
        </div>

        <div v-if="withBits" class="flex gap-4 w-full justify-between items-center">
          <span class="text-sm font-medium" v-for="(item, index) in BitsList" :key="index">.{{ item }}</span>
        </div>
      </div>

      <!-- Tooltip -->
      <div v-if="hoveredSegment" :style="{
        position: 'fixed',
        left: tooltipPos.x + 'px',
        top: tooltipPos.y + 'px',
        transform: 'translate(-50%, -100%)',
        pointerEvents: 'none',
        zIndex: 9999
      }" class="bg-muted text-white px-4 py-2 rounded-lg shadow-xl">
        <div class="text-sm font-semibold">{{ hoveredSegment.label }}</div>
        <div class="text-xs">{{ hoveredSegment.value }} IPs</div>
        <div class="text-xs opacity-75" v-if="!cardAllocate">
          {{ getPercentage(hoveredSegment.value).toFixed(1) }}%
        </div>
      </div>
    </CardContent>
  </Card>
</template>
