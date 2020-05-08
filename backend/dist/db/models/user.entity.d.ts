import Message from './message.entity';
export default class User {
    constructor(username: string, email: string, password: string);
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    messageConnection: Promise<Message[]>;
}
