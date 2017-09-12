import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Entities } from "../SQLDAL";
@Entity()
export class task implements Entities {
    static EntityName: string = "Task";
    constructor() {
        this.Name = "";
        this.CreateTime = new Date(Date.now());
        this.UpdateTime = new Date(Date.now());
    }
    @PrimaryGeneratedColumn("int")
    ID: number;
    @Column("nvarchar")
    Name: string;
    @Column("int")
    Activity: number;
    @Column("datetime")
    CreateTime: Date;
    @Column("datetime")
    UpdateTime: Date;
    
}