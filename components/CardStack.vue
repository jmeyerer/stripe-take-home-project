<script setup lang="ts">
const props = defineProps<{
  items: CheckoutItem[]
}>();

</script>


<template>
    <div class="max-w-screen-xl h-full flex flex-col items-center space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-4">
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
                class="flex justify-between px-6 pb-6"
            >
                <NumberField 
                    id="quantity" 
                    :default-value="0" 
                    :min="0"
                    v-model="item.quantity.value"
                    class="w-24"
                >
                    <Label for="quantity">Quantity</Label>
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
                <Button
                    class="mt-auto"
                >
                    Add to cart
                </Button>
            </CardFooter>
          </Card>
    </div>
</template>