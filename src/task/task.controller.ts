import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { createDTO } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('create-task')
  async createTask(@Body() task: createDTO) {
    return this.taskService.createTask(task);
  }

  @Get('get-tasks')
  async getTasks() {
    return this.taskService.find();
  }

  @Get('get-task/:_id')
  async getTaskById(@Param('_id') _id: number) {
    return this.taskService.findOne(_id);
  }

  @Put('update-task/:_id')
  async updateTask(@Param('_id') _id: number) {
    return this.taskService.updateComplete(_id);
  }

  @Get('delete-task/:_id')
  async deleteTask(@Param('_id') _id: number) {
    return this.taskService.deleteTask(_id);
  }
}
