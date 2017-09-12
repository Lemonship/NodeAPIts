"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SQLDAL_1 = require("../DAL/SQLDAL");
const CategoryEntity_1 = require("../DAL/Entity/CategoryEntity");
require("reflect-metadata");
const DevelopmentDB = new SQLDAL_1.DBSetting("mssql", "localhost", 1433, "Development", "P@ssw0rd", "Development");
const ORM = new SQLDAL_1.DBORM(DevelopmentDB, true);
function InitTable() {
    var ItemList;
    var List;
    ORM.GetList(new CategoryEntity_1.category()).then(ItemList => {
        if (ItemList == undefined) {
            List = [];
            List.push(new CategoryEntity_1.category("Unclassified"));
            List.push(new CategoryEntity_1.category("Health"));
            List.push(new CategoryEntity_1.category("Knowledge"));
            ORM.SaveList(List).then(Result => { });
        }
    });
}
exports.InitTable = InitTable;
