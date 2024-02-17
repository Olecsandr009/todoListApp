import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Task' })
export class TaskEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @CreateDateColumn()
  created: Date;

  @Column()
  deadline: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column({ default: false })
  complete: boolean;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.task)
  user: UserEntity;
}
