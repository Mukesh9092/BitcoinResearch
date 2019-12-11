"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Period",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "Dashboard",
    embedded: false
  },
  {
    name: "Chart",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://prisma.docker.localhost`
});
exports.prisma = new exports.Prisma();