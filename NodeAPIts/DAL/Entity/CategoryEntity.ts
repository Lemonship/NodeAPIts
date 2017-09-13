import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Entities } from "../SQLDAL";
@Entity()
export class category implements Entities {
    static EntityName: string = "Category";
    constructor(Name?: string) {
        if (Name == undefined)
            Name = "";
        this.Name = Name;
    }
    @PrimaryGeneratedColumn()
    ID: number;
    @Column("nvarchar")
    Name: string;
}