"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
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
    ;
    async GetByID(EntityClass, ID) {
        var instance = new EntityClass();
        var Result = await this.ORM(instance, async (Repository) => {
            var tResult = await Repository.findOneById(ID);
            return tResult;
        });
        return Result;
    }
    factory(type) {
        return new type();
    }
}
exports.DBORM = DBORM;
