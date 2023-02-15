import { mockend } from "../config/api";
import { BudgetService } from "./budgetService";

jest.mock("../config/api.ts");

const users = [
    { id: 1, tax: 79 },
    { id: 2, tax: 50 },
];
const products = [
    { id: 1, price: 8312 },
    { id: 2, price: 2120 },
];

const mockMockend = mockend;
mockMockend.get = jest.fn().mockImplementation((url: string) => {
    if (url === "users")
        return {
            data: users,
        };
    return { data: products };
});

const service = new BudgetService(mockend);

describe("calcBudget", () => {
    it("should return 15648 if tax is equal 50%", async () => {
        const sut = await service.calcBudget(50, [1, 2]);
        expect(sut).toBe(15648);
    });

    it("should return 9143  if tax is equal 10%", async () => {
        const sut = await service.calcBudget(10, [1]);
        expect(sut).toBe(9143);
    });

    it("should return 2332  if tax is equal 10%", async () => {
        const sut = await service.calcBudget(10, [2]);
        expect(sut).toBe(2332);
    });
});

describe("applyTax", () => {
    it("should return 110 if tax = 10 and amount = 100", async () => {
        const sut = service.applyTax(10, 100);
        expect(sut).toBe(110);
    });

    it("should return 138 if tax = 15 and amount = 120", async () => {
        const sut = service.applyTax(15, 120);
        expect(sut).toBe(138);
    });

    it("should return 17515 if tax = 55 and amount = 11300", async () => {
        const sut = service.applyTax(55, 11300);
        expect(sut).toBe(17515);
    });

    it("should throw an error if tax is lower than 0", async () => {
        expect(() => {
            service.applyTax(-10, 1200);
        }).toThrow("Invalid tax. Should be greater than 0.");
    });

    it("should throw an error if amount is lower than 0", async () => {
        expect(() => {
            service.applyTax(10, -1200);
        }).toThrow("Invalid amount. Should be greater than 0.");
    });
});

describe("calcTax", () => {
    it("should return 10 if tax = 10 and amount = 100", async () => {
        const sut = service.calcTax(10, 100);
        expect(sut).toBe(10);
    });

    it("should return 18 if tax = 15 and amount = 120", async () => {
        const sut = service.calcTax(15, 120);
        expect(sut).toBe(18);
    });

    it("should return 6215 if tax = 55 and amount = 11300", async () => {
        const sut = service.calcTax(55, 11300);
        expect(sut).toBe(6215);
    });
});

describe("validate product price", () => {
    it("should throw an error if any price is lower than 0", async () => {
        expect(() => {
            service.validatePrices([100, -20]);
        }).toThrow("Invalid product price.");
    });

    it("should return true if all prices are valid", async () => {
        const sut = service.validatePrices([100, 20]);
        expect(sut).toBe(true);
    });
});
