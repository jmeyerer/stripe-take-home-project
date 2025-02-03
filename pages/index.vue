<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js';
import { PaymentIntentRequestBody } from '~/server/api/stripe/payment_intent.post'
import { CheckoutItem } from '~/composables/useCheckout'
import { useToast } from '@/components/ui/toast/use-toast'

const runtimeConfig = useRuntimeConfig();
const stripe = await loadStripe(runtimeConfig.public.publishableKey);

// Create test payment intent
const allItems: CheckoutItem[] = [
    {
        id: 1,
        title: "Cozy Pants",
        description: "Some super cozy sweatpants to keep you warm",
        image: "/we_sweats.webp",
        price: 11000,
        quantity: ref(0)
    },
    {
        id: 2,
        title: "Cozy Hat",
        description: "A super cool hat that keeps sun out of your face",
        image: "/desertflower_hat.webp",
        price: 3500,
        quantity: ref(0)
    },
    {
        id: 3,
        title: "Cozy T Shirt",
        description: "A t-shirt with a loooooooooot of text in the description",
        image: "/atleast_tee.webp",
        price: 7000,
        quantity: ref(0)
    },
    {
        id: 4,
        title: "Cozy Shorts",
        description: "Some cozy black shorts to wear in the summer",
        image: "/black_shorts.webp",
        price: 3500,
        quantity: ref(0)
    },
    {
        id: 5,
        title: "Cozy Hoodie",
        description: "A blue super cozy hoodie to keep you warm in the winter",
        image: "/bloom_hoodie.webp",
        price: 8500,
        quantity: ref(0)
    },
    {
        id: 6,
        title: "Film Hoodie",
        description: "A super cool hoodie for film lovers, come buy it film geeks",
        image: "/memoriesfilm_hoodie.webp",
        price: 8000,
        quantity: ref(0)
    },
    {
        id: 7,
        title: "Pink Jacket",
        description: "A super dope pink jacket that'll make everyone jealous",
        image: "/pink_jacket.webp",
        price: 11000,
        quantity: ref(0)
    },
    {
        id: 8,
        title: "Black T Shirt",
        description: "A super dope black t-shirt that'll make everyone jealous",
        image: "/pink_tee.webp",
        price: 4500,
        quantity: ref(0)
    },
]

// const { data } = await useFetch(
//     '/api/stripe/payment_intent',
//     {
//         method: "post",
//         body: {items: items},
//         server: false
//     }
// )

// console.log(data.value)

const cart = useCartStore();
const { toast } = useToast();


function clearCart() {
    toast({
        title: "Cleared cart"
    });

    cart.$reset();
}



</script>

<template>
  <div class="bg-slate-100 w-screen min-h-screen h-full flex flex-col items-center py-16">
    <div class="text-6xl font-pinyon">
        Cozy Threads
    </div>
    <div class="absolute top-0 right-0">
        <Cart></Cart>
    </div>
    <div class="relative max-w-screen-3xl h-fit">
        
        <CardStack :items="allItems"></CardStack>
        <div class="w-full flex flex-row justify-end">
            <Button @click="clearCart()" class="">Clear cart</Button>
        </div>
    </div>
    <Toaster />
  </div>
</template>
