import { Client } from "./Client";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('balances')
export class Balance extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;


    @Column({type: "money", default: 0})
    balance: number;

    @OneToOne(() => Client)
    @JoinColumn({
        name: "client_id"
    })
    client: Client;
}