import express = require('express');
import { DBORM, DBSetting } from "../DAL/SQLDAL";
import { Repository, createConnection } from "typeorm";
import { user } from "../DAL/Entity/UserEntity";
import { category } from "../DAL/Entity/CategoryEntity";
import { task } from "../DAL/Entity/TaskEntity";
import "reflect-metadata";

const DevelopmentDB: DBSetting = new DBSetting("mssql", "localhost", 1433, "Development", "P@ssw0rd", "Development");
const ORM = new DBORM(DevelopmentDB, true);
export function InitTable(){
    var ItemList;
    var List : category[];
    ORM.GetList(new category()).then(ItemList => {
        if (ItemList == undefined)
        {
            List = [];
            List.push(new category("Unclassified"));
            List.push(new category("Health"));
            List.push(new category("Knowledge"));
            ORM.SaveList(List).then(Result => { })
        }
    });

}