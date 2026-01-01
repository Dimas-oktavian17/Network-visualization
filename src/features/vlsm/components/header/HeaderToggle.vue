<template>
  <div class="flex items-center gap-2 text-text-muted-light dark:text-text-muted-dark">
    <!-- <ButtonCommon variant="ghost" size="sm" @click="$emit('Save')">
      <Save class="size-4" />
      Save
    </ButtonCommon> -->
    <ButtonCommon size="sm" @click="$emit('Download')">
      <download-excel class="btn btn-default flex flex-row gap-4" :data="json_data" :fields="json_fields"
        :formats="formats" type="xlsx" worksheet="Subnet Details" name="subnet_calculator.xlsx">
        <Download class="size-4" /> Export to Excel
      </download-excel>
    </ButtonCommon>
    <!-- <span class="h">|</span>
    <ButtonCommon variant="ghost" size="icon" @click="$emit('History')">
      <History class="size-4" />
    </ButtonCommon>
    <ButtonCommon variant="ghost" size="icon" @click="$emit('Settings')">
      <Settings class="size-4" />
    </ButtonCommon>
    <ButtonCommon variant="ghost" size="icon" @click="$emit('ToggleTheme')">
      <Sun class="dark:hidden block size-4" />
      <Moon class="hidden dark:block size-4" />
    </ButtonCommon> -->
  </div>
</template>

<script lang="ts" setup>
import ButtonCommon from '@/components/common/button/ButtonCommon.vue';
import { Save, Download, History, Settings, Sun, Moon } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import type { SubnetCalculated } from '../../types';
defineEmits(['Save', 'Download', 'History', 'Settings', 'ToggleTheme']);


const json_fields = ref({
  "Room": "label",
  "Network": "network",
  "CIDR": "cidr",
  "First IP": "start",
  "Last IP": "end",
  "Broadcast": "broadcast",
  "Total IPs": "totalIps",
  "Usable Hosts": "usableHosts",
  "Required Hosts": "subnet.hosts",
});

const props = defineProps<{
  json_data: SubnetCalculated[];
}>();

const json_data = computed(() => props.json_data);
const formats = ref({
  G: '0',      // Total IPs - Number format
  H: '0',      // Usable Hosts - Number format
  I: '0',      // Required Hosts - Number format
});
</script>
