import "reflect-metadata";
import { createConnection } from "typeorm";
//import { User } from "../DAL/Entity/User";

export class DBORM {
    ORM(instance, response : Function) {
        createConnection({
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
            //let DBManager = connection.manager;
            await response(Repository);
            await connection.close();

        }).catch(error => {
            //res.render('error', { error: error });
            console.debug(error);
        });
    }
}