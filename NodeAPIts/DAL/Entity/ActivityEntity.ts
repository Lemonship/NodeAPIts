import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Entities } from "../SQLDAL";
import { category } from "./CategoryEntity";
import { task } from "./TaskEntity";
@Entity()
export class activity implements Entities {
    static EntityName: string = "Activity";
    constructor() {
        this.Name = "";
        //this.Category = 0;
    }
    @PrimaryGeneratedColumn("int")
    ID: number;
    @Column("nvarchar")
    Name: string;
    @ManyToOne(type => category, Category => Category.ID)
    Category: category;
    @OneToMany(type => task, Task => Task.ID)
    Task: task[];
    
}