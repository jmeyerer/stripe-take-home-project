<script setup lang="ts">
const { getPriceString } = useCheckout()

const allPayments: any = ref()

async function initialize() {
    const data = await $fetch("/api/stripe/get_payments", {
        method: "post",
        body: {},
        server: false,
    });

    console.log(data)

    allPayments.value = data;
}

onMounted(() => {
  if (import.meta.client) {
    initialize();
  }
});

const loading = ref(false)

async function refundItem(id: string) {
    loading.value = true;
    const data = await $fetch("/api/stripe/refund_payment", {
        method: "post",
        body: {
            id: id
        },
        server: false,
    }).finally(() => {
        loading.value = false;
    });

    console.log(data)
}

</script>

<template>
    <div
        class="w-screen min-h-screen h-full"
    >
        <div class="flex flex-col items-start w-4/5">
            
            <div 
                class="p-4 rounded-lg bg-blue-300 flex flex-row items-center space-x-4"
                v-if="allPayments"
                v-for="payment of allPayments"
            >
                <span>
                    {{  payment.id ?? '' }}
                </span>
                <span>
                    {{ getPriceString(payment.amount) ?? '' }}
                </span>
                <span>
                    {{ new Date (payment.created * 1000) ?? ''}}
                </span>
                <Button @click="refundItem(payment.id)" v-if="payment.status === 'succeeded'">
                    <LoadingSpinner v-if="loading" />
                    <span>Refund</span>
                </Button>
            </div>
        </div>
    </div>
</template>


<!-- 
    id
    amount
    when payment was made
-->