import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createAt: Date;

  // 삭제되더라도 데이터는 그대로 존재 대신 연결된 ID는 NULL 처리 된다.
  @ManyToOne((type) => User, (user) => user.boards, { onDelete: 'SET NULL' })
  user: User;
}
