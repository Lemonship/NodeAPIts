"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
class DBSetting {
    constructor(Type, Host, Port, Username, Password, Database) {
        this.type = Type;
        this.host = Host;
        this.port = Port;
        this.username = Username;
        this.password = Password;
        this.database = Database;
    }
}
exports.DBSetting = DBSetting;
class DBORM {
    constructor(DBSetting, CodeFirst) {
        this._DBSetting = DBSetting;
        this._CodeFirst = CodeFirst;
    }
    ORM(instance, response) {
        var Result = typeorm_1.createConnection({
            type: "mssql",
            host: this._DBSetting.host,
            port: this._DBSetting.port,
            username: this._DBSetting.username,
            password: this._DBSetting.password,
            database: this._DBSetting.database,
            entities: [__dirname + "/Entity/*.js"],
            //entities: [user],
            autoSchemaSync: this._CodeFirst
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
    async ExistID(instance, ID) {
        var Result = await this.ORM(instance, async (Repository) => {
            var oResult = await Repository.findOneById(ID);
            var bResult = (oResult != undefined);
            return bResult;
        });
        return Result;
    }
    async Save(instance) {
        await this.ORM(instance, async function (Repository) {
            await Repository.save(instance);
        });
    }
    async SaveList(instance) {
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
