/*
 * GET home page.
 */
import express = require('express');
const router = express.Router();
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "../DAL/Entity/User";

router.get('/', (req: express.Request, res: express.Response) => {


    let oUser = new User();
    oUser.ID = "0001";
    oUser.FullName = "Tester";
    var CurTime: Date = new Date(Date.now());
    oUser.FullName = CurTime.toLocaleString();
    oUser.CreateTime = new Date(Date.now());
    oUser.UpdateTime = new Date(Date.now());

    var Connection: string = "localhost";
    //console.log(Connection);
    createConnection({
        type: "mssql",
        host: Connection,
        port: 1433,
        username: "Development",
        password: "P@ssw0rd",
        database: "Development",
        entities: [User],
        autoSchemaSync: true
    }).then(async connection => {
        let UserRepository = connection.getRepository(User);
        await UserRepository.save(oUser);
        
        let savedUser = await UserRepository.find();
        savedUser.forEach(Item => { res.render('index', { title: Item.FullName }); })
        await connection.close();
    }).catch(error => {
        res.render('error', { error: error });
    }
    );
});

export default router;