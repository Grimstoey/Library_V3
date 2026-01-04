import { prisma } from "../lib/prisma";
import { MemberPage } from "../models/MemberPage";

export const memberRepository = {
  // ดึงสมาชิกทั้งหมด
  async getAll(pageSize: number, pageNo: number) {
    const members = await prisma.member.findMany({
      include: { borrows: true },
      skip: pageSize * (pageNo - 1),
      take: pageSize,
    });


    const count = await prisma.author.count()


    return { members, count } as MemberPage

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
