import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Unique } from "typeorm"
import { Length, IsNotEmpty, IsEmail } from "class-validator"
import * as bcrypt from "bcryptjs"

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
    @Length(6, 30)
    @IsNotEmpty()
    password: string

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    //relacionamentos


/* Giordano: não acho uma boa essas funções dentro da entidade pois não creio 
ser responsabilidade do usuário hashear a propria senha, fiz tudo pelo
controller */

    hashPassword(){
        return this.password = bcrypt.hashSync(this.password, 8)
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string){
        return bcrypt.compareSync(unencryptedPassword, this.password)
    }
}
