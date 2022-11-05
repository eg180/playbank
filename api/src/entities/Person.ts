import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('person')
export class Person extends BaseEntity {
    @PrimaryGeneratedColumn({
        primaryKeyConstraintName: 'user_id'
    })
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

    @Column({
        type: "simple-array",
        default: []
    })
    friends: string[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}