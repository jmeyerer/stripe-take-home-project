export class CheckoutItem {
    id: number;
    title: string;
    image: string;
    description: string;
    price: number;
    quantity: Ref<number>;

    constructor(id: number, title: string, image: string, description: string, price: number, quantity: Ref<number>) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
    }
}

export default function useCheckout() {
    
    
    
    
    
    return {

    }
}