"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
//import { User } from "../DAL/Entity/User";
class DBORM {
    ORM(instance, response) {
        typeorm_1.createConnection({
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
            //let DBManager = connection.manager;
            await response(Repository);
            await connection.close();
        }).catch(error => {
            //res.render('error', { error: error });
            console.debug(error);
        });
    }
}
exports.DBORM = DBORM;
