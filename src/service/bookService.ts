import { bookRepository } from "../repository/bookRepository";

export const bookService = {
  async getAllBooks() {
    return bookRepository.getAll();
  },

  async searchBooks(title: string) {
    return bookRepository.searchByTitle(title);
  },
};
