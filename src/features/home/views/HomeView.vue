<script setup lang="ts">
import { Network } from 'lucide-vue-next';
import ButtonCommon from '@/components/common/button/ButtonCommon.vue';
import FloatingLines from '../components/FloatingLines.vue';
import NavMenuCommon from '@/components/common/navigation-menu/NavMenuCommon.vue';
import HeroLayout from '@/components/layout/main/HeroLayout.vue';
import BadgeCommon from '@/components/common/badge/BadgeCommon.vue';
import { useDarkMode } from '@/composables/useDarkMode';

</script>
<template>
  <main class="relative">
    <NavMenuCommon class="" />
    <HeroLayout class="absolute top-1/2 z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <template #header>
        <BadgeCommon variant="outline" class="mb-4 p-4">
          <Network /> New Oktanetflow
        </BadgeCommon>
        <h1 class="lg:text-4xl lg:px-56 text-2xl font-black text-center text-white">
          Master networking fundamentals through
          interactive tools
          and visual learning.
        </h1>
      </template>
      <template #footer>
        <ButtonCommon @click="useDarkMode()" variant="default" class="p-4 rounded-full cursor-pointer">Get Started
        </ButtonCommon>
        <ButtonCommon variant="outline" class="p-4 rounded-full cursor-pointer">Learn More</ButtonCommon>
      </template>
    </HeroLayout>
    <div style="width: 100%; height: 100vh; position: relative;">
      <FloatingLines :enabled-waves="['top', 'middle', 'bottom']" :line-count="[5]" :line-distance="[5]"
        :bend-radius="5.0" :bend-strength="-0.5" :interactive="true" :parallax="true" />
    </div>
  </main>
</template>
