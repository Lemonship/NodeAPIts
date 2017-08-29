import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "../DAL/Entity/User";

//export class DB {
    export async function Update(instance : User, response : Function) {
        createConnection({
            type: "mssql",
            host: "localhost",
            port: 1433,
            username: "Development",
            password: "P@ssw0rd",
            database: "Development",
            entities: [User],
            autoSchemaSync: true
        }).then(async connection => {
            let UserRepository = connection.getRepository(instance.constructor.name);
            await response(UserRepository);
            await connection.close();

        }).catch(error => {
            //res.render('error', { error: error });
            console.debug(error);
        }
            );
    }
//}