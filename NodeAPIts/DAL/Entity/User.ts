import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn("string")
    ID: string;
    @Column()
    FullName: string;
    @Column()
    CreateTime: Date;
}