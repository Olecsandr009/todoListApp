import { TaskEntity } from 'src/task/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'User' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @CreateDateColumn()
  created: Date;

  @Column()
  name: string;

  @Column({ default: '' })
  firstName: string;

  @Column()
  telegramId: number;

  @OneToMany(() => TaskEntity, (taskEntity) => taskEntity.user)
  task: TaskEntity;
}
