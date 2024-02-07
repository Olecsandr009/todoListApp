import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Task' })
export class TaskEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  created: number;

  @Column()
  deadline: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.task)
  user: UserEntity;
}
