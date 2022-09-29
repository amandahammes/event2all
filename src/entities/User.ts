import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Unique } from "typeorm"
import { Length, IsNotEmpty, IsEmail, IsDate } from "class-validator"
import * as bcrypt from "bcryptjs"
import { Event } from "./Event"

@Entity("user")
export class User {
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
    @IsDate()
    birth_date: Date

    @Column()
    @Length(6, 60)
    @IsNotEmpty()
    password: string

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Event, (event) => event.user_id)
    event: Event[]

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string){
        return bcrypt.compareSync(unencryptedPassword, this.password)
    }
}
