/*
 * GET home page.
 */
import express = require('express');
const router = express.Router();
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Repository } from "typeorm";
import { User } from "../DAL/Entity/UserEntity";
import { DBORM } from "../DAL/SQLDAL";

router.get('/', async (req: express.Request, res: express.Response) => {
    var ORM = new DBORM();

    let oUser = new User();
    oUser.ID = "0003";
    oUser.FullName = "Tester3";
    var CurTime: Date = new Date(Date.now());
    oUser.FullName = oUser.FullName + " " + CurTime.toLocaleString();
    

    //===================================
    //await ORM.Delete(oUser);
    //var sUser1 = await ORM.GetByID(new User(), oUser.ID);
    var UserList = await ORM.GetList(new User());

    var Title = "";
    UserList.forEach(User => Title += User.ID + " ");

    res.render('index', { title: Title});

    //===================================
 
    
});

export default router;