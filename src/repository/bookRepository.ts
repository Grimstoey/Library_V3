import { prisma } from "../lib/prisma";

export const bookRepository = {
  // ดึงหนังสือทั้งหมด
  async getAll() {
    return prisma.book.findMany({
      include: { author: true },
    });
  },

  // ค้นหาหนังสือตามชื่อ
  async searchByTitle(title: string) {
    return prisma.book.findMany({
      where: {
        title: { contains: title, mode: "insensitive" },
      },
      include: { author: true },
    });
  },
};
