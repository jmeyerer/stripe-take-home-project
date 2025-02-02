export const useCartStore = defineStore('cartStore', {
    state: () => ({
      cart: [] as CheckoutItem[]
    }),
    actions: {
      updateCart(newCart: CheckoutItem[]) {
        this.cart = newCart;
      }
    }
  })