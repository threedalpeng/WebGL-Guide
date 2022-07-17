import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LectureService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getLecture(id: number) {
    const lecture = await this.prisma.lecture.findFirst({
      where: {
        id: id,
      },
    });
    if (lecture === null) {
      throw new HttpException(
        `No lecture of id = ${id} exists.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return lecture;
  }

  async getLectureItems() {
    return await this.prisma.lecture.findMany({
      select: {
        id: true,
        title: true,
        description: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }
}
