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
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = __importDefault(require("../db/models/user.entity"));
const user_service_1 = require("../services/user.service");
const common_1 = require("@nestjs/common");
const glqauthguard_1 = require("../middlewares/glqauthguard");
const type_graphql_1 = require("type-graphql");
const graphql_1 = require("@nestjs/graphql");
const user_decorators_1 = require("../decorators/user.decorators");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async getUser(user, id) {
        if (user.id != id)
            throw new common_1.UnauthorizedException();
        return await this.userService.getUserById(id);
    }
    async register(username, email, password) {
        var user = await this.userService.register(username, email, password);
        if (user != null) {
            return this.userService.createToken({ id: user.id });
        }
        throw new common_1.HttpException('error registering user', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async login(username, email, password) {
        var user = await this.userService.login(username, email, password);
        if (user != null) {
            return this.userService.createToken({ id: user.id });
        }
        throw new common_1.HttpException('error logging user in', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
__decorate([
    common_1.UseGuards(glqauthguard_1.GqlAuthGuard),
    graphql_1.Query(returns => user_entity_1.default, { name: 'user', nullable: true }),
    __param(0, user_decorators_1.User()), __param(1, graphql_1.Args({ name: 'id', type: () => type_graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.default, Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUser", null);
__decorate([
    graphql_1.Mutation(returns => String, { name: 'register', nullable: true }),
    __param(0, graphql_1.Args('username')),
    __param(1, graphql_1.Args('email')),
    __param(2, graphql_1.Args('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Query(returns => String, { name: 'login', nullable: true }),
    graphql_1.Query(returns => String, { name: 'login', nullable: true }),
    __param(0, graphql_1.Args('username')),
    __param(1, graphql_1.Args('email')),
    __param(2, graphql_1.Args('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
UserResolver = __decorate([
    graphql_1.Resolver(of => user_entity_1.default),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map