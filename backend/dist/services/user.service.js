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
const user_entity_1 = __importDefault(require("../db/models/user.entity"));
const jwt = __importStar(require("jsonwebtoken"));
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const constants_1 = require("../constants");
const bcrypt = __importStar(require("bcrypt"));
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    createToken(payload) {
        const secretOrKey = constants_1.constants.secret;
        const token = jwt.sign(payload, secretOrKey);
        return token;
    }
    async validateUser(payload) {
        return await this.getUserById(payload.id);
    }
    async getUserById(id) {
        return await this.userRepository.findOne(id);
    }
    async register(username, email, password) {
        var duplicate = await this.userRepository.findOne({ where: { username: username } });
        if (duplicate != null) {
            throw new common_1.HttpException('username already taken', common_1.HttpStatus.CONFLICT);
        }
        if (password == undefined)
            password = "";
        password = await bcrypt.hash(password, 10);
        return await this.userRepository.save(new user_entity_1.default(username, email, password));
    }
    async login(username, email, password) {
        if (password == "") {
            throw new common_1.HttpException('empty password', common_1.HttpStatus.BAD_REQUEST);
        }
        var user = await this.userRepository.findOne({ where: { name: name } });
        if (user == null)
            return user;
        var isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            return user;
        }
        return null;
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map