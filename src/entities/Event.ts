import { Quotation } from './Quotation';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
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

  @OneToMany(() => Event, (event) => event.quotation)
  quotation:Quotation


}
