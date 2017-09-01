"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
class Base {
    constructor(value) {
        this.value = value;
    }
    typeof() {
        return typeof this.value;
    }
}
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
            await connection.close();
            return Result;
        }).catch(error => {
            //res.render('error', { error: error });
            console.debug(error);
        });
        return Result;
    }
    ;
    async GetList(instance) {
        var Result = await this.ORM(instance, async (Repository) => {
            var tResult = await Repository.find();
            return tResult;
        });
        return Result;
    }
    async GetByID(instance, ID) {
        var Result = await this.ORM(instance, async (Repository) => {
            var tResult = await Repository.findOneById(ID);
            return tResult;
        });
        return Result;
    }
    async Merge(instance) {
        await this.ORM(instance, async function (Repository) {
            await Repository.save(instance);
        });
    }
    async Delete(instance) {
        await this.ORM(instance, async function (Repository) {
            await Repository.remove(instance);
        });
    }
    async DeleteByID(instance, ID) {
        await this.ORM(instance, async function (Repository) {
            await Repository.removeById(ID);
        });
    }
}
exports.DBORM = DBORM;
