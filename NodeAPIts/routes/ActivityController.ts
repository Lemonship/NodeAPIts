/*
 * GET home page.
 */
import express = require('express');
const router = express.Router();
import "reflect-metadata";
import { createConnection, Repository } from "typeorm";
import { activity } from "../DAL/Entity/ActivityEntity";
import { DBORM , DBSetting} from "../DAL/SQLDAL";
import { ORM } from "../Utility/InitSystem";

var EntityClass = activity;
var ListViewName = EntityClass.EntityName + 'List';
var ItemViewName = EntityClass.EntityName + 'Item';


router.get('/', async (req: express.Request, res: express.Response) => {
    var _ItemList = await ORM.GetList(new EntityClass());
    res.render(ListViewName, { EntityName: activity.EntityName, DataList: _ItemList});
});
router.route('/:ID') // 輸入id當作參數
    .get(async function (req, res) {
        if (req.params.ID.toLowerCase() == "newitem") {
            var _instance = new EntityClass();
            res.render(ItemViewName, { EntityName: EntityClass.EntityName, Item: _instance, readonly: false, newform: true });
        }
        else {
            var Result = await ORM.ExistID(new activity(), req.params.ID);
            if (!Result)
                res.render('error', { message: EntityClass.EntityName + " Not Exist" });
            else {
                var _instance = await ORM.GetByID(new activity(), req.params.ID);
                res.render(ItemViewName, { EntityName: EntityClass.EntityName, Item: _instance, readonly: false, newform: false });
            }
        }
    })
    .post(async function (req, res) {
        //Put, Post, Delete
        var Method: string = req.body.submit;
        var _instance = new activity();
        if (Method == undefined)
            res.json({ "Message": "Method Error" });
        else if (Method.toLowerCase() == "post")
            _instance.ID = req.body.ID;
        else
            _instance.ID = req.params.ID;
        var Result = await ORM.ExistID(_instance, _instance.ID);
        if (Result) 
            _instance = await ORM.GetByID(_instance, _instance.ID);
        if (_instance.ID == undefined)
            res.json({ "Message": "Invalid " + activity.EntityName + " ID" });
        else if (Result && (Method.toLowerCase() == "post"))
            res.json({ "Message": EntityClass.EntityName + " Exist" });
        else if (!Result && (Method.toLowerCase() != "post"))
            res.json({ "Message": EntityClass.EntityName + " Not Exist" });
        else if (Method.toLowerCase() == "delete") {
            await ORM.DeleteByID(_instance, _instance.ID);
            res.redirect('../')
        }
        else{
            _instance.Name = req.body.Name;
            await ORM.Save(_instance);
            var _responseuser = await ORM.GetByID(new EntityClass(), _instance.ID);
            res.render(ItemViewName, { EntityName: EntityClass.EntityName, Item: _responseuser, readonly: true, newform: false });
        }
    })
export default router;