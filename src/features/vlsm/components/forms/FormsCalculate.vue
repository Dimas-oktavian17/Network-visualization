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

const formSchema = toTypedSchema(
  z.object({
    room: z.string().min(5, { message: 'Room must be at least 5 characters.' }),
    hosts: z.number().min(1, { message: 'There must be at least 1 host.' }),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
</script>

<template>
  <form class="grid grid-cols-3 gap-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="room">
      <FormItem>
        <FormControl>
          <Input type="text" placeholder="Room (LAN-A)" v-bind="componentField" />
        </FormControl>
        <FormDescription>This is your public display name.</FormDescription>
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
  </form>
</template>
