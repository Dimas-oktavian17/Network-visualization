import { defineStore } from 'pinia';
import type { optimalVLSM, SubnetCalculated, SubnetsData } from '../types';
import { useVisualizationStore } from './VisualizationStore';
import { computed, ref } from 'vue';
import { toast } from 'vue-sonner';

export const useSubnetsStore = defineStore('subnets', () => {
  const visualizationStore = useVisualizationStore();
  const optimalVLSM = ref<optimalVLSM>({
    total: 0,
    status: '',
  });
  const allocatedData = ref<Array<SubnetCalculated>>();
  /**
   * Example validation: Check for duplicate IDs and valid host counts
   * @param {SubnetsData} subnets - List of subnets
   * @param {number} RESERVED_IPS - Number of reserved IPs per subnet (e.g. Network + Broadcast)
   * @returns {number} totalIps - Total number of IPs needed in the VLSM
   */
  const subnetsValidation = (subnets: SubnetsData, RESERVED_IPS: number) => {
    // Example validation: Check for duplicate IDs and valid host counts
    const totalIps = subnets.reduce((sum, subnet) => {
      const neededAddresses = subnet.hosts + RESERVED_IPS;

      // Smallest power of 2 >= neededAddresses
      const subnetSize = Math.pow(2, Math.ceil(Math.log2(neededAddresses)));

      return sum + subnetSize;
    }, 0);
    optimalVLSM.value.total = totalIps;
    return totalIps;
  };
  /**
   * Calculate the total IPs needed for a given list of subnets
   * @param {SubnetsData} subnets - List of subnets
   * @returns {void}
   */
  // ! Logic: VLSM algorithm core
  const SubnetsCalculated = (subnets: SubnetsData) => {
    const RESERVED_IPS = 2; // Network + Broadcast
    subnetsValidation(subnets, RESERVED_IPS);
    if (optimalVLSM.value.total > visualizationStore.totalIps) {
      console.log('not enough main prefix not enough allocated');
      optimalVLSM.value.total = 0;
      toast.error('Not enough main prefix not enough allocated');
      return;
    }

    let CurrentIP = visualizationStore.octets.split('.').map(Number);
    // Calculate total IPs needed
    const subnetsCopy = subnets
      .sort((a, b) => b.hosts - a.hosts)
      .map((subnet) => {
        // Got the total IPs needed for each subnet
        const total = Math.pow(2, Math.ceil(Math.log2(subnet.hosts + RESERVED_IPS)));
        // Net address start
        const networkAddress = [...CurrentIP];
        // first usable host
        const startHost = [...CurrentIP];
        startHost[3]! += 1; // First usable host
        // Net address
        const networkIP = [...networkAddress];
        networkIP[3]! += 0;
        // Last usable host
        const endHost = [...CurrentIP];
        endHost[3]! += total - 2; // Last usable host
        // Broadcast
        const broadcastAddress = [...CurrentIP];
        broadcastAddress[3]! += total - 1;
        // Update CurrentIP for next subnet
        CurrentIP = [...broadcastAddress];
        CurrentIP[3]! += 1; // Next network address
        // Handle octet overflow if needed
        for (let i = 3; i >= 0; i--) {
          if (CurrentIP[i]! > 255) {
            CurrentIP[i]! -= 256;
            if (i > 0) CurrentIP[i - 1]! += 1;
          }
        }
        return {
          subnet,
          cidr: 32 - Math.floor(Math.log2(total)),
          totalIps: total,
          usableHosts: total - RESERVED_IPS,
          usableHostsRange: total - RESERVED_IPS,
          start: startHost.join('.'),
          network: networkIP.join('.'),
          end: endHost.join('.'),
          broadcast: broadcastAddress.join('.'),
          // ! UI: allocated Ips SEGMENT
          label: subnet.room,
          value: total,
          color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
        };
      });
    allocatedData.value = subnetsCopy;
    console.log('Total IPs needed:', visualizationStore.totalIps, subnetsCopy);
  };

  // ! Logic: Optimization detection
  const optimalSubnets = computed(() => {
    const efficient = (optimalVLSM.value.total / visualizationStore.totalIps) * 100;
    if (efficient > 100) return 'Invalid the cidr is not enough';
    if (efficient >= 75) return '⭐⭐⭐⭐⭐ Excellent (75-100%)';
    if (efficient >= 50) return '⭐⭐⭐⭐ Good (50-75%)';
    if (efficient >= 25) return '⭐⭐⭐ Fair (25-50%)';
    if (efficient >= 10) return '⭐⭐ Poor (10-25%)';
    return '';
  });
  // ! UI: allocated Ips
  const totalAvaibleIps = computed(() => {
    const efficient = (optimalVLSM.value.total / visualizationStore.totalIps) * 100;
    const avaible = visualizationStore.totalIps - optimalVLSM.value.total;
    return {
      avaible: avaible,
      percent: Math.round(efficient), // efficient,
      chartDatas: [
        { status: "used", count: optimalVLSM.value.total, fill: "var(--color-used)" },
        { status: "available", count: avaible, fill: "var(--color-available)" },
      ]
    };
  });
  return {
    SubnetsCalculated,
    optimalSubnets,
    totalAvaibleIps,
    allocatedData,
    optimalVLSM
  };
});
