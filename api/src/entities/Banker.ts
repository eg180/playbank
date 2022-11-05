import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";
import { Person } from "./Person";

@Entity('banker')
export class Banker extends Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    employee_number: string;


    // Because we have a m2m relationship, we don't have a foreign key in the other entity
    // to which this refers. We create a separate table, and that table contains two columns; the ide
    // of the banker, and the id of the client, which maps them together. https://youtu.be/JaTbzPcyiOE?t=3448
    @ManyToMany(
        () => Client
    )
    @JoinTable({
        name: "bankers_clients",
        joinColumn: {
            name: "banker",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "client",
            referencedColumnName: "id"
        }
    })
    clients: Client[]
}
