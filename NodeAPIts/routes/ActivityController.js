"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * GET home page.
 */
const express = require("express");
const router = express.Router();
require("reflect-metadata");
const ActivityEntity_1 = require("../DAL/Entity/ActivityEntity");
const InitSystem_1 = require("../Utility/InitSystem");
var EntityClass = ActivityEntity_1.activity;
var ListViewName = EntityClass.EntityName + 'List';
var ItemViewName = EntityClass.EntityName + 'Item';
router.get('/', async (req, res) => {
    var _ItemList = await InitSystem_1.ORM.GetList(new EntityClass());
    res.render(ListViewName, { EntityName: ActivityEntity_1.activity.EntityName, DataList: _ItemList });
});
router.route('/:ID') // 輸入id當作參數
    .get(async function (req, res) {
    if (req.params.ID.toLowerCase() == "newitem") {
        var _instance = new EntityClass();
        res.render(ItemViewName, { EntityName: EntityClass.EntityName, Item: _instance, readonly: false, newform: true });
    }
    else {
        var Result = await InitSystem_1.ORM.ExistID(new ActivityEntity_1.activity(), req.params.ID);
        if (!Result)
            res.render('error', { message: EntityClass.EntityName + " Not Exist" });
        else {
            var _instance = await InitSystem_1.ORM.GetByID(new ActivityEntity_1.activity(), req.params.ID);
            res.render(ItemViewName, { EntityName: EntityClass.EntityName, Item: _instance, readonly: false, newform: false });
        }
    }
})
    .post(async function (req, res) {
    //Put, Post, Delete
    var Method = req.body.submit;
    var _instance = new ActivityEntity_1.activity();
    if (Method == undefined)
        res.json({ "Message": "Method Error" });
    else if (Method.toLowerCase() == "post")
        _instance.ID = req.body.ID;
    else
        _instance.ID = req.params.ID;
    var Result = await InitSystem_1.ORM.ExistID(_instance, _instance.ID);
    if (Result)
        _instance = await InitSystem_1.ORM.GetByID(_instance, _instance.ID);
    if (_instance.ID == undefined)
        res.json({ "Message": "Invalid " + ActivityEntity_1.activity.EntityName + " ID" });
    else if (Result && (Method.toLowerCase() == "post"))
        res.json({ "Message": EntityClass.EntityName + " Exist" });
    else if (!Result && (Method.toLowerCase() != "post"))
        res.json({ "Message": EntityClass.EntityName + " Not Exist" });
    else if (Method.toLowerCase() == "delete") {
        await InitSystem_1.ORM.DeleteByID(_instance, _instance.ID);
        res.redirect('../');
    }
    else {
        _instance.Name = req.body.Name;
        await InitSystem_1.ORM.Save(_instance);
        var _responseuser = await InitSystem_1.ORM.GetByID(new EntityClass(), _instance.ID);
        res.render(ItemViewName, { EntityName: EntityClass.EntityName, Item: _responseuser, readonly: true, newform: false });
    }
});
exports.default = router;
