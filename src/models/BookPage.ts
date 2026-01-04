import { Book } from "../generated/prisma/client"

export interface BooksPage {
    count: number
    books: Book[]
}