import { prisma } from "../lib/prisma";

export const memberRepository = {
  // ดึงสมาชิกทั้งหมด
  async getAll() {
    return prisma.member.findMany({
      include: { borrows: true },
    });
  },

  // ค้นหาสมาชิกตามชื่อ (firstName หรือ lastName)
  async searchByName(name: string) {
    return prisma.member.findMany({
      where: {
        OR: [
          { firstName: { contains: name, mode: "insensitive" } },
          { lastName: { contains: name, mode: "insensitive" } },
        ],
      },
    });
  },

  // ดึงสมาชิกตามหมายเลขสมาชิก
  async getByCode(code: string) {
    return prisma.member.findUnique({
      where: { memberCode: code },
      include: { borrows: true },
    });
  },
};
