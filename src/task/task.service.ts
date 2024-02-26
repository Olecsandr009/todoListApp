import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { DataSource, Repository } from 'typeorm';
import { createDTO } from './task.dto';
import { TaskEntity } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskEntity: Repository<TaskEntity>,
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
    private dataSourse: DataSource,
  ) {}

  async find() {
    return await this.taskEntity.find();
  }

  async findOne(_id: number) {
    return await this.taskEntity.findOneBy({ _id });
  }

  async createTask(data: createDTO) {
    const task = new TaskEntity();

    task.deadline = data.deadline;
    task.text = data.text;
    task.title = data.title;

    const user = await this.userEntity.findOneBy({ telegramId: data.userId });
    task.user = user;

    await this.dataSourse.transaction(
      async (manager) => await manager.save(task),
    );
  }

  async completeTask(_id: number) {
    await this.taskEntity.update(_id, {complete: true})
  }

  async deleteTask(_id: number) {
    return this.taskEntity.delete(_id);
  }
}
