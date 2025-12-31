import { defineStore } from 'pinia';
import { useSubnetsStore } from './SubentsStore';
import { computed } from 'vue';
import { useVisualizationStore } from './VisualizationStore';


export const useSpaceVisualStore = defineStore('space-visual', () => {
  const subnetsStore = useSubnetsStore();
  const visualizationStore = useVisualizationStore();
  // ! UI: allocated Ips space
  const allocatedIps = computed(() => {
    const allocatedData = subnetsStore.allocatedData;
    const avaible = visualizationStore.totalIps - subnetsStore.optimalVLSM.total;

    allocatedData?.push({
      subnet: {
        room: '',
        hosts: 0,
        id: Math.random()
      },
      cidr: 32,
      totalIps: 0,
      usableHosts: 0,
      usableHostsRange: 0,
      start: '',
      network: '',
      end: '',
      broadcast: '',
      // ! UI: allocated Ips SEGMENT
      label: 'Available',
      value: avaible,
      color: `var(--color-muted-foreground)`,
    });

    return Array.from(new Set(allocatedData?.map(d => JSON.stringify(d))), x => JSON.parse(x));
  });
  return {
    subnetsStore,
    allocatedIps
  };
});
