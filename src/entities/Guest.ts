import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Unique } from "typeorm"
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

    //status????

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    //relacionamentos
}