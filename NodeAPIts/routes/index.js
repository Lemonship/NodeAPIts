"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    SQLDAL_1.Update(oUser, function (Repository) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Repository.save(oUser);
            let ItemList = yield Repository.find();
            var Title = "";
            ItemList.forEach(Item => {
                Title += Item.FullName + " ";
            });
            res.render('index', { title: Title });
        });
    });
});
exports.default = router;
