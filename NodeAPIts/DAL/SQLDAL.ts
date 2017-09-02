import "reflect-metadata";
import { createConnection, getEntityManager, Repository } from "typeorm";
import { User } from "../DAL/Entity/UserEntity";

export interface Entities {
    
}
class Base<T extends Entities> {
    value: T;
    constructor(value: T) {
        this.value = value;
    }
    typeof(): string {
        return typeof this.value;
    }
}

export class DBORM {
    ORM<EntityClass>(instance, response: Function) {
        var Result = createConnection({
            type: "mssql",
            host: "localhost",
            port: 1433,
            username: "Development",
            password: "P@ssw0rd",
            database: "Development",
            entities: [__dirname + "/Entity/*.js"],
            autoSchemaSync: true
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
