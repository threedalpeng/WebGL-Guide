import { Module } from '@nestjs/common';
import { LectureModule } from './lecture/lecture.module';

@Module({
  imports: [LectureModule],
})
export class ApiModule {}
