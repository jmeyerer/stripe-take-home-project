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
      },
      addToCart(newItem: CheckoutItem) {
        // If quantity is 0, remove the item (if it's in the array)
        if(newItem.quantity.value == 0) {
          const index = this.cart.findIndex(item => item.id === newItem.id);
      
          if(this.cart.length == 1) {
            this.cart.pop()
          }

          else if(index !== -1) {
            this.cart = this.cart.splice(index, 1);
          }

          return;
        }

        console.log('got here')

        if(this.cart.some(item => item.id === newItem.id)) {
          // If id of the cart object is the same, just update the quantity field
          this.cart = this.cart.map(item =>
            item.id === newItem.id ? { ...item, quantity: unref(newItem.quantity) } : item
          )
        }

        // Otherwise, the object wasn't in the cart. Push it to the array.
        else {
          this.cart.push({
            ...newItem,
            quantity: unref(newItem.quantity) // Unwrap ref before storing
          })
        }

        console.log("new cart value: ")
        console.log(this.cart)
      }
    },
    getters: {
      getCart: (state) =>  state.cart.map(item => ({
        ...item,
        quantity: unref(item.quantity) // Unwrap ref when returning
      }))
    },
  })