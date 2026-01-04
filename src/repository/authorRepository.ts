import { prisma } from "../lib/prisma";
import { AuthorsPage } from "../models/AuthorPage";

export const authorRepository = {
  // ดึงผู้แต่งทั้งหมด
  async getAll( pageSize: number,
  pageNo: number
) {
    const authors = await prisma.author.findMany({
      include: { books: true },
      skip: pageSize * (pageNo - 1),
      take: pageSize,
    });


    const count = await prisma.author.count()


    return {authors, count} as AuthorsPage
  },
};
