import { prisma } from "../lib/prisma";

export const borrowRepository = {
  // หนังสือที่ครบกำหนดคืนในวันที่กำหนด
  async getBooksDueOnDate(date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return prisma.borrowItem.findMany({
      where: {
        dueDate: { gte: startOfDay, lte: endOfDay },
        returnedAt: null,
      },
      include: {
        book: { include: { author: true } },
        borrow: { include: { member: true } },
      },
    });
  },

  // หนังสือที่ยังไม่ได้คืน
  async getUnreturnedBooks() {
    return prisma.borrowItem.findMany({
      where: { returnedAt: null },
      include: {
        book: { include: { author: true } },
        borrow: { include: { member: true } },
      },
    });
  },
};
