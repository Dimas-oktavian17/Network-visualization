<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar';

import { GalleryVerticalEnd } from "lucide-vue-next";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { RouterLink } from 'vue-router';

const props = defineProps<SidebarProps>();

// This is sample data.
const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "/guide/introduction",
      items: [
        {
          title: "Introduction",
          url: "/guide/introduction",
        },
        {
          title: "Quickstart",
          url: "/guide/quickstart",
        },
      ],
    },
    {
      title: "VLSM Guide",
      url: "#",
      items: [
        {
          title: "Introduction",
          url: "/guide/vlsm/introduction",
        },
        {
          title: "Quickstart",
          url: "/guide/vlsm/quickstart",
        },
        {
          title: "Visualization",
          url: "/guide/vlsm/visualization",
        },
      ],
    },
  ],
};
</script>

<template>
  <Sidebar class="mt-16" v-bind="props">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <a href="#">
              <div
                class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEnd class="size-4" />
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-medium">Oktanetflow</span>
                <span class="">v1.0</span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem v-for="item in data.navMain" :key="item.title">
            <SidebarMenuButton as-child>
              <RouterLink :to="item.url" class="font-medium">
                {{ item.title }}
              </RouterLink>
            </SidebarMenuButton>
            <SidebarMenuSub v-if="item.items.length">
              <SidebarMenuSubItem v-for="childItem in item.items" :key="childItem.title">
                <SidebarMenuSubButton as-child :is-active="childItem.url === $route.path">
                  <RouterLink :to="childItem.url">{{ childItem.title }}</RouterLink>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>
