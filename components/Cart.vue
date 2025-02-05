<script setup lang="ts">
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'

const cart = useCartStore()
const { getPriceString, getTotalPriceString } = useCheckout()
</script>


<template>
    <Sheet>
        <SheetTrigger as-child>
            <Button
                class="relative w-fit h-fit py-2.5 px-4 rounded-bl-3xl rounded-tl-none rounded-tr-none rounded-br-none flex items-center justify-center">
                <Icon name="material-symbols-light:shopping-cart" size="24px"></Icon>
                <span>
                    Cart
                </span>
                <span
                    class="bg-red-500 font-bold w-4 h-4 rounded-full absolute top-1 left-7 text-xs text-white flex flex-col items-center">
                    {{
                        cart.getTotalItems
                    }}
                </span>
            </Button>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Shopping Cart</SheetTitle>
                <SheetDescription class="pb-4">
                    Items
                </SheetDescription>
            </SheetHeader>
            <div class="flex flex-col items-start space-y-4 h-full w-full">
                <div class="relative bg-slate-100 rounded-2xl w-full h-fit p-5" v-for="item of cart.getCart">
                    <Button class="w-8 h-8 p-0 rounded-full flex items-center justify-center absolute -top-3 -right-3"
                        @click="cart.removeFromCart(item.id)">
                        -
                    </Button>

                    <!-- Cart item card -->
                    <div class="w-full flex flex-row items-center space-x-4">
                        <!-- Product image -->
                        <NuxtImg :src="item.image" alt="image" format="webp" provider="static" preset="cart"
                            class="rounded-lg outline outline-slate-400 outline-2" placeholder>
                        </NuxtImg>

                        <!-- Product title and description -->
                        <div class="flex flex-col items-center w-full h-fit grid grid-cols-1 gap-0.5">
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

                <div v-if="cart.getCart.length > 0" class="w-full">
                    <Separator class="my-1.5"></Separator>

                    <!-- Subtotal calculation -->
                    <div class="flex flex-col items-end w-full">
                        <span class="flex flex-row space-x-8">
                            <span class="font-bold">Subtotal: </span>
                            <span>{{ getTotalPriceString(cart.getCart) }}</span>
                        </span>
                        <NuxtLink class="pt-12" to="/checkout">
                            <Button
                                class="flex flex-row items-center gap-0 group pl-6 pr-4"
                            >
                                <span>Checkout</span>
                                <Icon name="material-symbols-light:arrow-back-2-rounded" size="24px" class="rotate-180 transition transition-all duration-300 ease-in-out group-hover:translate-x-1"></Icon>
                            </Button>
                        </NuxtLink>
                    </div>

                    
                </div>

                <div v-else class="font-bold text-black">
                    The cart is empty. Add some stuff!
                </div>

            </div>
        </SheetContent>
    </Sheet>
</template>