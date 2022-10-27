import { User } from "./user";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("upload")
export class Upload extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => User, (user) => user.uploads)
    author: User;

    @Column()
    upload_type: string;

    @Column()
    file_id: string;

    @Column()
    file_size: number;

    @Column()
    file_type: string;

    @Column()
    file_hash: string;

    @Column()
    file_name: string;

    @CreateDateColumn()
    created: number;
}