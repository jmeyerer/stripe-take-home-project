import Stripe from 'stripe';

const runtimeConfig = useRuntimeConfig();
const stripe = new Stripe(runtimeConfig.secretKey as string);

class RefundPaymentBody {
    id: String;

    constructor(id: String) {
        this.id = id;
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
    const body: RefundPaymentBody = await readBody(event);

    
    const refund = await stripe.refunds.create({
        payment_intent: body.id as string
    });
   
    return refund;
});
