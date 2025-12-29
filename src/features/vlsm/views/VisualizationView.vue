<script setup lang="ts">
import NavMenuCommon from '@/components/common/navigation-menu/NavMenuCommon.vue';
import SidebarLayout from '@/components/layout/sidebar/SidebarLayout.vue';
import HeaderVisualizer from '../components/header/HeaderVisualizer.vue';
import HeaderToggle from '../components/header/HeaderToggle.vue';
import CardNetConfig from '../components/card/CardNetConfig.vue';
import IntroContent from '@/features/guide/components/IntroContent.vue';
</script>

<template>
  <div>
    <NavMenuCommon />
    <SidebarLayout>
      <div class="grid gap-4  md:grid-cols-2 w-full min-w-0">
        <div class="w-full max-w-full space-y-4">
          <!-- Visualization header -->
          <HeaderVisualizer>
            <HeaderToggle></HeaderToggle>
          </HeaderVisualizer>
          <!-- /Visualization content -->
          <CardNetConfig></CardNetConfig>
        </div>
        <IntroContent />
      </div>
    </SidebarLayout>
  </div>
</template>
