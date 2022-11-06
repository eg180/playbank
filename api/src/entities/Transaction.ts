import { Client } from "./Client";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TransactionTypes } from "../../types/common"


@Entity("transaction")
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: TransactionTypes
    })
    type: string;

    @Column({type: 'money', nullable: false})
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

    @ManyToOne(
        () => Client,
        client => client.transactions
    )
    @JoinColumn({
        name: 'sender_user_id'
    })
    received_from: Client;

    @ManyToOne(
        () => Client,
        client => client.transactions
    )
    @JoinColumn({
        name: 'receiver_user_id'
    })
    transferred_to: Client;

    

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}