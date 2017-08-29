import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn("nvarchar")
    ID: string;
    @Column("nvarchar")
    FullName: string;
    @Column("datetime")
    CreateTime: Date;
    @Column("datetime")
    UpdateTime: Date;
}