export class CheckoutItem {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  quantity: Ref<number>;

  constructor(
    id: number,
    title: string,
    image: string,
    description: string,
    price: number,
    quantity: Ref<number>
  ) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
  }
}

export default function useCheckout() {
  function getPriceString(price: number) {
    return `\$${price.toString().slice(0, -2)}.${price.toString().slice(-2)}`;
  }

  function getTotalPriceString(cart: any[]) {
    let totalPrice = 0;

    for (let item of cart) {
      totalPrice += item.price * item.quantity;
    }

    return `\$${totalPrice.toString().slice(0, -2)}.${totalPrice
      .toString()
      .slice(-2)}`;
  }

  return {
    getPriceString,
    getTotalPriceString,
  };
}
