import Stripe from 'stripe';
import { CheckoutItem } from '~/composables/useCheckout'

const runtimeConfig = useRuntimeConfig();
const stripe = new Stripe(runtimeConfig.secretKey as string);


export class PaymentIntentRequestBody {
    items: CheckoutItem[];

    constructor(items: CheckoutItem[]) {
        this.items = items;
    }
}

/**
 * Calculates subtotal for of a list of `CheckoutItem`.
 * 
 * @param items List of items in user's cart
 * @returns Calculated subtotal of items in the user's cart
 */
function calculateOrderAmount(items: CheckoutItem[]) {
    let totalAmount = 0;

    for (let item of items) {
        totalAmount += (item.price * item.quantity);
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

    // Create a PaymentIntent with the calculated subtotal for the list of items
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(body.items),
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    // Return the response from the Stripe API of the newly created PaymentIntent
    return {
        paymentIntent: paymentIntent
    };
});

