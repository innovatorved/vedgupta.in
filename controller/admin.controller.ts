import { prismaMongo } from 'lib/prisma';

export async function getStudentsData(
  pageNumber,
  pageSize,
  searchQuery: string
) {
  const skip = (pageNumber - 1) * pageSize;
  const take = pageSize;

  const students = await prismaMongo.student.findMany({
    skip,
    take,
    where: searchQuery
      ? {
          OR: [
            {
              EmailId: {
                contains: searchQuery,
                mode: 'insensitive'
              }
            },
            {
              FullName: {
                contains: searchQuery,
                mode: 'insensitive'
              }
            }
          ]
        }
      : {},
    include: { Branch: true }
  });

  const totalStudents = await prismaMongo.student.count({
    where: searchQuery
      ? {
          OR: [
            {
              EmailId: {
                contains: searchQuery,
                mode: 'insensitive'
              }
            },
            {
              FullName: {
                contains: searchQuery,
                mode: 'insensitive'
              }
            }
          ]
        }
      : {}
  });

  return {
    students,
    totalStudents
  };
}
