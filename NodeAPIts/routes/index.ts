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

router.get('/', async (req: express.Request, res: express.Response) => {
    var ORM = new DBORM();

    let oUser = new User();
    oUser.ID = "0003";
    oUser.FullName = "Tester3";
    var CurTime: Date = new Date(Date.now());
    oUser.FullName = oUser.FullName + " " + CurTime.toLocaleString();
    var Title = "";

    async function GetUser(Repository: Repository<User>) {
        var Result = await Repository.findOneById("0002")
        return Result.ID;
    }
    //===================================
    await ORM.Merge<User>(oUser);
    //===================================
    var sUser1 = await ORM.GetByID<User>(new User(), oUser.ID);
    //===================================
    res.render('index', { title: sUser1.FullName });
    //===================================


    //ORM.ORM(oUser, async function (Repository: Repository<User>) {
    //    var sResult: string = "";
    //    await Repository.save(oUser);

    //    let ItemList = await Repository.findOneById("0002");
    //    sResult = ItemList.ID;
    //    res.render('index', { title: sResult });
    //    return sResult;
    //})
        //.then(Result => res.render('index', { title: Result }))
        //.catch(error => res.render('error', { error: error }));
    //res.render('index', { title: Result });
    
});

export default router;