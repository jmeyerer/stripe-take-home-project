import { CheckoutItem } from "~/composables/useCheckout";

export const useCartStore = defineStore("cartStore", {
  persist: true,
  state: () => ({
    cart: [] as CheckoutItem[],
  }),
  actions: {
    updateCart(newCart: CheckoutItem[]) {
      this.cart = newCart.map((item) => ({
        ...item,
        quantity: unref(item.quantity), // Unwrap ref before storing
      }));
    },
    addToCart(newItem: CheckoutItem) {
      if (this.cart.some((item) => item.id === newItem.id)) {
        // If id of the cart object is the same, just update the quantity field
        this.cart = this.cart.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: unref(newItem.quantity) }
            : item
        );
      }

      // Otherwise, the object wasn't in the cart. Push it to the array.
      else {
        this.cart.push({
          ...newItem,
          quantity: unref(newItem.quantity), // Unwrap ref before storing
        });
      }
    },
    removeFromCart(id: number) {
      const index = this.cart.findIndex((item) => item.id === id);

      if (this.cart.length == 1) {
        this.cart.pop();
      } else if (index !== -1) {
        this.cart.splice(index, 1);
      }
    },
  },
  getters: {
    getCart: (state) =>
      state.cart.map((item) => ({
        ...item,
        quantity: unref(item.quantity), // Unwrap ref when returning
      })),
    getTotalItems: (state) => {
      if (state.cart.length == 0) return 0;

      let totalItems = 0;
      for (let item of state.cart) {
        totalItems += item.quantity;
      }
      return totalItems;
    },
  },
});
