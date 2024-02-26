import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, LessThanOrEqual, Repository } from 'typeorm';
import { LoginDTO, RegisterDTO } from './user.dto';
import { UserEntity } from './user.entity';
import { TaskEntity } from 'src/task/task.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
    private dataSource: DataSource,
  ) {}

  async find() {
    return await this.userEntity.find();
  }

  async findOne(_id: number) {
    const user = await this.userEntity.findOneBy({ _id });
    if (user) return user;
    else throw new NotFoundException('Користувача не знайдено');
  }

  async findTasksByUser(_id:number) {
    return await this.userEntity.findOne(
      {
        where: {telegramId: _id},
        relations: {
          task: true
        }
      }
    )
  }

  async findTaskByUserComplete(_id:number) {
    return await this.userEntity.findOne(
      {
        where: {
          _id,
          task: {
            complete: true
          }
        },
        relations: {
          task: true
        }
      }
    )
  }

  async findTaskByUserNoComplete(_id:number) {
    return await this.userEntity.findOne(
      {
        where: {
          _id,
          task: {
            complete: false
          }
        },
        relations: {
          task: true
        }
      }
    )
  }

  async findTaskByUserDate(_id:number) {

    let currentDate = new Date()
    const fiveDaysFromNow = new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000)

    return await this.userEntity.findOne(
      {
        relations: {
          task: true
        },
        where: {
          telegramId: _id,
          task: {
            complete: false,
            deadline: LessThanOrEqual(fiveDaysFromNow)
          }
        }
      }
    )
  }

  async registerUser(data: RegisterDTO) {
    const user = new UserEntity();
    console.log('register');

    user.firstName = data.firstName;
    user.name = data.name;
    user.telegramId = data.telegramId;

    await this.dataSource.transaction(
      async (manager) => await manager.save(user),
    );
  }

  async loginUser(data: LoginDTO) {
    const user = await this.userEntity.findOneBy({
      telegramId: data.telegramId,
    });
    if (user) return user;
    else throw new NotFoundException('Користувача не знайдено');
  }

  async findTaskUser(_id: number) {
    return await this.userEntity.find({
      relations: ['task'],
    });
  }

  async deleteUser(_id: number) {
    return this.userEntity.delete(_id);
  }
}
