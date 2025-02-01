import {loadStripe} from '@stripe/stripe-js';

const runtimeConfig = useRuntimeConfig()
const stripe = await loadStripe(runtimeConfig.public.publishableKey as string);


export default defineEventHandler((event) => {
    



    return {};
});
