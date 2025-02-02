import { CheckoutItem } from '~/composables/useCheckout'

export const useCartStore = defineStore('cartStore', {
    state: () => ({
      cart: [] as CheckoutItem[]
    }),
    actions: {
      updateCart(newCart: CheckoutItem[]) {
        this.cart = newCart.map(item => ({
          ...item,
          quantity: unref(item.quantity) // Unwrap ref before storing
        }));
      }
    }
  })