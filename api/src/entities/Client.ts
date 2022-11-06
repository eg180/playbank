import { Banker } from './Banker';
import { Transaction } from './Transaction';
import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, OneToOne, JoinColumn } from 'typeorm';
import { Person } from './Person';

@Entity('clients')
export class Client extends Person {
    @PrimaryGeneratedColumn()
    id: number;

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