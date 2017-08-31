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
    oUser.FullName = "Tester";
    var CurTime: Date = new Date(Date.now());
    oUser.FullName = CurTime.toLocaleString();
    oUser.CreateTime = new Date(Date.now());
    oUser.UpdateTime = new Date(Date.now());
    var Title = "";

    async function GetUser(Repository: Repository<User>) {
        var Result = await Repository.findOneById("0002")
        return Result.ID;
    }
    

    //ORM.ORM(oUser, async function (Repository: Repository<User>) {
    //    await Repository.save(oUser);
    //});

    var sUser1 = await ORM.ORM(oUser, GetUser);
    res.render('index', { title: sUser1 });

    //ORM.ORM(oUser, function (Repository: Repository<User>) {
    //    return new Promise(async function (resolve, reject) {
    //        Repository.findOneById("0002").then
    //            (Result => {
    //                var ItemList = ItemList.ID;
    //                resolve(Title);}
    //            );

    //    });
    //});
    

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