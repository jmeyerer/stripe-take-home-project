<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js';
import { PaymentIntentRequestBody } from '~/server/api/stripe/payment_intent.post'
import { CheckoutItem } from '~/composables/useCheckout'

const runtimeConfig = useRuntimeConfig();
const stripe = await loadStripe(runtimeConfig.public.publishableKey);

// Create test payment intent
const items: CheckoutItem[] = [
    {
        title: "Pants",
        description: "Some pants",
        image: "/static/we_sweats.webp",
        price: 11000,
        quantity: 1
    },
    {
        title: "Hat",
        description: "A hat",
        image: "/static/desertflower_hat.webp",
        price: 3500,
        quantity: 1
    },
    {
        title: "T Shirt",
        description: "A t-shirt",
        image: "/static/atleast_tee.webp",
        price: 7000,
        quantity: 2
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
