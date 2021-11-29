import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '../../board/entities/board.entity';
import { Contact } from '../../contact/entities/contact.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @CreateDateColumn()
  createAt: Date;

  @OneToMany((type) => Board, (board) => board.user)
  boards: Board[];

  @OneToOne(() => Contact, (contact) => contact.user, { eager: true })
  contact: Contact;
}
