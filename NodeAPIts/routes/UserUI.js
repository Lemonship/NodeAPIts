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
const DevelopmentDB = new SQLDAL_1.DBSetting("mssql", "localhost", 1433, "Development", "P@ssw0rd", "Development");
const ORM = new SQLDAL_1.DBORM(DevelopmentDB, false);
router.get('/', async (req, res) => {
    var UserList = await ORM.GetList(new UserEntity_1.User());
    var Title = "";
    //UserList.forEach(User => Title += User.ID + " ");
    res.render('UserList', { EntityName: "User", DataList: UserList });
});
router.route('/:ID') // 輸入id當作參數
    .get(async function (req, res) {
    var Result = await ORM.ExistID(new UserEntity_1.User(), req.params.ID);
    if (!Result)
        res.render('error', { message: "User Not Exist" });
    else {
        var user = await ORM.GetByID(new UserEntity_1.User(), req.params.ID);
        res.render('UserItem', { EntityName: "User", User: user });
    }
});
exports.default = router;
