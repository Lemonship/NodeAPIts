import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { Entities } from "../SQLDAL";
import { activity } from "./ActivityEntity";
@Entity()
export class category implements Entities {
    static EntityName: string = "Category";
    static ClassName: string = "category";
    constructor(Name?: string) {
        if (Name == undefined)
            Name = "";
        this.Name = Name;
    }
    @PrimaryGeneratedColumn()
    ID: number;
    @Column("nvarchar")
    Name: string;
    @OneToMany(type => activity, Activity => Activity.ID)
    Activitys: activity[];
}