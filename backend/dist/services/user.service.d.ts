import User from '../db/models/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interfaces';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createToken(payload: JwtPayload): any;
    validateUser(payload: JwtPayload): Promise<User>;
    getUserById(id: number): Promise<User>;
    register(username: string, email: string, password: string): Promise<User>;
    login(username: string, email: string, password: string): Promise<User>;
}
