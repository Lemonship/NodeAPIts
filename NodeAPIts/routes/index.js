"use strict";
exports.__esModule = true;
/*
 * GET home page.
 */
var express = require("express");
var router = express.Router();
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var User_1 = require("../DAL/entity/User");
router.get('/', function (req, res) {
    var Connection = "localhost";
    console.log(Connection);
    typeorm_1.createConnection({
        type: "mssql",
        host: Connection,
        port: 1433,
        username: "Development",
        password: "P@ssw0rd",
        database: "Development",
        entities: [
            User_1.User
        ],
        autoSchemaSync: true
    }).then(function (connection) {
        var oUser = new User_1.User();
        oUser.ID = "0001";
        oUser.FullName = "Tester";
        oUser.CreateTime = new Date(Date.now());
        return connection.manager
            .save(User_1.User)
            .then(function (Item) {
            res.render('index', { title: "User" });
            //console.log("User has been saved");
        });
    })["catch"](function (error) { res.render('error', { error: error }); }
    //console.log(error)
    );
    //res.render('index', { title: 'ABC' });
});
exports["default"] = router;
