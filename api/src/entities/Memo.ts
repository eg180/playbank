import { Client } from "./Client";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("memos")
export class Memo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(
        () => Client,
        client => client.memos
    )
    // join to client_id -- the primary key - in the above Client entity
    @JoinColumn({
        referencedColumnName: 'id'
    })
    client: Client['id'];

    @Column({
        type: 'varchar',
        length: 250
    })
    memo: string;

    @Column({
        type: 'boolean',
        default: false
    })
    done: boolean;

    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false })
    amount: number;

    @Column({
        type: "timestamptz",
        nullable: true,
    })
    reminder_date: Date;


    @Column({
        type: "timestamptz",
        nullable: true,
    })
    due_date: Date;
    

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}