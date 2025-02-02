<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js';
import { PaymentIntentRequestBody } from '~/server/api/stripe/payment_intent.post'
import { CheckoutItem } from '~/composables/useCheckout'

const runtimeConfig = useRuntimeConfig();
const stripe = await loadStripe(runtimeConfig.public.publishableKey);

// Create test payment intent
const items: CheckoutItem[] = [
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

</script>

<template>
  <div class="bg-black w-screen h-screen flex flex-col items-center">
    <div class="max-w-screen-xl h-full flex flex-col items-center space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-4">
        <Card 
            v-for="item of items"
        >
            <CardHeader>
              <CardTitle>{{item.title}}</CardTitle>
              <CardDescription>{{item.description}}</CardDescription>
            </CardHeader>
            <CardContent>
              <NuxtImg
                :src="item.image"
                format="webp"

                alt="image"
                width="250" 
                height="250" 
                class="rounded-md"
              ></NuxtImg>
            </CardContent>
            <CardFooter
                class="flex justify-between px-6 pb-6"
            >
                <NumberField 
                    id="quantity" 
                    :default-value="0" 
                    :min="0"
                    v-model="item.quantity.value"
                    class="w-24"
                >
                    <Label for="quantity">Quantity</Label>
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
                <Button
                    class="mt-auto"
                >
                    Add to cart
                </Button>
            </CardFooter>
          </Card>
    </div>
  </div>
</template>
