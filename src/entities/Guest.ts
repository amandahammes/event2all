import { Event } from './Event';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Unique, ManyToOne, JoinColumn } from "typeorm"
import { Length, IsNotEmpty, IsEmail } from "class-validator"

@Entity("guest")
export class Guest {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Length(3, 40)
    name: string

    @Column({unique: true})
    @IsEmail()
    @IsNotEmpty()
    email: string

    @Column()
    @IsNotEmpty()
    phone: string

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Event, event => event.guest)
    @JoinColumn({name: 'event_id'})
    event: Event

}