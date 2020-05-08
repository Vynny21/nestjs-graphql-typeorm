"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const repo_service_1 = __importDefault(require("../services/repo.service"));
const message_entity_1 = __importDefault(require("../db/models/message.entity"));
const user_entity_1 = __importDefault(require("../db/models/user.entity"));
const message_input_1 = __importStar(require("./input/message.input"));
let MessageResolver = class MessageResolver {
    constructor(repoService) {
        this.repoService = repoService;
    }
    async getMessages() {
        return this.repoService.messageRepo.find();
    }
    async getMessageFromUsers(userId) {
        return this.repoService.messageRepo.find({
            where: { userId }
        });
    }
    async getMessage(id) {
        return this.repoService.messageRepo.findOne(id);
    }
    async createMessage(input) {
        const message = this.repoService.messageRepo.create({
            id: input.userId,
            content: input.content,
        });
        return this.repoService.messageRepo.save(message);
    }
    async deleteMessage(input) {
        const message = await this.repoService.messageRepo.findOne(input.id);
        if (!message || message.userId !== input.userId)
            throw new Error('Message does not exist or you are not the messsage author.');
        const copy = Object.assign({}, message);
        await this.repoService.messageRepo.remove(message);
        return copy;
    }
    async updateMessage(input) {
        const message = await this.repoService.messageRepo.findOne(input.updateId);
        if (!message || message.userId !== input.userId)
            throw new Error('Message does not exist or you are not the messsage author.');
        const copy = Object.assign({}, message);
        await this.repoService.messageRepo.save(message);
        return copy;
    }
    async getUser(parent) {
        return this.repoService.userRepo.findOne(parent.userId);
    }
};
__decorate([
    graphql_1.Query(() => [message_entity_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "getMessages", null);
__decorate([
    graphql_1.Query(() => [message_entity_1.default], { nullable: true }),
    __param(0, graphql_1.Args('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "getMessageFromUsers", null);
__decorate([
    graphql_1.Query(() => message_entity_1.default, { nullable: true }),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "getMessage", null);
__decorate([
    graphql_1.Mutation(() => message_entity_1.default),
    __param(0, graphql_1.Args('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_input_1.default]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "createMessage", null);
__decorate([
    graphql_1.Mutation(() => message_entity_1.default, { nullable: true }),
    __param(0, graphql_1.Args('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_input_1.DeleteMessageInput]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "deleteMessage", null);
__decorate([
    graphql_1.Mutation(() => message_entity_1.default),
    __param(0, graphql_1.Args('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_input_1.UpdateMessageInput]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "updateMessage", null);
__decorate([
    graphql_1.ResolveField(() => user_entity_1.default, { name: 'user' }),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_entity_1.default]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "getUser", null);
MessageResolver = __decorate([
    graphql_1.Resolver(() => message_entity_1.default),
    __metadata("design:paramtypes", [repo_service_1.default])
], MessageResolver);
exports.default = MessageResolver;
//# sourceMappingURL=message.resolver.js.map