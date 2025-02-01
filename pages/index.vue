<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js';
import { PaymentIntentRequestBody } from '~/server/api/stripe/payment_intent.post.ts'
import { CheckoutItem } from '~/composables/useCheckout.ts'

const runtimeConfig = useRuntimeConfig();
const stripe = await loadStripe(runtimeConfig.public.publishableKey);

// Create test payment intent
const items: CheckoutItem[] = [
    {
        name: "Pants",
        description: "Some pants",
        image: "/static/we_sweats.webp",
        price: 11000
    },
    {
        name: "Hat",
        description: "A hat",
        image: "/static/desertflower_hat.webp",
        price: 3500
    },
    {
        name: "T Shirt",
        description: "A t-shirt",
        image: "/static/atleast_tee.webp",
        price: 7000
    },
]

const { data } = await useFetch(
    '/api/stripe/payment_intent',
    {
        method: "post",
        body: {items: items},
        server: false
    }
)

console.log(data.value)

</script>

<template>
  <div class="bg-black w-screen h-screen">

  </div>
</template>
