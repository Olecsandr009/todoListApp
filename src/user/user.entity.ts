import { TaskEntity } from 'src/task/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  created: number;

  @Column()
  name: string;

  @Column()
  firstName: string;

  @Column()
  telegramId: number;

  @OneToMany(() => TaskEntity, (taskEntity) => taskEntity.user)
  task: TaskEntity;
}
