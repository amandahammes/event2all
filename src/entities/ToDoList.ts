import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Unique, ManyToMany, ManyToOne, JoinColumn, JoinTable } from "typeorm"
import { Length } from "class-validator"
import { Event } from "./Event"

@Entity("todolist")
export class ToDoList {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Length(1, 250)
    content: string

    @Column()
    done: boolean

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