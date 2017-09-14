import express = require('express');
import { DBORM, DBSetting } from "../DAL/SQLDAL";
import { Repository, createConnection } from "typeorm";
import { user } from "../DAL/Entity/UserEntity";
import { category } from "../DAL/Entity/CategoryEntity";
import { task } from "../DAL/Entity/TaskEntity";
import "reflect-metadata";

const DevelopmentDB: DBSetting = new DBSetting("mssql", "localhost", 1433, "Development", "P@ssw0rd", "Development");
export const ORM = new DBORM(DevelopmentDB, true);
export async function InitSystem() {
    await ORM.InitConnection();
    await InitTable()
}
export async function InitTable(){
    var ItemList;
    var List: category[];
    try {
        ItemList = await ORM.GetList(new category())
        if (ItemList.length == 0) {
            List = [];
            List.push(new category("Unclassified"));
            List.push(new category("Health"));
            List.push(new category("Knowledge"));
            List.push(new category("Networking"));
            List.push(new category("Finance"));
            List.push(new category("Career"));
            List.push(new category("School"));
            List.push(new category("Art"));
            List.push(new category("Sports"));
            List.push(new category("Habit"));
            List.push(new category("Special Task"));
            List.push(new category("Idea Collection"));
            await ORM.SaveList(List);

        }
    } catch(error){
        console.debug(error);
    }

}