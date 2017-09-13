import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Entities } from "../SQLDAL";
import { activity } from "./ActivityEntity";
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
    @ManyToOne(type => activity, activity => activity.ID)
    Activity: activity;
    @Column("datetime")
    CreateTime: Date;
    @Column("datetime")
    UpdateTime: Date;

    
}