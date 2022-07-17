import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ApiModule } from './api/api.module';
import { LectureModule } from './api/lecture/lecture.module';

@Module({
  imports: [
    ApiModule,
    RouterModule.register([
      {
        path: 'api',
        module: ApiModule,
        children: [{ path: '/', module: LectureModule }],
      },
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'demo'),
      renderPath: '/demo/',
    }),
  ],
})
export class AppModule {}
