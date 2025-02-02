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
const { getPriceString, getTotalPriceString } = useCheckout();
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
                class="relative bg-slate-100 rounded-2xl w-full h-fit p-5"
                v-for="item of cart.getCart"
            >
                <Button
                    class="w-8 h-8 p-0 rounded-full flex items-center justify-center absolute -top-3 -right-3"
                    @click="cart.removeFromCart(item.id)"
                >
                    -
                </Button>

                <!-- Cart item card -->
                <div 
                    class="w-full flex flex-row items-center space-x-4"
                >
                    <!-- Product image -->
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

                    <!-- Product title and description -->
                    <div class="flex flex-col items-center w-full h-fit grid grid-cols-1 gap-0.5">
                        <span class="font-bold">{{item.title}}</span>
                        <span class="text-sm truncate w-3/4">{{item.description}}</span>
                    </div>

                    <!-- Item pricing breakdown (quantity & price, subtotal of product) -->
                    <span class="w-fit text-sm text-nowrap text-gray-500 text-end">
                        <span>
                            {{ item.quantity }}x 
                            {{ getPriceString(item.price) }}
                        </span>
                        <Separator class="my-1.5"></Separator>
                        <span>{{getPriceString(item.price*item.quantity)}}</span>
                    </span>
                </div>
            </div>
            
            <div
                v-if="cart.getCart.length > 0"
                class="w-full"
            >
                <Separator class="my-1.5"></Separator>

                <!-- Subtotal calculation -->
                <div
                    class="flex flex-col items-end w-full"
                >
                    <span class="flex flex-row space-x-8">
                        <span class="font-bold">Subtotal: </span>
                        <span>{{ getTotalPriceString(cart.getCart) }}</span>    
                    </span>
                </div>
            </div>

            <div
                v-else
                class="font-bold text-black"
            >
                The cart is empty. Add some stuff!
            </div>
            
          </div>
        </SheetContent>
      </Sheet>
      <Toaster />
  </div>
</template>
