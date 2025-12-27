<script setup lang="ts">

</script>
<template>
  <div class="container">
    <header class="flex flex-col items-center justify-center">
      <slot name="header"></slot>
    </header>
    <footer class="mt-8 flex flex-row justify-center items-center space-x-4">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>