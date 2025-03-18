<template>
  <div class="absolute inset-0 -z-20 pointer-events-none">
    <div class="absolute inset-0 dark:opacity-20">
      <img
        v-if="mode === 'dark'"
        src="/src/assets/globe.jpg"
        alt="Globe"
        class="w-full flex-none dark:flex h-full object-cover dark:mix-blend-lighten hue-rotate-[220deg] saturate-[1.2] select-none"
      />
    </div>
    <div
      class="absolute inset-0 dark:opacity-30 select-none"
      style="
        background-image: url('/grid-bg.png');
        background-size: cover;
        background-position: center;
      "
    />
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from "@vueuse/core";

const mode = useColorMode({ disableTransition: false });
</script>
