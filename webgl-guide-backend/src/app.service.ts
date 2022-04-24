import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getLecture(id: number) {
    return await this.prisma.lecture.findFirst({
      where: {
        id: id,
      },
    });
  }

  async getLectureItems() {
    return await this.prisma.lecture.findMany({
      select: {
        id: true,
        title: true,
        description: true,
      },
    });
  }
}
