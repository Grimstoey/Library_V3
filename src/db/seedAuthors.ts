import { prisma } from "../lib/prisma";

export async function seedAuthors() {
  const authors = await prisma.author.createManyAndReturn({
    data: [
      { firstName: "George", lastName: "Orwell", affiliation: "BBC" },
      { firstName: "J.K.", lastName: "Rowling", affiliation: "Bloomsbury" },
      { firstName: "Ernest", lastName: "Hemingway", affiliation: "Scribner" },
      { firstName: "Mark", lastName: "Twain", affiliation: "Harper & Brothers" },
      { firstName: "Agatha", lastName: "Christie", affiliation: "Collins Crime Club" },
    ],
  });
  return authors;
}
