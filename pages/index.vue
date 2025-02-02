<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js';
import { PaymentIntentRequestBody } from '~/server/api/stripe/payment_intent.post'
import { CheckoutItem } from '~/composables/useCheckout'

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
        description: "A t-shirt",
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


</script>

<template>
  <div class="bg-slate-100 w-screen min-h-screen h-full flex flex-col items-center py-16">
    <div class="max-w-3xl h-fit">
        <CardStack :items="allItems"></CardStack>
        <div class="w-full flex flex-row justify-end">
            <Button @click="cart.$reset()" class="">Clear cart</Button>
        </div>
    </div>
    <Sheet>
        <SheetTrigger as-child>
            <Button variant="outline">
              Open
            </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
            <SheetDescription class="pb-4">
              Items
            </SheetDescription>
          </SheetHeader>
          <div class="flex flex-col items-start space-y-4 h-full w-full">
            <div 
                class="bg-slate-100 rounded-xl w-full h-fit p-3"
                v-for="item of cart.getCart"
            >
                <div 
                    class="flex flex-row items-center"
                >
                    <NuxtImg
                        :src="item.image"
                        format="webp"
                        alt="image"
                        width="50" 
                        height="50" 
                        class="rounded-lg outline outline-slate-400 outline-2"
                        placeholder
                    >
                    </NuxtImg>

                </div>
                

            </div>
            
          </div>
        </SheetContent>
      </Sheet>
  </div>
</template>
