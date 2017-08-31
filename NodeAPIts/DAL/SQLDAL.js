"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
//import { User } from "../DAL/Entity/User";
class DBORM {
    ORM(instance, response) {
        var Result = typeorm_1.createConnection({
            type: "mssql",
            host: "localhost",
            port: 1433,
            username: "Development",
            password: "P@ssw0rd",
            database: "Development",
            entities: [__dirname + "/Entity/*.js"],
            autoSchemaSync: true
        }).then(async (connection) => {
            let Repository = connection.getRepository(instance.constructor.name);
            Result = await response(Repository);
            return Result;
        }).catch(error => {
            //res.render('error', { error: error });
            console.debug(error);
        });
        return Result;
    }
}
exports.DBORM = DBORM;
