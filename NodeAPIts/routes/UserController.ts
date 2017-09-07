/*
 * GET home page.
 */
import express = require('express');
const router = express.Router();
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Repository } from "typeorm";
import { User } from "../DAL/Entity/UserEntity";
import { DBORM , DBSetting} from "../DAL/SQLDAL";


const DevelopmentDB: DBSetting = new DBSetting("mssql", "localhost", 1433, "Development", "P@ssw0rd", "Development");
const ORM = new DBORM(DevelopmentDB, false);
router.get('/', async (req: express.Request, res: express.Response) => {
    var UserList = await ORM.GetList(new User());

    var Title = "";
    //UserList.forEach(User => Title += User.ID + " ");

    res.render('UserList', { EntityName: "User", DataList: UserList});
});
router.route('/:ID') // 輸入id當作參數
    .get(async function (req, res) {
        if (req.params.ID.toLowerCase() == "newitem") {
            var user = new User();
            //user.ID = 'newitem';
            res.render('UserItem', { EntityName: "User", User: user, readonly: false, newform: true });
        }
        else {
            var Result = await ORM.ExistID(new User(), req.params.ID);
            if (!Result)
                res.render('error', { message: "User Not Exist" });
            else {
                var user = await ORM.GetByID(new User(), req.params.ID);
                res.render('UserItem', { EntityName: "User", User: user, readonly: false, newform: false });
            }
        }
    })
    .post(async function (req, res) {
        var Method: string = req.body.submit;
        var _user = new User();
        if (Method == undefined)
            res.json({ "Message": "Method Error" });
        else if (Method.toLowerCase() == "post")
            _user.ID = req.body.ID;
        else
            _user.ID = req.params.ID;
        var Result = await ORM.ExistID(_user, _user.ID);
        if (Result) 
            _user = await ORM.GetByID(_user, _user.ID);
        if (_user.ID == undefined)
            res.json({ "Message": "Invalid User ID" });
        else if (Result && (Method.toLowerCase() == "post"))
            res.json({ "Message": "Item Exist" });
        else if (!Result && (Method.toLowerCase() != "post"))
            res.json({ "Message": "Item Not Exist" });
        else if (Method.toLowerCase() == "delete") {
            await ORM.DeleteByID(_user, _user.ID);
            res.redirect('../')
        }
        else{
            _user.FullName = req.body.FullName;
            _user.UpdateTime = new Date(Date.now());
            await ORM.Save(_user);
            var user = await ORM.GetByID(new User(), _user.ID);
            res.render('UserItem', { EntityName: "User", User: user, readonly: true, newform: false });
        }
    })
export default router;