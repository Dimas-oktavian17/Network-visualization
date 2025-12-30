<script setup lang="ts">
import { Minus } from 'lucide-vue-next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import ItemCommon from '@/components/common/item/ItemCommon.vue';


defineProps<{
  title: string;
  avatar: string;
  description: string;
}>();
defineEmits(['remove']);
</script>

<template>
  <div class="flex w-full max-w-full flex-col gap-6">
    <ItemCommon variant="outline">
      <ItemMedia>
        <Avatar class="size-10">
          <AvatarImage
            :src="`https://ui-avatars.com/api/?background=random&?bold=true&name=${encodeURIComponent(avatar)}`" />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{{ title }}</ItemTitle>
        <ItemDescription>{{ description }}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button @click="$emit('remove')" size="icon-sm" variant="outline" class="rounded-full" aria-label="Remove">
          <Minus />
        </Button>
      </ItemActions>
    </ItemCommon>
  </div>
</template>
