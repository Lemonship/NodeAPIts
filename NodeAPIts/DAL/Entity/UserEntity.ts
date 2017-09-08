import { Entity, Column, PrimaryColumn } from "typeorm";
import { Entities } from "../SQLDAL";
@Entity()
export class user implements Entities {
    static EntityName: string = "User";
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