import { TaskEntity } from 'src/task/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ default: Date.now() })
  created: Date;

  @Column()
  name: string;

  @Column()
  firstName: string;

  @Column()
  telegramId: number;

  @OneToMany(() => TaskEntity, (taskEntity) => taskEntity.user)
  task: TaskEntity;
}
