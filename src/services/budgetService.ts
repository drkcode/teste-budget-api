import { Product } from "../types/Product";
import { ProductService } from "./productService";
import { UserService } from "./userService";

export class BudgetService {
    constructor(
        private readonly userService: UserService,
        private readonly productService: ProductService
    ) {}

    async calcBudget(
        userId: number,
        productIds: number[]
    ): Promise<number | null> {
        const userData = await this.userService.getUserById(userId);
        const products = await this.productService.filterProducts(productIds);
        const productPrices = this.getProductPrices(products);
        if (
            productIds.length !== productPrices.length ||
            productIds.length === 0
        ) {
            return null;
        }
        const amount = this.calculateAmount(productPrices);
        const newAmount = this.applyTax(userData.tax, amount);
        return newAmount;
    }

    applyTax(tax: number, amount: number): number {
        if (tax < 0) throw new Error("Invalid tax. Should be greater than 0.");
        if (amount < 0)
            throw new Error("Invalid amount. Should be greater than 0.");
        const taxAmount = this.calcTax(tax, amount);
        const newAmount = amount + taxAmount;
        return newAmount;
    }

    calcTax(tax: number, amount: number) {
        const result = amount * (tax / 100);
        return Number(result.toFixed(0));
    }

    getProductPrices(products: Product[]): number[] {
        return products.map((product) => product.price);
    }

    calculateAmount(prices: number[]): number {
        return prices.reduce((amount, price) => amount + price, 0);
    }
}
