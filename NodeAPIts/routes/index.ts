/*
 * GET home page.
 */
import express = require('express');
const router = express.Router();
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Repository } from "typeorm";
import { User } from "../DAL/Entity/User";
import { DBORM } from "../DAL/SQLDAL";

router.get('/', (req: express.Request, res: express.Response) => {
    var ORM = new DBORM();

    let oUser = new User();
    oUser.ID = "0002";
    oUser.FullName = "Tester";
    var CurTime: Date = new Date(Date.now());
    oUser.FullName = CurTime.toLocaleString();
    oUser.CreateTime = new Date(Date.now());
    oUser.UpdateTime = new Date(Date.now());
    var Title = "";
    ORM.ORM(oUser, async function (Repository: Repository<User>){
        await Repository.save(oUser);
        
        let ItemList = await Repository.findOneById("0002");
        Title = ItemList.ID;
        //ItemList.forEach(Item => {
        //    Title += Item.ID + " ";
        //})
        
    });
    res.render('index', { title: Title });
});

export default router;