"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserEntity_1 = require("../DAL/Entity/UserEntity");
const SQLDAL_1 = require("../DAL/SQLDAL");
const express = require("express");
const router = express.Router();
const ORM = new SQLDAL_1.DBORM();
router.get('/', async function (req, res) {
    var UserList = await ORM.GetList(new UserEntity_1.User());
    res.json(UserList);
});
router.route('/:ID') // 輸入id當作參數
    .get(async function (req, res) {
    var user = await ORM.GetByID(new UserEntity_1.User(), req.params.ID);
    res.json(user);
})
    .post(async function (req, res) {
    var _user = new UserEntity_1.User();
    var Result = await ORM.ExistID(new UserEntity_1.User(), req.body.ID);
    if (Result)
        res.json({ "Message": "ID Exist" });
    else {
        _user.ID = req.body.ID;
        _user.FullName = req.body.FullName;
        await ORM.Save(_user);
        var user = await ORM.GetByID(new UserEntity_1.User(), req.body.ID);
        res.json(user);
    }
})
    .put(async function (req, res) {
    var _user = new UserEntity_1.User();
    _user.ID = req.params.ID;
    _user.FullName = req.body.FullName;
    var Result = await ORM.ExistID(new UserEntity_1.User(), req.params.ID);
    if (!Result)
        res.json({ "Message": "User Not Exist" });
    else {
        await ORM.Save(_user);
        var user = await ORM.GetByID(new UserEntity_1.User(), req.params.ID);
        res.json(user);
    }
})
    .delete(async function (req, res) {
    var Result = await ORM.ExistID(new UserEntity_1.User(), req.params.ID);
    if (!Result)
        res.json({ "Message": "User Not Exist" });
    else {
        var user = await ORM.DeleteByID(new UserEntity_1.User(), req.params.ID);
        var Result = await ORM.ExistID(new UserEntity_1.User(), req.params.ID);
        if (!Result)
            res.json({ "Message": "User Deleted" });
        else
            res.json({ "Message": "User Delete Failed" });
    }
});
exports.default = router;
