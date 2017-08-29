"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * GET home page.
 */
const express = require("express");
const router = express.Router();
require("reflect-metadata");
const User_1 = require("../DAL/Entity/User");
const SQLDAL_1 = require("../DAL/SQLDAL");
router.get('/', (req, res) => {
    let oUser = new User_1.User();
    oUser.ID = "0002";
    oUser.FullName = "Tester";
    var CurTime = new Date(Date.now());
    oUser.FullName = CurTime.toLocaleString();
    oUser.CreateTime = new Date(Date.now());
    oUser.UpdateTime = new Date(Date.now());
    SQLDAL_1.Update(oUser, async function (Repository) {
        await Repository.save(oUser);
        var Title = "";
        let ItemList = await Repository.findOneById("0002");
        Title = ItemList.ID;
        //ItemList.forEach(Item => {
        //    Title += Item.ID + " ";
        //})
        res.render('index', { title: Title });
    });
});
exports.default = router;
