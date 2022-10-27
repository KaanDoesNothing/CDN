import { Upload } from "./upload";
import { IsEmail, Length } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    token: string;

    @OneToMany(() => Upload, (upload) => upload.author)
    uploads: Upload[];

    @Column()
    @Length(5, 20)
    password: string;

    @CreateDateColumn()
    created: number;
}