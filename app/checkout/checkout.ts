export interface PricingRule {
    item: string,
    unitPrice: number,
    specialPrice?: {
        quantity: number,
        discountedPrice: number,
    }
}

export class Checkout {

    private pricingRules : Map<string, PricingRule>;
    private itemList: Map<string, number>;
    
    constructor(pricingRules: PricingRule[]) {
        this.pricingRules = new Map(pricingRules.map(rule => [rule.item, rule]));
        this.itemList = new Map();
    }

    scan (item : string) : void {
        if (!this.itemList.has(item)) {
            this.itemList.set(item, 1);
        } else {
            this.itemList.set(item, this.itemList.get(item)! + 1);
        }
    }

    total () : number {
        let totalPrice : number = 0;
        this.itemList.forEach((quantity, item) => {
            const priceRule : PricingRule = this.pricingRules.get(item)!;
            if (priceRule && priceRule?.specialPrice) {
                // calculate price with discount price
                const discountPrice : number = priceRule.specialPrice?.discountedPrice;
                const discountQuantity : number = priceRule.specialPrice?.quantity;

                const countForDiscount : number = Math.floor(quantity / discountQuantity);
                const remainingCount : number = quantity % discountQuantity;

                totalPrice += countForDiscount * discountPrice + remainingCount * priceRule.unitPrice;
            } else {
                // calculate price with normal price
                totalPrice += quantity * priceRule.unitPrice;
            }
        });
        return totalPrice;
    }    
}

// define the price rule first with special price packages
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
console.log (totalPrice);