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

    const avaibleData = allocatedData?.find(d => d.label === 'Available') || {
      subnet: {
        room: '',
        hosts: 0,
        id: 999
      },
      cidr: 32,
      totalIps: 0,
      usableHosts: 0,
      usableHostsRange: 0,
      start: '',
      network: '',
      end: '',
      broadcast: '',
      label: 'Available',
      value: avaible,
      color: `var(--color-muted-foreground)`,
    };

    const allocatedDataWithAvailable = allocatedData?.concat([avaibleData]).filter((d, i, a) => a.findIndex(t => (t.cidr === d.cidr && t.label === d.label)) === i);

    return Array.from(new Set(allocatedDataWithAvailable?.map(d => JSON.stringify(d))), x => JSON.parse(x));

  });
  const subnetDetails = computed(() => {
    const allocatedData = subnetsStore.allocatedData?.filter(d => d.cidr === 30 || d.cidr < 30);
    return Array.from(new Set(allocatedData?.map(d => JSON.stringify(d))), x => JSON.parse(x));

  });
  return {
    subnetsStore,
    allocatedIps,
    subnetDetails
  };
});
