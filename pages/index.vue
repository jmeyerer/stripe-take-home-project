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
const { getPriceString } = useCheckout()


</script>

<template>
  <div class="bg-slate-100 w-screen min-h-screen h-full flex flex-col items-center py-16">
    <div class="text-6xl font-pinyon">
        Cozy Threads
    </div>
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
                class="bg-slate-100 rounded-2xl w-full h-fit p-5"
                v-for="item of cart.getCart"
            >
                <div 
                    class="flex flex-row items-center space-x-3"
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

                    <div class="w-fit h-fit grid grid-cols-1 gap-0.5">
                        <span class="font-bold">{{item.title}}</span>
                        <span class="text-sm truncate w-3/4">{{item.description}}</span>
                    </div>

                    <span class="w-fit text-nowrap text-gray-500">{{ getPriceString(item.price) }}</span>
                </div>
                

            </div>
            
          </div>
        </SheetContent>
      </Sheet>
      <Toaster />
  </div>
</template>
