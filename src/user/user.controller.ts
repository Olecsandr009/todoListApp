import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegisterDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create-user')
  async createUser(@Body() user: RegisterDTO) {
    return await this.userService.registerUser(user);
  }

  @Get('get-users')
  async getUsers() {
    return await this.userService.find();
  }

  @Get('login-user/:_id')
  async loginUser(@Param('_id') id: number) {
    return await this.userService.loginUser({ telegramId: id });
  }

  @Get('get-user/:_id')
  async getUser(@Param('_id') _id: number) {
    return await this.userService.findOne(_id);
  }

  @Get('get-task-user/:_id')
  async getUserTasks(@Param('_id') _id:number) {
    return await this.userService.findTasksByUser(_id)
  }

  @Get('delete-user/:_id')
  async deleteUser(@Param('_id') _id: number) {
    return await this.userService.deleteUser(_id);
  }

  @Get('get-task-user/:_id')
  async getTaskUser(@Param('_id') _id: number) {
    return await this.userService.findTaskUser(_id);
  }
}
