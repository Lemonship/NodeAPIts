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
    oUser.FullName = "Tester";
    var CurTime = new Date(Date.now());
    oUser.FullName = CurTime.toLocaleString();
    oUser.CreateTime = new Date(Date.now());
    oUser.UpdateTime = new Date(Date.now());
    var Title = "";
    async function GetUser(Repository) {
        var Result = await Repository.findOneById("0002");
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
exports.default = router;
