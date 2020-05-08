import RepoService from '../services/repo.service';
import Message from 'src/db/models/message.entity';
import User from 'src/db/models/user.entity';
import MessageInput, { DeleteMessageInput, UpdateMessageInput } from './input/message.input';
export default class MessageResolver {
    private readonly repoService;
    constructor(repoService: RepoService);
    getMessages(): Promise<Message[]>;
    getMessageFromUsers(userId: number): Promise<Message[]>;
    getMessage(id: number): Promise<Message>;
    createMessage(input: MessageInput): Promise<Message>;
    deleteMessage(input: DeleteMessageInput): Promise<Message>;
    updateMessage(input: UpdateMessageInput): Promise<Message>;
    getUser(parent: Message): Promise<User>;
}
