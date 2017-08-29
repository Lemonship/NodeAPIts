/*
 * GET home page.
 */
import express = require('express');
const router = express.Router();
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "../DAL/entity/User";

router.get('/', (req: express.Request, res: express.Response) => {

    var Connection: string = "localhost\\sqlexpress";
    console.log(Connection);
    createConnection({
        type: "mssql",
        host: Connection,
        port: 1433,
        username: "Development",
        password: "P@ssw0rd",
        database: "Development",
        entities: [
            User
        ],
        autoSchemaSync: true
    }).then(connection => {

        let oUser = new User();
        oUser.ID = "0001";
        oUser.FullName = "Tester";
        oUser.CreateTime = new Date(Date.now());

        return connection.manager
            .save(User)
            .then(Item => {
                res.render('index', { title: "User" });
                //console.log("User has been saved");
            });

        }).catch(error => { res.render('error', { error: error })}
            //console.log(error)
        );
    //res.render('index', { title: 'ABC' });
});

export default router;