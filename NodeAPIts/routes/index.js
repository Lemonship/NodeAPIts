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
const typeorm_1 = require("typeorm");
const User_1 = require("../DAL/Entity/User");
router.get('/', (req, res) => {
    let oUser = new User_1.User();
    oUser.ID = "0001";
    oUser.FullName = "Tester";
    var CurTime = new Date(Date.now());
    oUser.FullName = CurTime.toLocaleString();
    oUser.CreateTime = new Date(Date.now());
    oUser.UpdateTime = new Date(Date.now());
    var Connection = "localhost";
    //console.log(Connection);
    typeorm_1.createConnection({
        type: "mssql",
        host: Connection,
        port: 1433,
        username: "Development",
        password: "P@ssw0rd",
        database: "Development",
        entities: [User_1.User],
        autoSchemaSync: true
    }).then((connection) => __awaiter(this, void 0, void 0, function* () {
        let UserRepository = connection.getRepository(User_1.User);
        yield UserRepository.save(oUser);
        let savedUser = yield UserRepository.find();
        savedUser.forEach(Item => { res.render('index', { title: Item.FullName }); });
        yield connection.close();
    })).catch(error => {
        res.render('error', { error: error });
    }
    //console.log(error)
    );
    //res.render('index', { title: 'ABC' });
});
exports.default = router;
