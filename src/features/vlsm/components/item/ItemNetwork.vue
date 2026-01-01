<script lang="ts" setup>
import ItemCommon from '@/components/common/item/ItemCommon.vue';
import ItemContent from '@/components/ui/item/ItemContent.vue';
import ItemDescription from '@/components/ui/item/ItemDescription.vue';
import ItemTitle from '@/components/ui/item/ItemTitle.vue';

withDefaults(
  defineProps<{
    title?: string;
    description?: string;
  }>()
  , {
    title: 'NETWORK CONFIGURATION',
    description: 'Major Network Address',
  });

</script>

<template>
  <ItemCommon>
    <ItemContent>
      <ItemTitle>{{ title }}</ItemTitle>
      <ItemDescription>
        {{ description }}
      </ItemDescription>
    </ItemContent>
    <ItemContent>
      <ItemTitle>{{ title }}</ItemTitle>
      <ItemDescription>
        {{ description }}
      </ItemDescription>
    </ItemContent>

  </ItemCommon>

</template>
