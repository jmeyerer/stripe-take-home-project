import Stripe from 'stripe';

const runtimeConfig = useRuntimeConfig();
const stripe = new Stripe(runtimeConfig.secretKey as string);

class GetPaymentsBody {
    onlySuccessfulPayments: Boolean;

    constructor(onlySuccessfulPayments: Boolean) {
        this.onlySuccessfulPayments = onlySuccessfulPayments;
    }
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
    const body = await readBody(event);

    
    const paymentIntents = await stripe.paymentIntents.list({
        limit: 50,
    });
   
    return paymentIntents.data;
   
});
