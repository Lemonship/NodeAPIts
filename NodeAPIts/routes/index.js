"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * GET home page.
 */
const express = require("express");
const router = express.Router();
require("reflect-metadata");
const User_1 = require("../DAL/Entity/User");
const SQLDAL_1 = require("../DAL/SQLDAL");
router.get('/', async (req, res) => {
    var ORM = new SQLDAL_1.DBORM();
    let oUser = new User_1.User();
    oUser.ID = "0003";
    oUser.FullName = "Tester3";
    var CurTime = new Date(Date.now());
    oUser.FullName = oUser.FullName + " " + CurTime.toLocaleString();
    var Title = "";
    //===================================
    await ORM.Merge(oUser);
    var sUser1 = await ORM.GetByID(new User_1.User(), oUser.ID);
    var UserList = await ORM.GetList(new User_1.User());
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
exports.default = router;
