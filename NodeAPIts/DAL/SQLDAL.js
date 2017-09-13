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
    async OpenConnection() {
        var _Connect = false;
        if (this._Connection == undefined)
            _Connect = true;
        else {
            if (!this._Connection.isConnected)
                try {
                    await this._Connection.connect();
                }
                catch (error) {
                    console.debug(error);
                }
        }
        if (_Connect) {
            try {
                this._Connection = await typeorm_1.createConnection({
                    type: "mssql",
                    host: this._DBSetting.host,
                    port: this._DBSetting.port,
                    username: this._DBSetting.username,
                    password: this._DBSetting.password,
                    database: this._DBSetting.database,
                    entities: [__dirname + "/Entity/*.js"],
                    //entities: [user],
                    autoSchemaSync: this._CodeFirst
                });
            }
            catch (error) {
                console.debug(error);
            }
        }
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
            try {
                let Repository = connection.getRepository(instance.constructor.name);
                Result = await response(Repository);
                await connection.close();
                return Result;
            }
            catch (error) {
                await connection.close();
                console.debug(error);
            }
        }).catch(async (error) => {
            //res.render('error', { error: error });
            console.debug(error);
        });
        return Result;
    }
    ;
    async GetList(instance) {
        await this.OpenConnection();
        let Repository = this._Connection.getRepository(instance.constructor.name);
        var Result = await Repository.find();
        await this._Connection.close();
        //var Result = await this.ORM(instance, async (Repository: Repository<T>) => {
        //    return tResult;
        //});
        return Result;
    }
    //async GetList<T extends Entities>(instance: T): Promise<T[]> {
    //    var Result = await this.ORM(instance, async (Repository: Repository<T>) => {
    //        var tResult = await Repository.find();
    //        return tResult;
    //    });
    //    return Result;
    //}
    async GetByID(instance, ID) {
        await this.OpenConnection();
        let Repository = this._Connection.getRepository(instance.constructor.name);
        var Result = await Repository.findOneById(ID);
        await this._Connection.close();
        //var Result = await this.ORM(instance, async (Repository: Repository<T>) => {
        //    var tResult = await Repository.findOneById(ID);
        //    return tResult;
        //});
        return Result;
    }
    async ExistID(instance, ID) {
        await this.OpenConnection();
        let Repository = this._Connection.getRepository(instance.constructor.name);
        var oResult = await Repository.findOneById(ID);
        var bResult = (oResult != undefined);
        await this._Connection.close();
        return bResult;
        //var Result = await this.ORM(instance, async (Repository: Repository<T>) => {
        //    var oResult = await Repository.findOneById(ID);
        //    var bResult = (oResult != undefined)
        //    return bResult;
        //});
        //return Result;
    }
    async Save(instance) {
        await this.OpenConnection();
        let Repository = this._Connection.getRepository(instance.constructor.name);
        await Repository.save(instance);
        await this._Connection.close();
        //await this.ORM(instance, async function (Repository: Repository<T>) {
        //    await Repository.save(instance);
        //});
    }
    async SaveList(instances) {
        if (instances.length > 0) {
            await this.OpenConnection();
            let Repository = this._Connection.getRepository(instances[0].constructor.name);
            await Repository.persist(instances);
            await this._Connection.close();
            //await this.ORM(instances[0], async function (Repository: Repository<T>) {
            //    await Repository.persist(instances);
            //    //instances.forEach(async instance => {
            //    //    await Repository.save(instance);
            //    //});
            //});
        }
    }
    async Delete(instance) {
        await this.OpenConnection();
        let Repository = this._Connection.getRepository(instance.constructor.name);
        await Repository.remove(instance);
        await this._Connection.close();
        //await this.ORM(instance, async function (Repository: Repository<T>) {
        //    await Repository.remove(instance);
        //});
    }
    async DeleteByID(instance, ID) {
        await this.OpenConnection();
        let Repository = this._Connection.getRepository(instance.constructor.name);
        await Repository.removeById(ID);
        await this._Connection.close();
        //await this.ORM(instance, async function (Repository: Repository<T>) {
        //    await Repository.removeById(ID);
        //});
    }
}
exports.DBORM = DBORM;
