import { AxiosInstance } from "axios";
import { Product } from "../types/Product";
import { ResourceNotFoundError } from "../utils/ResourceNotFoundError";

export class ProductService {
    constructor(private readonly mockend: AxiosInstance) {}

    async getProducts(): Promise<Product[]> {
        try {
            return await this.fetchProducts();
        } catch (error) {
            throw new ResourceNotFoundError("fail", "Products not found.");
        }
    }

    async filterProducts(productIds: number[]): Promise<Product[]> {
        try {
            const products = await this.fetchProducts();
            const filteredProducts = products.filter((product) =>
                productIds.includes(product.id)
            );
            return filteredProducts;
        } catch (error) {
            throw new ResourceNotFoundError("fail", "Products not found.");
        }
    }

    async fetchProducts(): Promise<Product[]> {
        const response = await this.mockend.get("products");
        const products = response.data;
        return products;
    }
}
