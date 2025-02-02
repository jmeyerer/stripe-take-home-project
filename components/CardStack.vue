<script setup lang="ts">
const props = defineProps<{
  items: CheckoutItem[]
}>();

const cart = useCartStore();

</script>


<template>
    <div class="max-w-screen-xl h-fit py-8 flex flex-col items-center space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-4">
        <Card 
            v-for="(item, index) in items"
            :key="index"
        >
            <CardHeader>
              <CardTitle>{{item.title}}</CardTitle>
              <CardDescription>{{item.description}}</CardDescription>
            </CardHeader>
            <CardContent>
              <NuxtImg
                :src="item.image"
                format="webp"
                alt="image"
                width="250" 
                height="250" 
                class="rounded-md"
                placeholder
              ></NuxtImg>
            </CardContent>
            <CardFooter
                class="flex justify-between px-6 pb-6 space-x-4"
            >
                <NumberField 
                    id="quantity" 
                    :default-value="0" 
                    :min="0"
                    :max="10"
                    v-model="item.quantity.value"
                    class="w-24"
                >
                    <Label for="quantity">Quantity</Label>
                    <NumberFieldContent>
                        <NumberFieldDecrement class="p-2"/>
                        <NumberFieldInput class="p-1 h-8"/>
                        <NumberFieldIncrement class="p-2"/>
                    </NumberFieldContent>
                </NumberField>
                <Button
                    class="mt-auto"
                    @click="cart.addToCart(item)"
                >
                    Add to cart
                </Button>
            </CardFooter>
          </Card>
    </div>
</template>