import "reflect-metadata";
import { createConnection, getEntityManager, Repository, Connection } from "typeorm";
import { user } from "./Entity/UserEntity" ;

export interface Entities {
}

export class DBSetting {
    constructor(Type: string, Host: string, Port: number, Username: string, Password: string, Database: string)
    {
        this.type = Type;
        this.host = Host;
        this.port = Port;
        this.username = Username;
        this.password = Password;
        this.database = Database;
    }
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

export class DBORM {

    _DBSetting: DBSetting;
    _CodeFirst: boolean;
    _Connection: Connection;
    constructor(DBSetting: DBSetting, CodeFirst: boolean)
    {
        this._DBSetting = DBSetting;
        this._CodeFirst = CodeFirst;
    }
    async OpenConnection()
    {    
        var _Connect: boolean = false;
        if (this._Connection == undefined)
            _Connect = true;
        else {
            if (!this._Connection.isConnected)
                try {
                    await this._Connection.connect();
                } catch (error) {
                    console.debug(error);
                }
        }
        if (_Connect) {
            try {
                this._Connection = await createConnection({
                    type: "mssql",
                    host: this._DBSetting.host,
                    port: this._DBSetting.port,
                    username: this._DBSetting.username,
                    password: this._DBSetting.password,
                    database: this._DBSetting.database,
                    entities: [__dirname + "/Entity/*.js"],
                    //entities: [user],
                    autoSchemaSync: this._CodeFirst
                })
            } catch (error) {
                console.debug(error);
            }
        }
    }
    ORM<EntityClass>(instance, response: Function) {
        var Result = createConnection({
            type: "mssql",
            host: this._DBSetting.host,
            port: this._DBSetting.port,
            username: this._DBSetting.username,
            password: this._DBSetting.password,
            database: this._DBSetting.database,
            entities: [__dirname + "/Entity/*.js"],
            //entities: [user],
            autoSchemaSync: this._CodeFirst
        }).then(async connection => {
            try {
                let Repository = connection.getRepository(instance.constructor.name);
                Result = await response(Repository);
                await connection.close();
                return Result;
            } catch(error){
                await connection.close();
                console.debug(error);
            }
        }).catch(async error => {
            //res.render('error', { error: error });
            console.debug(error);
            });
        return Result;
    };
    async GetList<T extends Entities>(instance: T): Promise<T[]> {
        await this.OpenConnection();
        let Repository = this._Connection.getRepository<T>(instance.constructor.name);
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
    async GetByID<T extends Entities>(instance: T, ID): Promise<T>{
        await this.OpenConnection();
        let Repository = this._Connection.getRepository<T>(instance.constructor.name);
        var Result = await Repository.findOneById(ID);
        await this._Connection.close();
        //var Result = await this.ORM(instance, async (Repository: Repository<T>) => {
        //    var tResult = await Repository.findOneById(ID);
        //    return tResult;
        //});
        return Result;
    }
    async ExistID<T extends Entities>(instance: T, ID): Promise<boolean> {
        await this.OpenConnection();
        let Repository = this._Connection.getRepository(instance.constructor.name);
        var oResult = await Repository.findOneById(ID);
        var bResult = (oResult != undefined)
        await this._Connection.close();
        return bResult;
        //var Result = await this.ORM(instance, async (Repository: Repository<T>) => {
        //    var oResult = await Repository.findOneById(ID);
        //    var bResult = (oResult != undefined)
        //    return bResult;
        //});
        //return Result;
    }
    async Save<T extends Entities>(instance: T) {
        await this.OpenConnection();
        let Repository = this._Connection.getRepository(instance.constructor.name);
        await Repository.save(instance);
        await this._Connection.close();
        //await this.ORM(instance, async function (Repository: Repository<T>) {
        //    await Repository.save(instance);
        //});
    }
    async SaveList<T extends Entities>(instances: T[]) {
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
    async Delete<T extends Entities>(instance: T) {
        await this.OpenConnection();
        let Repository = this._Connection.getRepository(instance.constructor.name);
        await Repository.remove(instance);
        await this._Connection.close();
        //await this.ORM(instance, async function (Repository: Repository<T>) {
        //    await Repository.remove(instance);
        //});
    }
    async DeleteByID<T extends Entities>(instance: T, ID) {
        await this.OpenConnection();
        let Repository = this._Connection.getRepository(instance.constructor.name);
        await Repository.removeById(ID);
        await this._Connection.close();
        //await this.ORM(instance, async function (Repository: Repository<T>) {
        //    await Repository.removeById(ID);
        //});
    }
}
