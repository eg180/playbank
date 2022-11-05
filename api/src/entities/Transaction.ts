import { Client } from "./Client";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum TransactionTypes {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
    TRANSFER = 'transfer'
}

@Entity("transaction")
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: TransactionTypes
    })
    type: string;

    @Column({type: 'numeric'})
    amount: number;

    @ManyToOne(
        () => Client,
        client => client.transactions
    )
    // join to client_id -- the primary key - in the above Client entity
    @JoinColumn({
        name: 'client_id'
    })
    client: Client;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}