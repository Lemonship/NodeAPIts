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
    async function GetUser(Repository) {
        var Result = await Repository.findOneById("0002");
        return Result.ID;
    }
    ////===================================
    //var sUser1;
    //var Result = ORM.Merge<User>(oUser).then(async Result=>
    //    {
    //    sUser1 = await ORM.GetByID<User>(new User(), oUser.ID);
    //    res.render('index', { title: sUser1.FullName });
    //});
    //var sUser1 = await ORM.GetByID<User>(new User(), oUser.ID);
    ////===================================
    //res.render('index', { title: sUser1.FullName });
    //===================================
    //===================================
    await ORM.Merge(oUser);
    //===================================
    var sUser1 = await ORM.GetByID(new User_1.User(), oUser.ID);
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
exports.default = router;
