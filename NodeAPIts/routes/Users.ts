import { User } from "../DAL/Entity/UserEntity";
import { DBORM } from "../DAL/SQLDAL";


import express = require('express');
const router = express.Router();
const ORM = new DBORM();


router.get('/', async function (req, res) {
    var _UserList = await ORM.GetList(new User());
    res.json(_UserList);
});
router.route('/:ID') // 輸入id當作參數
    .get(async function (req, res) {
        var _User = await ORM.GetByID(new User(), req.params.ID);
        res.json({_User})
    })

    .post(async function (req, res) {
        var _User = new User();
        _User.ID = req.params.ID;
        _User.FullName = req.body.User.FullName;
        await ORM.Merge(_User);
        res.json({_User})
    })

    .put(async function (req, res) {
        var _User = new User();
        _User.ID = req.params.ID;
        _User.FullName = req.body.User.FullName;
        await ORM.Merge(_User);
        res.json({ _User })
    })

    .delete(async function (req, res) {
        var _User = await ORM.DeleteByID(new User(), req.params.ID);
        res.json({ _User })
    })

export default router;