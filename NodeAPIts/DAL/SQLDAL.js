"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("../DAL/Entity/User");
//export class DB {
function Update(instance, response) {
    return __awaiter(this, void 0, void 0, function* () {
        typeorm_1.createConnection({
            type: "mssql",
            host: "localhost",
            port: 1433,
            username: "Development",
            password: "P@ssw0rd",
            database: "Development",
            entities: [User_1.User],
            autoSchemaSync: true
        }).then((connection) => __awaiter(this, void 0, void 0, function* () {
            let UserRepository = connection.getRepository(instance.constructor.name);
            yield response(UserRepository);
            yield connection.close();
        })).catch(error => {
            //res.render('error', { error: error });
            console.debug(error);
        });
    });
}
exports.Update = Update;
//} 
