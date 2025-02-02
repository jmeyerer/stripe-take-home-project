<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js';
import { PaymentIntentRequestBody } from '~/server/api/stripe/payment_intent.post'
import { CheckoutItem } from '~/composables/useCheckout'
import { useToast } from '@/components/ui/toast/use-toast'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const runtimeConfig = useRuntimeConfig();
const stripe = await loadStripe(runtimeConfig.public.publishableKey);

// Create test payment intent
const allItems: CheckoutItem[] = [
    {
        id: 1,
        title: "Pants",
        description: "Some pants",
        image: "/we_sweats.webp",
        price: 11000,
        quantity: ref(0)
    },
    {
        id: 2,
        title: "Hat",
        description: "A hat",
        image: "/desertflower_hat.webp",
        price: 3500,
        quantity: ref(0)
    },
    {
        id: 3,
        title: "T Shirt",
        description: "A t-shirt with a loooooooooot of text in the description",
        image: "/atleast_tee.webp",
        price: 7000,
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
    <div class="max-w-3xl h-fit">
        <CardStack :items="allItems"></CardStack>
        <div class="w-full flex flex-row justify-end">
            <Button @click="clearCart()" class="">Clear cart</Button>
        </div>
    </div>
    <Cart></Cart>
    <Toaster />
  </div>
</template>
