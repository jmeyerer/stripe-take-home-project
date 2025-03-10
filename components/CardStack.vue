<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast'

const props = defineProps<{
    items: CheckoutItem[]
}>();

const cart = useCartStore();
const { getPriceString } = useCheckout();
const { toast } = useToast();

function addToCart(item: CheckoutItem) {
    toast({
        title: "Added to cart",
        description: `${item.quantity.value}x ${item.title} | ${getPriceString(item.price)}`,
        image: item.image
    });

    cart.addToCart(item);
    item.quantity.value = 0;  // Reset the quantity of item user just added to cart to 0
}
</script>


<template>
    <div
        class="max-w-screen-2xl h-fit py-8 flex flex-col items-center space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-4">
        <Card v-for="(item, index) in items" :key="index" class="lg:grow h-full w-full max-w-80">
            <CardHeader>
                <CardTitle>{{ item.title }}</CardTitle>
                <CardDescription>{{ item.description }}</CardDescription>
            </CardHeader>
            <CardContent class="flex flex-col items-center pb-0">
                <img :src="item.image" alt="image" width="250" height="250" class="rounded-md"></img>
                <span class="w-full flex justify-end px-4 pt-1 italic text-gray-500 text-lg font-semibold">
                    <span>{{ getPriceString(item.price) }}</span>
                </span>
            </CardContent>
            <CardFooter class="flex justify-between px-6 space-x-4">
                <NumberField id="quantity" :default-value="0" :min="0" :max="10" v-model="item.quantity.value"
                    class="w-24">
                    <Label for="quantity">Quantity</Label>
                    <NumberFieldContent>
                        <NumberFieldDecrement class="p-2" />
                        <NumberFieldInput class="p-1 h-8" />
                        <NumberFieldIncrement class="p-2" />
                    </NumberFieldContent>
                </NumberField>
                <Button class="mt-auto" @click="addToCart(item)" :disabled="item.quantity.value === 0">
                    <span v-if="cart.getCart.some(cartItem => cartItem.id === item.id)">
                        Update cart
                    </span>
                    <span v-else>
                        Add to cart
                    </span>
                </Button>
            </CardFooter>
        </Card>
    </div>
</template>