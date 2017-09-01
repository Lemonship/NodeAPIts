"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserEntity_1 = require("../DAL/Entity/UserEntity");
const SQLDAL_1 = require("../DAL/SQLDAL");
const express = require("express");
const router = express.Router();
const ORM = new SQLDAL_1.DBORM();
router.get('/', async function (req, res) {
    var _UserList = await ORM.GetList(new UserEntity_1.User());
    res.json(_UserList);
});
router.route('/:ID') // 輸入id當作參數
    .get(async function (req, res) {
    var _User = await ORM.GetByID(new UserEntity_1.User(), req.params.ID);
    res.json({ _User });
})
    .post(async function (req, res) {
    var _User = new UserEntity_1.User();
    _User.ID = req.params.ID;
    _User.FullName = req.body.User.FullName;
    await ORM.Merge(_User);
    res.json({ _User });
})
    .put(async function (req, res) {
    var _User = new UserEntity_1.User();
    _User.ID = req.params.ID;
    _User.FullName = req.body.User.FullName;
    await ORM.Merge(_User);
    res.json({ _User });
})
    .delete(async function (req, res) {
    var _User = await ORM.DeleteByID(new UserEntity_1.User(), req.params.ID);
    res.json({ _User });
});
exports.default = router;
