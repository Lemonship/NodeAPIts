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
    IsConnected() {
        var _Connected = false;
        if (this._Connection == undefined)
            _Connected = false;
        else
            _Connected = this._Connection.isConnected;
        return _Connected;
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
    async InitConnection() {
        try {
            await this.OpenConnection();
            await this._Connection.close();
            this._CodeFirst = false;
        }
        catch (error) {
            this._CodeFirst = false;
        }
    }
    async CloseConnection() {
        await this._Connection.close();
    }
    Query(Entity) {
        let Query = this._Connection.getRepository(Entity).createQueryBuilder(Entity.ClassName);
        return Query;
    }
    async GetList(instance) {
        var _Connected = this.IsConnected();
        if (!_Connected)
            await this.OpenConnection();
        let Repository = this._Connection.getRepository(instance.constructor.name);
        var Result = await Repository.find();
        if (!_Connected)
            await this._Connection.close();
        return Result;
    }
    async GetByID(instance, ID) {
        var _Connected = this.IsConnected();
        if (!_Connected)
            await this.OpenConnection();
        let Repository = this._Connection.getRepository(instance.constructor.name);
        var Result = await Repository.findOneById(ID);
        if (!_Connected)
            await this._Connection.close();
        return Result;
    }
    async ExistID(instance, ID) {
        var _Connected = this.IsConnected();
        if (!_Connected)
            await this.OpenConnection();
        let Repository = this._Connection.getRepository(instance.constructor.name);
        var oResult = await Repository.findOneById(ID);
        var bResult = (oResult != undefined);
        if (!_Connected)
            await this._Connection.close();
        return bResult;
    }
    async Save(instance) {
        var _Connected = this.IsConnected();
        if (!_Connected)
            await this.OpenConnection();
        let Repository = this._Connection.getRepository(instance.constructor.name);
        await Repository.save(instance);
        if (!_Connected)
            await this._Connection.close();
    }
    async Update(instance) {
        var _Connected = this.IsConnected();
        if (!_Connected)
            await this.OpenConnection();
        let Repository = this._Connection.getRepository(instance.constructor.name);
        await Repository.
        if (!_Connected)
            await this._Connection.close();
    }
    async SaveList(instances) {
        var _Connected = this.IsConnected();
        if (instances.length > 0) {
            if (!_Connected)
                await this.OpenConnection();
            let Repository = this._Connection.getRepository(instances[0].constructor.name);
            await Repository.persist(instances);
            if (!_Connected)
                await this._Connection.close();
        }
    }
    async Delete(instance) {
        var _Connected = this.IsConnected();
        if (!_Connected)
            await this.OpenConnection();
        let Repository = this._Connection.getRepository(instance.constructor.name);
        await Repository.remove(instance);
        if (!_Connected)
            await this._Connection.close();
    }
    async DeleteByID(instance, ID) {
        var _Connected = this.IsConnected();
        if (!_Connected)
            await this.OpenConnection();
        let Repository = this._Connection.getRepository(instance.constructor.name);
        await Repository.removeById(ID);
        if (!_Connected)
            await this._Connection.close();
    }
}
exports.DBORM = DBORM;
