import { prisma } from "../lib/prisma";
import { BooksPage } from "../models/BookPage";

export const bookRepository = {
  // ดึงหนังสือทั้งหมด
  async getAll(pageSize: number, pageNo: number) {
    const books = await prisma.book.findMany({
      include: { author: true },
      skip: pageSize * (pageNo - 1),
      take: pageSize,
    });


    const count = await prisma.author.count()


    return { books, count } as BooksPage
  },

  async getAllByKeyword(keyword: string, pageSize: number, pageNo: number) {
    const whereCondition = {
      OR: [
        // ค้นหาจากชื่อหนังสือ
        { title: { contains: keyword, mode: 'insensitive' as const } },
        // ค้นหาจากหมวดหมู่
        { category: { contains: keyword, mode: 'insensitive' as const } },
        // ค้นหาจากชื่อผู้แต่ง
        {
          author: {
            OR: [
              { firstName: { contains: keyword, mode: 'insensitive' as const } },
              { lastName: { contains: keyword, mode: 'insensitive' as const } },
            ],
          },
        },
        // ค้นหาจากชื่อผู้ยืม
        {
          borrowItems: {
            some: {
              borrow: {
                member: {
                  OR: [
                    {
                      firstName: {
                        contains: keyword,
                        mode: 'insensitive' as const,
                      },
                    },
                    {
                      lastName: {
                        contains: keyword,
                        mode: 'insensitive' as const,
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      ],
    }

    const books = await prisma.book.findMany({
      where: whereCondition,
      take: pageSize,
      skip: pageSize * (pageNo - 1),
      include: {
        author: true,
        borrowItems: {
          include: {
            borrow: {
              include: {
                member: true,
              },
            },
          },
        },
      }
    })

    const count = await prisma.book.count({ where: whereCondition })


    return { books, count } as BooksPage
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
