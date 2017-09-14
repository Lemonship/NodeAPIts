"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SQLDAL_1 = require("../DAL/SQLDAL");
const CategoryEntity_1 = require("../DAL/Entity/CategoryEntity");
require("reflect-metadata");
const DevelopmentDB = new SQLDAL_1.DBSetting("mssql", "localhost", 1433, "Development", "P@ssw0rd", "Development");
exports.ORM = new SQLDAL_1.DBORM(DevelopmentDB, true);
async function InitSystem() {
    await exports.ORM.InitConnection();
    await InitTable();
}
exports.InitSystem = InitSystem;
async function InitTable() {
    var ItemList;
    var List;
    try {
        ItemList = await exports.ORM.GetList(new CategoryEntity_1.category());
        if (ItemList.length == 0) {
            List = [];
            List.push(new CategoryEntity_1.category("Unclassified"));
            List.push(new CategoryEntity_1.category("Health"));
            List.push(new CategoryEntity_1.category("Knowledge"));
            List.push(new CategoryEntity_1.category("Networking"));
            List.push(new CategoryEntity_1.category("Finance"));
            List.push(new CategoryEntity_1.category("Career"));
            List.push(new CategoryEntity_1.category("School"));
            List.push(new CategoryEntity_1.category("Art"));
            List.push(new CategoryEntity_1.category("Sports"));
            List.push(new CategoryEntity_1.category("Habit"));
            List.push(new CategoryEntity_1.category("Special Task"));
            List.push(new CategoryEntity_1.category("Idea Collection"));
            await exports.ORM.SaveList(List);
        }
    }
    catch (error) {
        console.debug(error);
    }
}
exports.InitTable = InitTable;
