"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * GET home page.
 */
const express = require("express");
const router = express.Router();
require("reflect-metadata");
const UserEntity_1 = require("../DAL/Entity/UserEntity");
const SQLDAL_1 = require("../DAL/SQLDAL");
router.get('/', async (req, res) => {
    var ORM = new SQLDAL_1.DBORM();
    let oUser = new UserEntity_1.User();
    oUser.ID = "0003";
    oUser.FullName = "Tester3";
    var CurTime = new Date(Date.now());
    oUser.FullName = oUser.FullName + " " + CurTime.toLocaleString();
    //===================================
    //await ORM.Delete(oUser);
    //var sUser1 = await ORM.GetByID(new User(), oUser.ID);
    var UserList = await ORM.GetList(new UserEntity_1.User());
    var Title = "";
    UserList.forEach(User => Title += User.ID + " ");
    res.render('index', { title: Title });
    //===================================
});
exports.default = router;
