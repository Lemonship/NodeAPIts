import { Entity, Column, PrimaryColumn } from "typeorm";
import { Entities } from "../SQLDAL";
@Entity()
export class User implements Entities {

    constructor() {
        this.ID = "";
        this.FullName = "";
        this.CreateTime = new Date(Date.now());
        this.UpdateTime = new Date(Date.now());
    }
    @PrimaryColumn("nvarchar")
    ID: string;
    @Column("nvarchar")
    FullName: string;
    @Column("datetime")
    CreateTime: Date;
    @Column("datetime")
    UpdateTime: Date;


}