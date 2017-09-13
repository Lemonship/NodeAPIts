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
const InitSystem_1 = require("../Utility/InitSystem");
const DevelopmentDB = new SQLDAL_1.DBSetting("mssql", "localhost", 1433, "Development", "P@ssw0rd", "Development");
//const ORM = new DBORM(DevelopmentDB, false);
router.get('/', async (req, res) => {
    var UserList = await InitSystem_1.ORM.GetList(new UserEntity_1.user());
    var Title = "";
    //UserList.forEach(User => Title += User.ID + " ");
    res.render('UserList', { EntityName: "User", DataList: UserList });
});
router.route('/:ID') // 輸入id當作參數
    .get(async function (req, res) {
    if (req.params.ID.toLowerCase() == "newitem") {
        var _user = new UserEntity_1.user();
        res.render('UserItem', { EntityName: UserEntity_1.user.EntityName, User: _user, readonly: false, newform: true });
    }
    else {
        var Result = await InitSystem_1.ORM.ExistID(new UserEntity_1.user(), req.params.ID);
        if (!Result)
            res.render('error', { message: "User Not Exist" });
        else {
            var _user = await InitSystem_1.ORM.GetByID(new UserEntity_1.user(), req.params.ID);
            res.render('UserItem', { EntityName: "User", User: _user, readonly: false, newform: false });
        }
    }
})
    .post(async function (req, res) {
    //Put, Post, Delete
    var Method = req.body.submit;
    var _user = new UserEntity_1.user();
    if (Method == undefined)
        res.json({ "Message": "Method Error" });
    else if (Method.toLowerCase() == "post")
        _user.ID = req.body.ID;
    else
        _user.ID = req.params.ID;
    var Result = await InitSystem_1.ORM.ExistID(_user, _user.ID);
    if (Result)
        _user = await InitSystem_1.ORM.GetByID(_user, _user.ID);
    if (_user.ID == undefined)
        res.json({ "Message": "Invalid User ID" });
    else if (Result && (Method.toLowerCase() == "post"))
        res.json({ "Message": "Item Exist" });
    else if (!Result && (Method.toLowerCase() != "post"))
        res.json({ "Message": "Item Not Exist" });
    else if (Method.toLowerCase() == "delete") {
        await InitSystem_1.ORM.DeleteByID(_user, _user.ID);
        res.redirect('../');
    }
    else {
        _user.FullName = req.body.FullName;
        _user.UpdateTime = new Date(Date.now());
        await InitSystem_1.ORM.Save(_user);
        var _responseuser = await InitSystem_1.ORM.GetByID(new UserEntity_1.user(), _user.ID);
        res.render('UserItem', { EntityName: "User", User: _responseuser, readonly: true, newform: false });
    }
});
exports.default = router;
