import { prisma } from "../lib/prisma";

// ลบข้อมูลทั้งหมด (ตามลำดับ foreign key)
export async function clearData() {
  await prisma.borrowItem.deleteMany();
  await prisma.borrow.deleteMany();
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
  await prisma.member.deleteMany();
  console.log("🗑️ ลบข้อมูลเก่าเรียบร้อย");
}
