import { Entity, Column, PrimaryColumn } from "typeorm";
import { Entities } from "../SQLDAL";
@Entity()
export class User implements Entities {
    @PrimaryColumn("nvarchar")
    ID: string;
    @Column("nvarchar")
    FullName: string;
    @Column("datetime")
    CreateTime: Date;
    @Column("datetime")
    UpdateTime: Date;
}