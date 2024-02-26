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

  @Column({default: false})
  complete: boolean

  @Column()
  deadline: Date;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.task)
  user: UserEntity;
}
