import { user } from "../DAL/Entity/UserEntity";
import { DBORM, DBSetting } from "../DAL/SQLDAL";


import express = require('express');
const router = express.Router();
const DevDB: DBSetting = new DBSetting("mssql", "localhost", 1433, "Development", "P@ssw0rd", "Development");
const ORM = new DBORM(DevDB, false);


router.get('/', async function (req, res) {
    var UserList = await ORM.GetList(new user());
    res.json(UserList);
});
router.route('/:ID') // 輸入id當作參數
    .get(async function (req, res) {
        var Result = await ORM.ExistID(new user(), req.params.ID);
        if (!Result)
            res.json({ "Message": "Item Not Exist" });
        var user = await ORM.GetByID(new user(), req.params.ID);
        res.json(user);
    })

    .post(async function (req, res) {
        var _user = new user();
        var Result = await ORM.ExistID(new user(), req.body.ID);
        if (req.body.ID == undefined)
            res.json({ "Message": "Invalid User ID" });
        else if (Result)
            res.json({ "Message":"Item Exist"});
        else {
            _user.ID = req.body.ID;
            _user.FullName = req.body.FullName;
            await ORM.Save(_user);
            var user = await ORM.GetByID(new user(), req.body.ID);
            res.json(user);
        }
    })

    .put(async function (req, res) {
        var _user = new user();
        _user.ID = req.params.ID;
        _user.FullName = req.body.FullName;
        var Result = await ORM.ExistID(new user(), req.params.ID);
        if (req.params.ID == undefined)
            res.json({ "Message": "Invalid User ID" });
        else if (!Result)
            res.json({ "Message": "Item Not Exist"});
        else {
            await ORM.Save(_user);
            var user = await ORM.GetByID(new user(), req.params.ID);
            res.json(user);
        }
    })

    .delete(async function (req, res) {
        var Result = await ORM.ExistID(new user(), req.params.ID);
        if (!Result)
            res.json({ "Message": "Item Not Exist" });
        else {
            var user = await ORM.DeleteByID(new user(), req.params.ID);
            var Result = await ORM.ExistID(new user(), req.params.ID);
            if (!Result)
                res.json({ "Message": "Item Deleted" });
            else
                res.json({ "Message": "Item Delete Failed" });
        }
    })

export default router;