import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useVisualizationStore = defineStore('visualization', () => {
  const octets = ref<string>("192.168.1.0");
  const cidrPrefix = ref<number[]>([24]);
  const CIDRList = ref<number[]>([8, 16, 24, 30]);
  const classesNetworkDefault = ref({
    A: { defaultCidr: 8, endCidr: 15, subnets: '255.0.0.0', willCard: '0.255.255.255', hosts: 16777214 },
    B: { defaultCidr: 16, endCidr: 23, subnets: '255.255.0.0', willCard: '0.0.255.255', hosts: 65534 },
    C: { defaultCidr: 24, endCidr: 30, subnets: '255.255.255.0', willCard: '0.0.0.255', hosts: 254 },
  });
  const subnetMaskId = ref<string | undefined>('');
  // Method
  const SubnettingMethod = (cidr: number) => {
    // Placeholder for subnetting method logic
    const subnetId = [...Object.values(classesNetworkDefault.value)].find(
      (cls) => cls.defaultCidr <= cidr && cls.endCidr >= cidr,
    )?.subnets?.split('.')
      .map((octet) => parseInt(octet));
    const indexOfZero = subnetId?.findIndex((octet) => octet === 0);
    const calculatedValue = 256 - 2 ** (32 - cidr);
    const newSubnetId = indexOfZero !== undefined && subnetId ? subnetId?.slice(0, indexOfZero).concat([
      calculatedValue,
      ...subnetId?.slice(indexOfZero + 1),
    ]) : subnetId;
    return subnetMaskId.value = newSubnetId?.join('.');
  };
  const wildcardMask = computed(() => {
    if (!subnetMaskId.value) return '';
    if (cidrPrefix.value[0] === 24) return '0.0.0.255';
    return subnetMaskId.value
      .split('.')
      .map(octet => 255 - Number(octet))  // Wildcard = 255 minus each subnet mask octet
      .join('.');
  });
  const totalIps = computed(() => cidrPrefix.value[0] ? 2 ** (32 - cidrPrefix.value[0]) : 0);
  const totalUsableIps = computed(() => totalIps.value - 2);
  const usableHostsRange = computed(() => {
    const octetss = octets.value.split('.').map(Number);
    const total = totalIps.value;
    const startHost = [...octetss];
    startHost[3]! += 1; // First usable host
    const endHost = [...octetss];
    endHost[3]! += total - 2; // Last usable host
    return {
      start: startHost.join('.'),
      end: endHost.join('.'),
    };
  });
  // octetsChunking
  const octetsConfig = computed(() => {
    return octets.value.split('.').map((octet) => parseInt(octet));
  });
  // Alert for unsupported classes
  const unsupportedClassAlert = computed(() => cidrPrefix.value.some(prefix => prefix < 24));
  const cidrPrefixSetter = computed(() => ({
    ...classesNetworkDefault.value.C,
    cidr: cidrPrefix.value[0],
    subnetMask: cidrPrefix.value && cidrPrefix.value[0] === 24 ? classesNetworkDefault.value.C.subnets && classesNetworkDefault.value.C.subnets : SubnettingMethod(cidrPrefix.value[0]!),
    wildcardMask: wildcardMask.value,
    totalHosts: totalIps.value,
    totalUsableHosts: totalUsableIps.value,
    usableHostsStart: usableHostsRange.value.start,
    usableHostsEnd: usableHostsRange.value.end
  }));
  return { octets, cidrPrefix, octetsConfig, CIDRList, unsupportedClassAlert, cidrPrefixSetter };
});
