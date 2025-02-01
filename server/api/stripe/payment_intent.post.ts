import Stripe from 'stripe';
import { CheckoutItem } from '~/composables/useCheckout'

const runtimeConfig = useRuntimeConfig();
const stripe = new Stripe(runtimeConfig.public.publishableKey as string);


export class PaymentIntentRequestBody {
    items: CheckoutItem[];

    constructor(items: CheckoutItem[]) {
        this.items = items;
    }
}


function calculateOrderAmount(items: CheckoutItem[]) {
    let totalAmount = 0;

    for (let item of items) {
        totalAmount += item.price;
    }

    return totalAmount;
}


export default defineEventHandler(async (event) => {
    // Handle case where Stripe fails to initialize first
    if (stripe == null) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Stripe failed to initialize',
        });
    }
    
    // Get event body
    const body: PaymentIntentRequestBody = await readBody(event);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(body.items),
        currency: "eur",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
            enabled: true,
        },
    });

    return {
        paymentIntent: paymentIntent
    };
});

