import { JwtPayload } from '../interfaces/jwt-payload.interfaces';
import { UserService } from '../services/user.service';
import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(payload: JwtPayload, done: Function): Promise<any>;
}
export {};
