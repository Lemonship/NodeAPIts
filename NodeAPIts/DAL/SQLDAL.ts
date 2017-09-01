import "reflect-metadata";
import { createConnection, getEntityManager, Repository } from "typeorm";
import { User } from "../DAL/Entity/User";

export interface Entities {
    
}
interface Base<T extends Entities> {
    constructor(): T;
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

    async GetByID<T extends Entities>(instance, ID): Promise<T>{
        //var Item: Base<T> ;
        //instance = new Item();
        var Result = await this.ORM(instance, async (Repository: Repository<T>) => {
            var tResult = await Repository.findOneById(ID);

            return tResult;
        });
        return Result;
    }
    async Merge<T extends Entities>(instance) {
        await this.ORM(instance, async function (Repository: Repository<T>) {
            await Repository.save(instance);
        });
    }
}
