<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  FormControl,
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
import { Calculator, Plus } from 'lucide-vue-next';
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
defineEmits(['calculate']);
</script>

<template>
  <form class="space-y-1" @submit="onSubmit">
    <Item class="flex items-center">
      <ItemContent>
        <ItemTitle>Subnets Requirements</ItemTitle>
      </ItemContent>
      <ItemActions>
        <BadgeCommon variant="secondary" class="rounded-sm">{{ SubnetsData.length }} defined</BadgeCommon>
      </ItemActions>
    </Item>
    <div class="flex items-start gap-4">
      <!-- Wide name/room input -->
      <div class="flex-1">
        <FormField v-slot="{ componentField }" name="room">
          <FormItem class="space-y-1">
            <FormControl>
              <Input type="text" placeholder="Name (e.g. Guests)" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <!-- Small hosts input -->
      <div class="w-32">
        <FormField v-slot="{ componentField }" name="hosts">
          <FormItem class="space-y-1">
            <FormControl>
              <Input type="number" placeholder="4" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <!-- Plus button -->
      <Button type="submit" variant="default">
        <Plus class="size-5" />
      </Button>
    </div>
  </form>
  <Button @click="$emit('calculate')" type="button" variant="default" class="w-full mt-2">
    <Calculator class="size-4" />
    Calculate VLSM
  </Button>
</template>
