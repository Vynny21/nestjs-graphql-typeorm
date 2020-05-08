"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.User = common_1.createParamDecorator((data, [root, args, ctx, info]) => ctx.req.user);
//# sourceMappingURL=user.decorators.js.map