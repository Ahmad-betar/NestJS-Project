import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.getAll();
  }

  @Get(':id')
  getTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @Post()
  createTask(@Body() createTask: createTaskDto) {
    return this.tasksService.createOne(createTask);
  }

  @Put(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('') updateTaskDto: updateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete('removeCompleted')
  removeCompleted() {
    return this.tasksService.removeCompletedTasks();
  }
}
