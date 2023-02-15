import { AxiosInstance } from "axios";
import { Product } from "../types/Product";

export class BudgetService {
    constructor(private readonly mockend: AxiosInstance) {}

    async calcBudget(userTax: number, productIds: number[]): Promise<number> {
        const productsResponse = await this.mockend.get("products");
        const productsData: Product[] = productsResponse.data;
        const filteredProductsData = productsData.filter((p) =>
            productIds.includes(p.id)
        );
        const productPrices = filteredProductsData.map((p) => p.price);

        this.validatePrices(productPrices);

        const amount = productPrices.reduce(
            (amount, price) => amount + price,
            0
        );
        const newAmount = this.applyTax(userTax, amount);
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

    validatePrices(prices: number[]): boolean {
        const priceInvalid = prices.some((v) => v < 0);
        if (priceInvalid) throw new Error("Invalid product price.");
        return true;
    }
}
