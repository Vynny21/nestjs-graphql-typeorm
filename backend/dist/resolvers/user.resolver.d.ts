import User from "../db/models/user.entity";
import { UserService } from "../services/user.service";
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    getUser(user: User, id: number): Promise<User>;
    register(username: string, email: string, password: string): Promise<String>;
    login(username: string, email: string, password: string): Promise<String>;
}
