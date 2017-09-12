import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Entities } from "../SQLDAL";
@Entity()
export class activity implements Entities {
    static EntityName: string = "Activity";
    constructor() {
        this.Name = "";
        this.Category = 0;
    }
    @PrimaryGeneratedColumn("int")
    ID: number;
    @Column("nvarchar")
    Name: string;
    @Column("int")
    Category: number;

}