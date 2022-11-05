import { Banker } from './Banker';
import { Transaction } from './Transaction';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Person } from './Person'

@Entity('client')
export class Client extends Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        length: 10,
    })
    card_number: string;

    @Column({
        type: "numeric",
        default: 0
    })
    balance: number;

    @OneToMany(
        () => Transaction,
        transaction => transaction.client
    )
    transactions: Transaction[];

    @ManyToMany(
        () => Banker
    )
    bankers: Banker[]

}