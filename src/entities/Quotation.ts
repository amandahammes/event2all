import { Event } from './Event';
import { Column, Entity,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Length } from "class-validator";

@Entity("quotation")
export class Quotation{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    contact: string;

    @Column()
    @Length(1, 50)
    description: string;

    @Column()
    provider: string;

    @Column()
    expected_expense: number;

    @Column()
    actual_expense: number;

    @Column()
    amount_already_paid: number;

    @Column()
    @CreateDateColumn()
    createDateColumn: Date;

    @Column()
    @UpdateDateColumn()
    updateDateColumn: Date;

    @ManyToOne(()=> Event, (event) => event.quotation)
    @JoinColumn({name: 'event_id'})
    event_id: Event
   
};