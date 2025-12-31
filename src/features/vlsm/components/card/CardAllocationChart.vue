<script setup lang="ts">
import type {
  ChartConfig,
} from "@/components/ui/chart";

import { Donut } from "@unovis/ts";
import { VisDonut, VisSingleContainer } from "@unovis/vue";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from "@/components/ui/chart";
import { computed } from 'vue';
const props = defineProps<{
  percent: number;
  ChartDatas: Array<{
    status: string;
    count: number;
    fill: string;
  }>;
}>();
const chartData = computed(() => props.ChartDatas);
type Data = typeof chartData.value[0] & Array<{
  status: string;
  count: number;
  fill: string;
}>;

const chartConfig = {
  count: {
    label: "IPs",
  },
  used: {
    label: "Used",
    color: "hsl(142 76% 36%)", // Green
  },
  available: {
    label: "Available",
    color: "var(--color-muted-foreground)",
  },
} satisfies ChartConfig;


</script>

<template>
  <Card class="flex flex-col bg-muted">
    <CardContent class="flex-1 pb-0">
      <ChartContainer :config="chartConfig" class="mx-auto aspect-square max-h-62.5" :style="{
        '--vis-donut-central-label-font-size': 'var(--text-3xl)',
        '--vis-donut-central-label-font-weight': 'var(--font-weight-bold)',
        '--vis-donut-central-label-text-color': 'var(--foreground)',
        '--vis-donut-central-sub-label-text-color': 'var(--muted-foreground)',
      }">
        <VisSingleContainer :data="chartData" :margin="{ top: 30, bottom: 30 }">
          <VisDonut :value="(d: Data) => d.count"
            :color="(d: Data) => chartConfig[d.status as keyof typeof chartConfig].color" :arc-width="30"
            :central-label-offset-y="10" :central-label="`${percent}%`" central-sub-label="USED" />
          <ChartTooltip :triggers="{
            [Donut.selectors.segment]: componentToString(chartConfig, ChartTooltipContent, { hideLabel: true })!,
          }" />
        </VisSingleContainer>
      </ChartContainer>
    </CardContent>
  </Card>
</template>
