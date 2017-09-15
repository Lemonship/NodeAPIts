"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * GET home page.
 */
const express = require("express");
const router = express.Router();
require("reflect-metadata");
const ActivityEntity_1 = require("../DAL/Entity/ActivityEntity");
const CategoryEntity_1 = require("../DAL/Entity/CategoryEntity");
const InitSystem_1 = require("../Utility/InitSystem");
var EntityClass = ActivityEntity_1.activity;
var ListViewName = EntityClass.EntityName + 'List';
var ItemViewName = EntityClass.EntityName + 'Item';
router.get('/', async (req, res) => {
    //var _ItemList = await ORM.GetList(new EntityClass());
    //var Entity: Repository<activity> = await ORM.GetEntity<activity>(EntityClass);
    await InitSystem_1.ORM.OpenConnection();
    var Query = InitSystem_1.ORM.Query(EntityClass);
    var _ItemList = await Query.leftJoinAndSelect("activity.Category", "category").getMany();
    await InitSystem_1.ORM.CloseConnection();
    res.render(ListViewName, { EntityName: EntityClass.EntityName, DataList: _ItemList });
});
router.route('/:ID') // 輸入id當作參數
    .get(async function (req, res) {
    if (req.params.ID.toLowerCase() == "newitem") {
        var _category = await InitSystem_1.ORM.GetByID(new CategoryEntity_1.category(), 1);
        var _categoryList = await InitSystem_1.ORM.GetList(new CategoryEntity_1.category());
        var _instance = new EntityClass();
        _instance.Category = _category;
        res.render(ItemViewName, { EntityName: EntityClass.EntityName, Item: _instance, Categorys: _categoryList, readonly: false, newform: true });
    }
    else {
        var Result = await InitSystem_1.ORM.ExistID(new ActivityEntity_1.activity(), req.params.ID);
        if (!Result)
            res.render('error', { message: EntityClass.EntityName + " Not Exist" });
        else {
            var Query = await InitSystem_1.ORM.Query(EntityClass);
            await InitSystem_1.ORM.OpenConnection();
            var _instance = await Query.leftJoinAndSelect("activity.Category", "category").whereInIds([req.params.ID]).getOne();
            var _categorys = await InitSystem_1.ORM.Query(CategoryEntity_1.category).getMany();
            await InitSystem_1.ORM.CloseConnection();
            //var _instance = await ORM.GetByID(new activity(), req.params.ID);
            res.render(ItemViewName, { EntityName: EntityClass.EntityName, Item: _instance, Categorys: _categorys, readonly: false, newform: false });
        }
    }
})
    .post(async function (req, res) {
    //Put, Post, Delete
    var Query = InitSystem_1.ORM.Query(EntityClass);
    var Method = req.body.submit;
    var _instance = new EntityClass();
    if (Method == undefined)
        res.json({ "Message": "Method Error" });
    else if (Method.toLowerCase() == "post") {
        //_instance.ID = req.body.ID; 
    }
    else
        _instance.ID = req.params.ID;
    var ExistID = await InitSystem_1.ORM.ExistID(_instance, _instance.ID);
    if (ExistID)
        _instance = await InitSystem_1.ORM.GetByID(_instance, _instance.ID);
    if (_instance.ID == undefined && (Method.toLowerCase() != "post"))
        res.json({ "Message": "Invalid " + EntityClass.EntityName + " ID" });
    else if (ExistID && (Method.toLowerCase() == "post"))
        res.json({ "Message": EntityClass.EntityName + " Exist" });
    else if (!ExistID && (Method.toLowerCase() != "post"))
        res.json({ "Message": EntityClass.EntityName + " Not Exist" });
    else if (Method.toLowerCase() == "delete") {
        await InitSystem_1.ORM.OpenConnection();
        await Query.delete().whereInIds([_instance.ID]).execute();
        await InitSystem_1.ORM.CloseConnection();
        res.redirect('../');
    }
    else {
        _instance.Name = req.body.Name;
        _instance.Category = req.body.CategoryID;
        await InitSystem_1.ORM.OpenConnection();
        if (ExistID) {
            var _CategoryID = parseInt(req.body.CategoryID);
            await Query.update().set({ Name: _instance.Name, Category: _instance.Category }).whereInIds([_instance.ID]).execute();
            var _responseitem = await Query.leftJoinAndSelect("activity.Category", "category").whereInIds([req.params.ID]).getOne();
            res.render(ItemViewName, { EntityName: EntityClass.EntityName, Item: _responseitem, readonly: true, newform: false });
        }
        else {
            await Query.insert().into(EntityClass).values(_instance).execute();
            res.redirect('../');
        }
        await InitSystem_1.ORM.CloseConnection();
    }
});
exports.default = router;
