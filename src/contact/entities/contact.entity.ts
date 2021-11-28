import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../../user/entities/user.entity';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  userId: string;

  @OneToOne(() => User, (user) => user.contact, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
