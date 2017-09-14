import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Entities } from "../SQLDAL";
import { category } from "./CategoryEntity";
import { task } from "./TaskEntity";
@Entity()
export class activity implements Entities {
    static EntityName: string = "Activity";
    static ClassName: string = "activity";
    constructor() {
        this.Name = "";
        //this.Category = 0;
    }
    @PrimaryGeneratedColumn()
    ID: number;
    @Column("nvarchar")
    Name: string;
    @ManyToOne(type => category, Category => Category.ID)
    @JoinColumn({ name: "CategoryID" })
    Category: category;
    @OneToMany(type => task, Task => Task.ID)
    Tasks: task[];
    
}