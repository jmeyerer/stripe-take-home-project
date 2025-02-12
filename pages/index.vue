<script setup lang="ts">
import allItems from "~/composables/useProducts";
</script>

<template>
  <div
    class="bg-orange-50/25 w-screen min-h-screen h-full flex flex-col items-center py-16"
  >
    <div class="text-6xl font-pinyon pb-8">Cozy Threads</div>
    <div class="fixed top-0 right-0 z-10">
      <Cart></Cart>
    </div>
    <div class="relative max-w-screen-3xl h-fit">
      <CardStack :items="allItems"></CardStack>
    </div>
    <Toaster />
  </div>
</template>
