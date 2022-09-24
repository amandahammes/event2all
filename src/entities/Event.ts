import { User } from './User';
import { Quotation } from './Quotation';
import { Guest } from "./Guest"
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Length } from "class-validator";

@Entity("event")
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 300)
  place: string;

  @Column()
  @Length(1, 300)
  name: string;

  @Column()
  @Length(1, 300)
  date: Date;

  @CreateDateColumn({
    nullable: false
  })
  created_at: Date;

  @UpdateDateColumn({
    nullable: false
  })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.event)
  @JoinColumn({name: 'user_id'})
  user_id: User

  @OneToMany(() => Quotation, quotation => quotation.event_id)
  quotation: Quotation[]

  @OneToMany(() => Guest, (guest) => guest.event)
  guest: Guest[]


}
