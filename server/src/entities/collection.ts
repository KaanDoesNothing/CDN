import { Upload } from "./upload";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity("collection")
export class Collection extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => User, (user) => user.collections)
    author: User;

    @Column()
    name: string;

    @OneToMany(() => Upload, (upload) => upload.author)
    files: Upload[];

    @CreateDateColumn()
    created: number;
}