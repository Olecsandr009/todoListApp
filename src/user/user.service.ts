import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/task/task.entity';
import { DataSource, Repository } from 'typeorm';
import { LoginDTO, RegisterDTO } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
    @InjectRepository(TaskEntity)
    private dataSourse: DataSource,
  ) {}

  async find() {
    return await this.userEntity.find();
  }

  async findOne(_id: number) {
    return await this.userEntity.findOneBy({ _id });
  }

  async registerUser(data: RegisterDTO) {
    const user = new UserEntity();

    user.firstName = data.firstName;
    user.name = data.name;
    user.telegramId = data.telegramId;

    await this.dataSourse.transaction(
      async (manager) => await manager.save(user),
    );
  }
  async loginUser(data: LoginDTO) {
    return this.userEntity.findOneBy({ telegramId: data.telegramId });
  }

  async deleteUser(_id: number) {
    return this.userEntity.delete(_id);
  }
}
