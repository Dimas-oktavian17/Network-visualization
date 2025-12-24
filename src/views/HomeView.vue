<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue';
import { GitBranchIcon } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';

function darkModeToggle() {
  document.documentElement.classList.toggle('dark');
}

</script>

<template>
  <main>
    <TheWelcome />
    <Button variant="outline" size="sm" @click="darkModeToggle">
      <GitBranchIcon />
      New Branch
    </Button>
  </main>
</template>
