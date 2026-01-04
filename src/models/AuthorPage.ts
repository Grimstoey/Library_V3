//สร้าง obj เก็บ count กับ Author 

import { Author, Book } from "../generated/prisma/client"

export interface AuthorsPage {
    count: number
    authors: Author[]
}


