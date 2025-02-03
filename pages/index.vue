<script setup lang="ts">
import { loadStripe } from "@stripe/stripe-js";
import { PaymentIntentRequestBody } from "~/server/api/stripe/payment_intent.post";
import { CheckoutItem } from "~/composables/useCheckout";
import { useToast } from "@/components/ui/toast/use-toast";
import allItems from "~/composables/useProducts"

const runtimeConfig = useRuntimeConfig();
const stripe = await loadStripe(runtimeConfig.public.publishableKey);

// Create test payment intent

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
    title: "Cleared cart",
  });

  cart.$reset();
}
</script>

<template>
  <div
    class="bg-orange-50/25 w-screen min-h-screen h-full flex flex-col items-center py-16"
  >
    <div class="text-6xl font-pinyon">Cozy Threads</div>
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
