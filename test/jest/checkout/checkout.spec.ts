import { Checkout, PricingRule } from "@/checkout/checkout";

describe("checkout with special discount pacakge", () => {
    test ('should return the total price', () => {
        const pricingRules: PricingRule[] = [
            { item: 'A', unitPrice: 50, specialPrice: { quantity: 3, discountedPrice: 130 } },
            { item: 'B', unitPrice: 30, specialPrice: { quantity: 2, discountedPrice: 45 } },
            { item: 'C', unitPrice: 20 },
            { item: 'D', unitPrice: 15 },
        ];
        
        const checkoutInstance : Checkout = new Checkout(pricingRules);
        checkoutInstance.scan("A");
        checkoutInstance.scan("B");
        checkoutInstance.scan("A");
        checkoutInstance.scan("B");
        checkoutInstance.scan("A");
        checkoutInstance.scan("A");
        
        const totalPrice : number = checkoutInstance.total();

        // expect 225
        expect(totalPrice).toBe(225)
    });
});