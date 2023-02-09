import axios from "axios";

export const mockend = axios.create({
    baseURL: "https://mockend.com/juunegreiros/BE-test-api/",
});
