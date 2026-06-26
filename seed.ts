import { PrismaClient } from '@prisma/client';
import { facultyData } from './src/lib/data/faculty';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding faculties...');
  for (const faculty of facultyData) {
    await prisma.faculty.create({
      data: {
        id: faculty.id,
        name: faculty.name,
        role: faculty.role,
        image: faculty.image,
        qualification: faculty.qualification,
        email: faculty.email,
        department: faculty.department,
        researchInterest: faculty.researchInterest,
        description: faculty.description,
      }
    });
  }
  console.log('Done seeding faculties.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
