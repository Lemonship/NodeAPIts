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
        _User.ID = req.body.User.ID;
        var Result = await ORM.ExistID(_User, req.body.User.ID);
        if (Result)
            res.json({});
        else {
            _User.ID = req.body.User.ID;
            _User.FullName = req.body.User.FullName;
            await ORM.Save(_User);
            var res_User = await ORM.GetByID(new User(), req.body.User.ID);
            res.json({ res_User });
        }

    })

    .put(async function (req, res) {
        var _User = new User();
        _User.ID = req.params.ID;
        _User.FullName = req.body.User.FullName;
        var Result = await ORM.ExistID(_User, req.params.ID);
        if (!Result)
            res.json({});
        else {
            await ORM.Save(_User);
            var res_User = await ORM.GetByID(new User(), req.params.ID);
            res.json({ res_User });
        }
    })

    .delete(async function (req, res) {
        var _User = await ORM.DeleteByID(new User(), req.params.ID);
        res.json({ _User })
    })

export default router;