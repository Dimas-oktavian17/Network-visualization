<script setup lang="ts">
import { Monitor } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  ItemGroup
} from '@/components/ui/item';
defineProps<{
  avaible: number;
  allocated: number;
}>();
</script>

<template>
  <div class="flex w-full flex-col">
    <Item variant="outline" class="py-5 border-b-0 border-x-0 flex w-full justify-between items-start rounded-none">
      <ItemMedia variant="icon" class="rounded-lg bg-input/30 w-full lg:w-[47%] h-30 flex flex-col">
        <Monitor class="size-10 fill-green-500 text-green-500" />
        HOSTS
      </ItemMedia>

      <ItemGroup class="w-full lg:w-2/4">
        <div class="flex justify-end">
          <ItemContent>
            <ItemTitle>
              <ul class="list-disc list-inside font-semibold text-green-500">
                <li>
                  <span class="font-semibold text-white">
                    Host Availability
                  </span>
                </li>
              </ul>
            </ItemTitle>
          </ItemContent>
          <ItemActions>
            <Button size="sm" variant="outline">
              Selected
            </Button>
          </ItemActions>
        </div>
        <div class="">
          <ItemContent>
            <ItemGroup class="flex flex-row justify-between pt-4">
              <ItemDescription>
                Allocated: {{ allocated }} IPs
              </ItemDescription>
              <ItemActions>
                {{ avaible }}
              </ItemActions>
            </ItemGroup>
            <slot />
          </ItemContent>
        </div>
      </ItemGroup>
    </Item>
  </div>
</template>
