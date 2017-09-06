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
        var Result = await ORM.ExistID(new User(), req.params.ID);
        if (!Result)
            res.render('error', {message: "User Not Exist"});
        else {
            var user = await ORM.GetByID(new User(), req.params.ID);
            res.render('UserItem', { EntityName: "User", User: user });
        }
    })
export default router;