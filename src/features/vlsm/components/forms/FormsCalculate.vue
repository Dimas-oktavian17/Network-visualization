<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useVisualizationStore } from '../../store/VisualizationStore';
import { storeToRefs } from 'pinia';
import Item from '@/components/ui/item/Item.vue';
import ItemContent from '@/components/ui/item/ItemContent.vue';
import ItemTitle from '@/components/ui/item/ItemTitle.vue';
import ItemActions from '@/components/ui/item/ItemActions.vue';
import BadgeCommon from '@/components/common/badge/BadgeCommon.vue';
const { SubnetsData } = storeToRefs(useVisualizationStore());
const formSchema = toTypedSchema(
  z.object({
    room: z.string().min(5, { message: 'Room must be at least 5 characters.' }),
    hosts: z.number().min(1, { message: 'There must be at least 1 host.' }).max(254, { message: 'Maximum hosts per subnet is 254.' }),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  SubnetsData.value.push({
    id: SubnetsData.value.length + 1,
    room: values.room,
    hosts: values.hosts,
  });
  form.resetForm();
});
</script>

<template>
  <form class="space-y-4" @submit="onSubmit">
    <Item class="flex items-center">
      <ItemContent>
        <ItemTitle>Subnets Requirements</ItemTitle>
      </ItemContent>
      <ItemActions>
        <BadgeCommon variant="secondary" class="rounded-sm">{{ SubnetsData.length }} defined</BadgeCommon>
      </ItemActions>
    </Item>
    <div class="grid grid-cols-3 gap-4">
      <FormField v-slot="{ componentField }" name="room">
        <FormItem>
          <FormControl>
            <Input type="text" placeholder="Room (LAN-A)" v-bind="componentField" />
          </FormControl>
          <FormDescription>This is your room name.</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="hosts">
        <FormItem>
          <FormControl>
            <Input type="number" placeholder="4" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit">Submit</Button>
    </div>
  </form>
</template>
