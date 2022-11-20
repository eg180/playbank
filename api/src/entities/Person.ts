import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import { Client } from './Client';
@Entity('persons')
export class Person extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column({
        nullable: true
    })
    middle_name: string;

    @Column()
    last_name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        unique: false,
        nullable: false
    })
    password: string;

    @Column({
        default: true,
        name: "active"
    })
    is_active: boolean;

    @Column({
        type: "simple-json",
        nullable: true
    })
    additional_info: {
        language: string
    }
    


    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}