import { prisma } from "../lib/prisma";
import { Book, Member } from "../generated/prisma/client";

// Helper: สร้างวันครบกำหนดคืน (จำนวนวันจากวันนี้)
const dueDate = (days: number) => new Date(Date.now() + days * 24 * 60 * 60 * 1000);

export async function seedBorrows(members: Member[], books: Book[]) {
  const [john, michael] = members;

  // 
  await prisma.borrow.create({
    data: {
      memberId: john.id,
      items: {
        create: [
          { bookId: books[0].id, dueDate: dueDate(14) },
          { bookId: books[2].id, dueDate: dueDate(14) },
        ],
      },
    },
  });

  await prisma.borrow.create({
  data: {
    memberId: michael.id,
    items: {
      create: [
        {
          bookId: books[3].id,
          dueDate: dueDate(7),
          returnedAt: new Date(),
        },
      ],
    },
  },
});

}
