<script setup lang="ts">
import {loadStripe} from '@stripe/stripe-js';

const runtimeConfig = useRuntimeConfig()
const stripe = await loadStripe(runtimeConfig.public.publishableKey);

</script>

<template>
  <div class="bg-black w-screen h-screen">

  </div>
</template>
