<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
const route = useRoute();
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import NavMenuComposable from '@/components/common/navigation-menu';

const { openDropdown, toggleDropdown, isActiveDropdown, navRoutes, mobileOpen } = NavMenuComposable();
</script>

<template>
  <nav
    class="container fixed w-full z-999 top-0 left-0 bg-white/10 backdrop-blur-2xl lg:bg-white/10 lg:backdrop-blur-2xl lg:border border-white lg:rounded-full">
    <div class="mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" class="h-7" alt="Logo" />
          <span class="text-xl text-heading font-semibold">Oktanetflow</span>
        </a>
      </div>

      <!-- Desktop menu -->
      <div class="hidden md:flex md:items-center md:space-x-6 w-full max-w-2xl justify-end">
        <NavigationMenu class="w-full rounded-lg  flex items-center justify-center" :viewport="false">
          <NavigationMenuList class="bg-transparent flex items-center space-x-4">
            <NavigationMenuItem>
              <RouterLink to="/" class="bg-transparent" :class="navigationMenuTriggerStyle()">Home</RouterLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger class="bg-transparent">Docs</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid gap-4 p-2">
                  <li>
                    <NavigationMenuLink as-child>
                      <a href="#">
                        <div class="font-medium">Components</div>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>


      <!-- Mobile toggle -->
      <button @click="mobileOpen = !mobileOpen" type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading"
        aria-controls="mobile-menu">
        <span class="sr-only">Toggle menu</span>
        <svg v-if="!mobileOpen" class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile menu panel -->
    <!-- <transition name="fade"> -->
    <div v-if="mobileOpen" id="navbar-dropdown">
      <ul
        class="space-y-2 flex flex-col font-medium p-4 md:p-0 mt-4 rounded-base bg-neutral-secondary-soft md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-neutral-primary">
        <template v-for="(item, index) in navRoutes" :key="index">
          <!-- Single route items (like home) -->
          <li v-if="item.routes && item.routes.length === 1">
            <RouterLink :to="item.routes?.[0]?.path" :class="[
              'block py-2 px-3 rounded md:p-0 transition-colors capitalize font-medium',
              route.name === item.routes?.[0]?.name
                ? 'text-white bg-white/10'
                : 'text-white hover:bg-white/15'
            ]" :aria-current="route.name === item.routes?.[0]?.name ? 'page' : undefined">
              {{ item.routes?.[0]?.name }}
            </RouterLink>
          </li>

          <!-- Dropdown items (like docs) -->
          <li v-else class="relative">
            <button @click="toggleDropdown(item.name)" :class="[
              'capitalize flex items-center justify-between w-full py-2 px-3 rounded font-medium md:w-auto md:border-0 md:p-0 transition-colors',
              isActiveDropdown(item.routes)
                ? 'text-white bg-white/10'
                : 'text-white hover:bg-white/15'
            ]">
              {{ item.name }}
              <svg class="w-4 h-4 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m19 9-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown menu -->
            <div v-if="openDropdown === item.name"
              class="z-999  md:absolute md:top-full md:left-0  rounded-base shadow-lg w-full">
              <ul class="p-2 text-sm text-body font-medium">
                <li v-for="(routeItem, routeIndex) in item.routes" :key="routeIndex">
                  <RouterLink :to="routeItem.path" :class="[
                    'inline-flex capitalize font-medium items-center w-full p-2 rounded transition-colors',
                    route.name === routeItem.name
                      ? 'text-white bg-white/10'
                      : 'text-white hover:bg-white/15'
                  ]" @click="openDropdown = null">
                    {{ routeItem.name }}
                  </RouterLink>
                </li>
              </ul>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <!-- </transition> -->
  </nav>
</template>
