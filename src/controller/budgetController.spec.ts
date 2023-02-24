import supertest = require("supertest");
import { app } from "../app";

describe("getUserBudget", () => {
    it("should response have a 404 status code if user data not found with provided user id", async () => {
        await supertest(app)
            .post("/user-budget")
            .send({
                user_id: 102,
                product_ids: [1, 2],
            })
            .expect(404)
            .expect((res) => {
                expect(res.body).toHaveProperty("status", "fail");
                expect(res.body).toHaveProperty(
                    "message",
                    "users not found: 102"
                );
            });
    });

    it("should return a user budget amount = 16790 if user was found and products ids are valid", async () => {
        await supertest(app)
            .post("/user-budget")
            .send({
                user_id: 1,
                product_ids: [1, 2],
            })
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty("status", "success");
                expect(res.body).toHaveProperty("data");
                expect(res.body.data).toHaveProperty("user_id", 1);
                expect(res.body.data).toHaveProperty("user_budget", 16790);
            });
    });

    it("should return a user budget amount = 5577 if user was found and products ids are valid", async () => {
        await supertest(app)
            .post("/user-budget")
            .send({
                user_id: 8,
                product_ids: [7],
            })
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty("status", "success");
                expect(res.body).toHaveProperty("data");
                expect(res.body.data).toHaveProperty("user_id", 8);
                expect(res.body.data).toHaveProperty("user_budget", 5577);
            });
    });

    it("should return response with an error status fail and a error message if any product id was not found", async () => {
        await supertest(app)
            .post("/user-budget")
            .send({
                user_id: 8,
                product_ids: [102, 1],
            })
            .expect(404)
            .expect((res) => {
                expect(res.body).toHaveProperty("status", "fail");
                expect(res.body).toHaveProperty(
                    "message",
                    "can't calc the user budget. check user id and product ids"
                );
            });
    });

    it("should return response with an error status fail and a error message if the request json content is invalid", async () => {
        await supertest(app)
            .post("/user-budget")
            .send({
                user_id: 8,
            })
            .expect(422)
            .expect((res) => {
                expect(res.body).toHaveProperty("status", "fail");
                expect(res.body).toHaveProperty(
                    "message",
                    "the request json is invalid. check the correct json properties"
                );
            });
    });
});
