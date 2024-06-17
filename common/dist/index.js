"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlog = exports.createblogInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    email: zod_1.default.string().min(6),
    password: zod_1.default.string().min(8),
    name: zod_1.default.string().optional()
});
exports.signinInput = zod_1.default.object({
    email: zod_1.default.string().min(6),
    password: zod_1.default.string().min(8)
});
exports.createblogInput = zod_1.default.object({
    title: zod_1.default.string().min(5),
    content: zod_1.default.string().min(100),
});
exports.updateBlog = zod_1.default.object({
    title: zod_1.default.string().min(5),
    content: zod_1.default.string().min(100),
    id: zod_1.default.string()
});
// jidagi kesi hai paheli raheee kabhi to hasaye kabhi ye rulaye 
// zindagi kemni chali rahi che yaar shu kari shakay
//  there is my mistake so what should i do now 
