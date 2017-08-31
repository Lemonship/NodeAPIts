import "reflect-metadata";
import { createConnection, getEntityManager, Repository } from "typeorm";
import { User } from "../DAL/Entity/User";

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
            return Result;
        }).catch(error => {
            //res.render('error', { error: error });
            console.debug(error);
            });
        return Result;
    };

    async GetByID<EntityClass>(EntityClass, ID): Promise<EntityClass>{
        var instance: EntityClass = new EntityClass();
        var Result = await this.ORM(instance, async (Repository: Repository<EntityClass>) => {
            var tResult = await Repository.findOneById(ID);
            return tResult;
        });
        return Result;
    }
    factory<T>(type: { new (): T }): T {
        return new type();
    }

}