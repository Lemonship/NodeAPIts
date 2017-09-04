import { User } from "../DAL/Entity/UserEntity";
import { DBORM } from "../DAL/SQLDAL";


import express = require('express');
const router = express.Router();
const ORM = new DBORM();


router.get('/', async function (req, res) {
    var UserList = await ORM.GetList(new User());
    res.json(UserList);
});
router.route('/:ID') // 輸入id當作參數
    .get(async function (req, res) {
        var user = await ORM.GetByID(new User(), req.params.ID);
        res.json(user);
    })

    .post(async function (req, res) {
        var _user = new User();
        var Result = await ORM.ExistID(new User(), req.body.ID);
        if (Result)
            res.json({"Message":"ID Exist"});
        else {
            _user.ID = req.body.ID;
            _user.FullName = req.body.FullName;
            await ORM.Save(_user);
            var user = await ORM.GetByID(new User(), req.body.ID);
            res.json(user);
        }
    })

    .put(async function (req, res) {
        var _user = new User();
        _user.ID = req.params.ID;
        _user.FullName = req.body.FullName;
        var Result = await ORM.ExistID(new User(), req.params.ID);
        if (!Result)
            res.json({ "Message": "User Not Exist"});
        else {
            await ORM.Save(_user);
            var user = await ORM.GetByID(new User(), req.params.ID);
            res.json(user);
        }
    })

    .delete(async function (req, res) {
        var Result = await ORM.ExistID(new User(), req.params.ID);
        if (!Result)
            res.json({ "Message": "User Not Exist" });
        else {
            var user = await ORM.DeleteByID(new User(), req.params.ID);
            var Result = await ORM.ExistID(new User(), req.params.ID);
            if (!Result)
                res.json({ "Message": "User Deleted" });
            else
                res.json({ "Message": "User Delete Failed" });
        }
    })

export default router;