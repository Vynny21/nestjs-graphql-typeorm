import { Repository } from 'typeorm';
import Message from '../db/models/message.entity';
import User from '../db/models/user.entity';
declare class RepoService {
    readonly userRepo: Repository<User>;
    readonly messageRepo: Repository<Message>;
    constructor(userRepo: Repository<User>, messageRepo: Repository<Message>);
}
export default RepoService;
