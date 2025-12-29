<script setup lang="ts">
import NavMenuCommon from '@/components/common/navigation-menu/NavMenuCommon.vue';
import SidebarLayout from '@/components/layout/sidebar/SidebarLayout.vue';
import IntroContent from '../components/IntroContent.vue';
import TableOfContents from '@/components/common/toc/TableOfContents.vue';
</script>

<template>
  <NavMenuCommon />
  <SidebarLayout>
    <div class="grid gap-4  md:grid-cols-2 w-full min-w-0">
      <IntroContent />
      <TableOfContents class="hidden md:block" />
    </div>
  </SidebarLayout>
</template>
