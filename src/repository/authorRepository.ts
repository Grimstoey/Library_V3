import { prisma } from "../lib/prisma";

export const authorRepository = {
  // ดึงผู้แต่งทั้งหมด
  async getAll() {
    return prisma.author.findMany({
      include: { books: true },
    });
  },
};
