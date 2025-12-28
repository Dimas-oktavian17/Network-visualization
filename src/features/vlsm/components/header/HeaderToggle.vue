<template>
  <div class="flex items-center gap-2 text-text-muted-light dark:text-text-muted-dark">
    <ButtonCommon variant="ghost" size="sm" @click="$emit('Save')">
      <Save class="size-4" />
      Save
    </ButtonCommon>
    <ButtonCommon variant="ghost" size="sm" @click="$emit('Download')">
      <Download class="size-4" />
      Export
    </ButtonCommon>
    <span class="h">|</span>
    <ButtonCommon variant="ghost" size="icon" @click="$emit('History')">
      <History class="size-4" />
    </ButtonCommon>
    <ButtonCommon variant="ghost" size="icon" @click="$emit('Settings')">
      <Settings class="size-4" />
    </ButtonCommon>
    <ButtonCommon variant="ghost" size="icon" @click="$emit('ToggleTheme')">
      <Sun class="dark:hidden block size-4" />
      <Moon class="hidden dark:block size-4" />
    </ButtonCommon>
  </div>
</template>

<script lang="ts" setup>
import ButtonCommon from '@/components/common/button/ButtonCommon.vue';
import { Save, Download, History, Settings, Sun, Moon } from 'lucide-vue-next';
defineEmits(['Save', 'Download', 'History', 'Settings', 'ToggleTheme']);
</script>
