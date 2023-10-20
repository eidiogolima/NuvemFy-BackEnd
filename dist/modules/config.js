"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const bcrypt_1 = require("bcrypt");
const { Router } = express_1.default;
const router = Router();
const jsonwebtoken_1 = require("jsonwebtoken");
const passport_oauth2_1 = require("passport-oauth2");
module.exports = {
    express: express_1.default,
    prisma,
    bcrypt: bcrypt_1.default,
    Router,
    router,
    jwt: jsonwebtoken_1.default,
    passport: passport_oauth2_1.default,
};
