const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { Router } = express;
const router = Router();
const jwt = require("jsonwebtoken");
const passport = require("passport-oauth2");

module.exports = {
  express,
  prisma,
  bcrypt,
  Router,
  router,
  jwt,
  passport,
};
