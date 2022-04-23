import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const lecture1 = await prisma.lecture.create({
    data: {
      title: 'something',
      description: 'something',
      content: `# hi
  ## Welcome Friends`,
    },
  });
  console.log(lecture1);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
