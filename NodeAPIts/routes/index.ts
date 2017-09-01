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

    //===================================
    await ORM.Merge(oUser);
    var sUser1 = await ORM.GetByID(new User(), oUser.ID);
    var UserList = await ORM.GetList(new User());
    UserList.forEach(User => Title += User.ID + " ");

    res.render('index', { title: Title });

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