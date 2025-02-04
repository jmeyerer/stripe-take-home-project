<script setup lang="ts">
// @ts-nocheck
import { loadStripe } from "@stripe/stripe-js";
import { PaymentIntentRequestBody } from "~/server/api/stripe/payment_intent.post";
import { CheckoutItem } from "~/composables/useCheckout";

import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { useForm } from "vee-validate";

const runtimeConfig = useRuntimeConfig();
const stripe = await loadStripe(runtimeConfig.public.publishableKey);

const cart = useCartStore();
const { getPriceString, getTotalPriceString } = useCheckout();

// Create form schema
const formSchema = toTypedSchema(
  z.object({
    email: z.string().min(2).max(50),
    fullName: z.string().min(2).max(50),
  })
);

// Create form
const form = useForm({
  validationSchema: formSchema,
});

// Create payment intent, initialize Stripe element
async function initialize() {
  // Create payment intent
  const { data } = await useFetch("/api/stripe/payment_intent", {
    method: "post",
    body: { items: cart.getCart },
    server: false,
  });

  console.log(data.value);

  const clientSecret = data.value?.client_secret;

  let elements;

  const appearance = {
    theme: "stripe",
  };

  if (stripe != null) {
    elements = stripe.elements({ appearance, clientSecret });
    const paymentElementOptions = {
      layout: "accordion",
    };

    const paymentElement = elements.create("payment", paymentElementOptions);
    paymentElement.mount("#payment-element");
  }
}

initialize();

const onSubmit = form.handleSubmit((values) => {
  console.log("Form submitted!", values);
});
</script>

<template>
  <div class="w-screen h-full min-h-screen bg-white flex flex-row items-center">
    <div
      class="bg-orange-50/50 w-full h-screen p-16 border border-r-1 border-gray-300 basis-2/5 shrink-0 flex flex-col items-start space-y-8"
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/"> Home </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/checkout"> Checkout </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <NuxtLink
        to="/"
        class="text-3xl font-pinyon w-fit h-fit z-100 after:block after:w-36 after:h-1 after:border-b after:border-black after:-translate-y-2 after:-z-10"
      >
        Cozy Threads
      </NuxtLink>

      <div class="flex flex-col items-start py-8 space-y-4">
        <div
          class="relative bg-white border border-px border-black/10 rounded-2xl w-full h-fit p-5"
          v-for="item of cart.getCart"
        >
          <!-- Cart item card -->
          <div class="w-full flex flex-row items-center space-x-4">
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
            <div
              class="flex flex-col items-center w-full h-fit grid grid-cols-1 gap-0.5"
            >
              <span class="font-bold">{{ item.title }}</span>
              <span class="text-sm truncate w-3/4">{{ item.description }}</span>
            </div>

            <!-- Item pricing breakdown (quantity & price, subtotal of product) -->
            <span class="w-fit text-sm text-nowrap text-gray-500 text-end">
              <span>
                {{ item.quantity }}x
                {{ getPriceString(item.price) }}
              </span>
              <Separator class="my-1.5"></Separator>
              <span>{{ getPriceString(item.price * item.quantity) }}</span>
            </span>
          </div>
        </div>
        <Separator></Separator>
        <span class="w-full text-end pr-2"
          >Total:
          <span class="font-bold">{{
            getTotalPriceString(cart.getCart)
          }}</span></span
        >
      </div>
    </div>
    <div class="grow flex flex-col items-center">
      <div class="w-full max-w-md py-16 h-fit">
        <span class="text-xl font-semibold">Billing Info</span>
        <form
          id="payment-form"
          class="flex flex-col space-y-4"
          @submit="onSubmit"
        >
          <FormField v-slot="{ componentField }" name="fullName">
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="John Doe"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="johndoe@email.com"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <div id="payment-element">
            <!--Stripe.js injects the Payment Element-->
          </div>
          <Button id="submit" class="w-full">
            <div class="spinner hidden" id="spinner"></div>
            <span id="button-text">Pay now</span>
          </Button>
          <div id="payment-message" class="hidden"></div>
        </form>
      </div>
    </div>
  </div>
</template>
