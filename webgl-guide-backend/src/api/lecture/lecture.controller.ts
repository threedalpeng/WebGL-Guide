import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { LectureService } from './lecture.service';

@Controller()
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Get()
  getHello(): string {
    return this.lectureService.getHello();
  }

  @Get('/lecture/:id')
  getLecture(@Param('id', ParseIntPipe) id: number) {
    return this.lectureService.getLecture(id);
  }

  @Get('/lectures')
  getLectures() {
    return this.lectureService.getLectureItems();
  }
}
