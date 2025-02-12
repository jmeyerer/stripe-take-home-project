<script setup lang="ts">
// @ts-nocheck
import { loadStripe } from "@stripe/stripe-js";
import { PaymentIntentRequestBody } from "~/server/api/stripe/payment_intent.post";
import { CheckoutItem } from "~/composables/useCheckout";

import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { useForm } from "vee-validate";
import { ToastAction } from '@/components/ui/toast'
import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();

const runtimeConfig = useRuntimeConfig();
const stripe = await loadStripe(runtimeConfig.public.publishableKey);

const cart = useCartStore();
const { getPriceString, getTotalPriceString } = useCheckout();

const loading = ref(false)

let elements;  // Stripe elements object
let origin = ref("");  // Origin URL for setting return_url when confirming the payment

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

onMounted(() => {
  if (import.meta.client) {
    initialize();

    // Set the origin for the return_url
    origin.value = window.location.origin;
  }
});

// Create payment intent, initialize Stripe element
async function initialize() {
  // Create payment intent
  const data = await $fetch("/api/stripe/payment_intent", {
    method: "post",
    body: { items: cart.getCart },
    server: false,
  });

  const clientSecret = data?.client_secret;

  const appearance = {
    theme: "stripe",
  };

  if (stripe && clientSecret) {
    try {
      elements = stripe.elements({ appearance, clientSecret });
      const paymentElementOptions = {
        layout: "accordion",
      };

      const paymentElement = elements.create("payment", paymentElementOptions);
      paymentElement.mount("#payment-element");
    } catch (e) {
      showMessage("An error occurred when initializing Stripe element.")
    }
  }
}

const onSubmit = form.handleSubmit(async (values) => {
  setLoading(true);

  try {
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${origin.value}/success`,
        receipt_email: values?.email ?? ""
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      showMessage(error.message);
    } else {
      showMessage("An unexpected error occurred.");
    }
  } catch (e) {
    showMessage("An unexpected error occurred.");
    setLoading(false);
  }

  setLoading(false);
});

function showMessage(messageText) {
  console.log("show a message!!")
  toast({
    title: 'Uh oh! Something went wrong.',
    description: messageText,
    variant: 'destructive',
  });
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  if (isLoading) {
    loading.value = true;
  } else {
    loading.value = false;
  }
}
</script>

<template>
  <ClientOnly>
    <div class="w-screen h-full min-h-screen bg-white flex flex-col lg:flex-row lg:items-center">
      <Toaster />
      <div
        class="bg-orange-50/50 w-full h-full basis-2/5 shrink-0 flex flex-col items-center lg:items-start space-y-8 lg:min-h-screen p-12 lg:p-16 border-b border-b-1 lg:border-b-0 lg:border-r lg:border-r-1 border-gray-300"
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
          class="w-full h-fit text-5xl text-center font-pinyon py-4 lg:text-5xl lg:w-fit lg:text-left lg:after:block after:w-54 after:h-1 after:border-b after:border-black after:-translate-y-2.5"
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
              <img
                :src="item.image"
                alt="image"
                width="50px"
                height="50px"
                class="rounded-lg outline outline-slate-400 outline-2"
              >
              </img>

              <!-- Product title and description -->
              <div
                class="w-full h-fit grid grid-cols-1 gap-0.5"
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
      <div class="grow flex flex-col items-center lg:overflow-y-scroll lg:max-h-screen">
        <div class="w-full max-w-md lg:max-w-lg p-12 lg:py-16 h-fit">
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
            <Button id="submit" class="w-full" :disabled="loading">
              <LoadingSpinner v-if="loading" />
              <span id="button-text">Pay now</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
