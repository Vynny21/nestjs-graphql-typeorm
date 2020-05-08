export default class MessageInput {
    readonly content: string;
    readonly userId: number;
}
export declare class DeleteMessageInput {
    readonly id: number;
    readonly userId: number;
}
export declare class UpdateMessageInput {
    readonly updateId: number;
    readonly userId: number;
}
