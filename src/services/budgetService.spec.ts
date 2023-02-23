import { mockend } from "../config/api";
import { ResourceNotFoundError } from "../utils/ResourceNotFoundError";
import { BudgetService } from "./budgetService";
import { ProductService } from "./productService";
import { UserService } from "./userService";

jest.mock("../config/api.ts");

const users = [{ id: 1, tax: 50 }];
const products = [
    { id: 1, price: 8312 },
    { id: 2, price: 2120 },
];

const mockMockend = mockend;
mockMockend.get = jest.fn().mockImplementation((url: string) => {
    if (url.includes("users")) {
        if (url.includes("/", url.length - 2)) {
            const id = Number(url[url.length - 1]);
            if (id > 0) {
                return { data: users.find((u) => u.id === id) };
            }
        }

        return {
            data: users,
        };
    }
    return { data: products };
});

const userService = new UserService(mockend);
const productService = new ProductService(mockend);
const budgetService = new BudgetService(userService, productService);

describe("calcBudget", () => {
    it("should return 15648 if tax is equal 50%", async () => {
        const sut = await budgetService.calcBudget(1, [1, 2]);
        expect(sut).toBe(15648);
    });

    it("should return 9143  if tax is equal 50%", async () => {
        const sut = await budgetService.calcBudget(1, [1]);
        expect(sut).toBe(12468);
    });

    it("should return 2332  if tax is equal 50%", async () => {
        const sut = await budgetService.calcBudget(1, [2]);
        expect(sut).toBe(3180);
    });

    it("should return null if the product ids list is empty", async () => {
        const sut = await budgetService.calcBudget(1, []);
        expect(sut).toBe(null);
    });

    it("should return null if the product ids do not match", async () => {
        const sut = await budgetService.calcBudget(1, [2, 3]);
        expect(sut).toBe(null);
    });
});

describe("applyTax", () => {
    it("should return 110 if tax = 10 and amount = 100", async () => {
        const sut = budgetService.applyTax(10, 100);
        expect(sut).toBe(110);
    });

    it("should return 138 if tax = 15 and amount = 120", async () => {
        const sut = budgetService.applyTax(15, 120);
        expect(sut).toBe(138);
    });

    it("should return 17515 if tax = 55 and amount = 11300", async () => {
        const sut = budgetService.applyTax(55, 11300);
        expect(sut).toBe(17515);
    });

    it("should throw an error if tax is lower than 0", async () => {
        expect(() => {
            budgetService.applyTax(-10, 1200);
        }).toThrow("Invalid tax. Should be greater than 0.");
    });

    it("should throw an error if amount is lower than 0", async () => {
        expect(() => {
            budgetService.applyTax(10, -1200);
        }).toThrow("Invalid amount. Should be greater than 0.");
    });
});

describe("calcTax", () => {
    it("should return 10 if tax = 10 and amount = 100", async () => {
        const sut = budgetService.calcTax(10, 100);
        expect(sut).toBe(10);
    });

    it("should return 18 if tax = 15 and amount = 120", async () => {
        const sut = budgetService.calcTax(15, 120);
        expect(sut).toBe(18);
    });

    it("should return 6215 if tax = 55 and amount = 11300", async () => {
        const sut = budgetService.calcTax(55, 11300);
        expect(sut).toBe(6215);
    });
});
