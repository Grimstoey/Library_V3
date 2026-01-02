import { prisma } from "../lib/prisma";

export async function seedMembers() {
  const members = await prisma.member.createManyAndReturn({
    data: [
      { memberCode: "MEM001", firstName: "John", lastName: "Smith", phone: "081-111-1111" },
      { memberCode: "MEM002", firstName: "Michael", lastName: "Brown", phone: "081-222-2222" },
      { memberCode: "MEM003", firstName: "David", lastName: "Johnson", phone: "081-333-3333" },
      { memberCode: "MEM004", firstName: "Robert", lastName: "Wilson", phone: "081-444-4444" },
      { memberCode: "MEM005", firstName: "James", lastName: "Taylor", phone: "081-555-5555" },
    ],
  });
  return members;
}
