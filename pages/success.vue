<script setup lang="ts">

const cart = useCartStore();
const route = useRoute();

if (route.query.redirect_status && route.query.redirect_status == "succeeded") {
    // Clear the shopping cart of the user on success
    cart.$reset();
}

</script>


<template>
    <div class="h-full w-full min-h-screen">
        <div class="w-full h-full bg-white flex flex-col items-center justify-center">
            <div class="text-6xl font-pinyon p-16">Cozy Threads</div>

            <div>Success!</div>
            <NuxtLink to="/">
                <Button>
                    Go home
                </Button>
            </NuxtLink>
        </div>
    </div>
</template>