import "reflect-metadata";
import { createConnection, getEntityManager, Repository } from "typeorm";
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

    constructor(DBSetting: DBSetting, CodeFirst: boolean)
    {
        this._DBSetting = DBSetting;
        this._CodeFirst = CodeFirst;
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
            let Repository = connection.getRepository(instance.constructor.name);
            Result = await response(Repository);
            await connection.close();
            return Result;
        }).catch(error => {
            //res.render('error', { error: error });
            console.debug(error);
            });
        return Result;
    };
    async GetList<T extends Entities>(instance: T): Promise<T[]> {
        var Result = await this.ORM(instance, async (Repository: Repository<T>) => {
            var tResult = await Repository.find();
            return tResult;
        });
        return Result;
    }
    async GetByID<T extends Entities>(instance:T, ID): Promise<T>{
        var Result = await this.ORM(instance, async (Repository: Repository<T>) => {
            var tResult = await Repository.findOneById(ID);
            return tResult;
        });
        return Result;
    }
    async ExistID<T extends Entities>(instance: T, ID): Promise<boolean> {
        var Result = await this.ORM(instance, async (Repository: Repository<T>) => {
            var oResult = await Repository.findOneById(ID);
            var bResult = (oResult != undefined)
            return bResult;
        });
        return Result;
    }
    async Save<T extends Entities>(instance:T) {
        await this.ORM(instance, async function (Repository: Repository<T>) {
            await Repository.save(instance);
        });
    }
    async SaveList<T extends Entities>(instance: T[]) {
        await this.ORM(instance, async function (Repository: Repository<T>) {
            await Repository.save(instance);
        });
    }
    async Delete<T extends Entities>(instance: T) {
        await this.ORM(instance, async function (Repository: Repository<T>) {
            await Repository.remove(instance);
        });
    }
    async DeleteByID<T extends Entities>(instance: T, ID) {
        await this.ORM(instance, async function (Repository: Repository<T>) {
            await Repository.removeById(ID);
        });
    }
}
