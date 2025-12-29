<script lang="ts">
export const iframeHeight = "800px";
export const description = "A sidebar with submenus.";
</script>

<script setup lang="ts">
import AppSidebar from "@/components/ui/sidebar/AppSidebar.vue";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useRoute } from 'vue-router';
import { computed } from 'vue';
const route = useRoute();

// --- Computed ---
const currentPath = computed(() => route.fullPath.split('/')[2]);
const currentPage = computed(() => route.name as string);
</script>

<template>
  <SidebarProvider class="mt-16 bg-sidebar">
    <AppSidebar />
    <SidebarInset class="bg-sidebar">
      <header class="bg-sidebar flex h-16 shrink-0 items-center gap-2 border-b">
        <div class="flex items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                <BreadcrumbLink class="capitalize">
                  {{ currentPath }}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage class="capitalize">
                  {{ currentPage }}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div class="flex flex-1 flex-wrap text-wrap max-w-fit flex-col gap-4 p-4">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
