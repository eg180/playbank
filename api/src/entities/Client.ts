import { Banker } from './Banker';
import { Transaction } from './Transaction';
import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, Column } from 'typeorm';
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


    @ManyToMany(
        () => Client
    )
    @JoinTable({
        name: "friend_clients",
        joinColumn: {
            name: "friend_a",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "friend_b",
            referencedColumnName: "id"
        }
    })
    friends: Client[]

}