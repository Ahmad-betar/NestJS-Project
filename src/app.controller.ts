import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly AppService: AppService) {}

  @Get()
  findAll() {
    return this.AppService.getFuck();
  }

  @Get('ass')
  Ass() {
    return this.AppService.getAss();
  }
}
