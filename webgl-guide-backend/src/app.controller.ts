import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/lecture/:id')
  getLecture(@Param('id', ParseIntPipe) id: number) {
    return this.appService.getLecture(id);
  }

  @Get('/lectures')
  getLectures() {
    return this.appService.getLectureItems();
  }
}
