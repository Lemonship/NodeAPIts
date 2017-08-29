/*
 * GET home page.
 */
import express = require('express');
const router = express.Router();
import "reflect-metadata";
import { createConnection } from "typeorm";
import { getEntityManager } from "typeorm";

import { User } from "../DAL/Entity/User";
import { Update } from "../DAL/SQLDAL";

router.get('/', (req: express.Request, res: express.Response) => {


    let oUser = new User();
    oUser.ID = "0002";
    oUser.FullName = "Tester";
    var CurTime: Date = new Date(Date.now());
    oUser.FullName = CurTime.toLocaleString();
    oUser.CreateTime = new Date(Date.now());
    oUser.UpdateTime = new Date(Date.now());

    Update(oUser, async function (Repository)
    {
        await Repository.save(oUser);
        let ItemList = await Repository.find();
        var Title = "";
        ItemList.forEach(Item => {
            Title += Item.FullName + " ";
        })
        res.render('index', { title: Title });
    }
    );
});

export default router;