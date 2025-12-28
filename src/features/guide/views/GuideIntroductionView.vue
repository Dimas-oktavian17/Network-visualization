<script setup lang="ts">
import NavMenuCommon from '@/components/common/navigation-menu/NavMenuCommon.vue';
import SidebarLayout from '@/components/layout/sidebar/SidebarLayout.vue';
import IntroContent from '../components/IntroContent.vue';
import TableOfContents from '@/components/common/toc/TableOfContents.vue';
</script>

<template>
  <NavMenuCommon />
  <SidebarLayout>
    <div class="grid auto-rows-min gap-4  md:grid-cols-2 relative">
      <IntroContent />
      <TableOfContents />
    </div>
  </SidebarLayout>
</template>
