import { AxiosInstance } from "axios";
import { User } from "../types/User";
import { ResourceNotFoundError } from "../utils/ResourceNotFoundError";

export class UserService {
    constructor(private readonly mockend: AxiosInstance) {}

    async getUsers(): Promise<User[]> {
        try {
            const response = await this.mockend.get("users");
            const users = response.data;
            return users;
        } catch (error) {
            throw new ResourceNotFoundError("fail", "users not found");
        }
    }

    async getUserById(id: number): Promise<User> {
        try {
            const response = await this.mockend.get("users/" + id);
            const user = response.data;
            return user;
        } catch (error) {
            throw new ResourceNotFoundError("fail", "user not found: " + id);
        }
    }
}
