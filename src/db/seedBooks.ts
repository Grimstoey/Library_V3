import { Author } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";

export async function seedBooks(authors: Author[]) {
  const [orwell, austen, murakami] = authors;

  const books = await prisma.book.createManyAndReturn({
    data: [
      { title: "1984", isbn: "978-0451524935", category: "Dystopian", authorId: orwell.id },
      { title: "Animal Farm", isbn: "978-0451526342", category: "Satire", authorId: orwell.id },
      { title: "Pride and Prejudice", isbn: "978-0141439518", category: "Romance", authorId: austen.id },
      { title: "Norwegian Wood", isbn: "978-0375704024", category: "Fiction", authorId: murakami.id },
      { title: "Kafka on the Shore", isbn: "978-1400079278", category: "Fiction", authorId: murakami.id },
    ],
  });
  return books;
}
