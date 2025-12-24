<script setup lang="ts">
import { TheWelcome } from '@/components/welcome';
import ButtonCommon from '@/components/common/button/ButtonCommon.vue';
function darkModeToggle() {
  document.documentElement.classList.toggle('dark');
}
</script>
<template>
  <main>
    <TheWelcome />
    <ButtonCommon @click="darkModeToggle">
      test
    </ButtonCommon>
  </main>
</template>
