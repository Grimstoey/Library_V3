import { bookRepository } from "../repository/bookRepository";

export const bookService = {

  async searchBooks(title: string) {
    return bookRepository.searchByTitle(title);
  },

  async getAllBooks(pageSize: number = 10, pageNo: number = 1) {
    return bookRepository.getAll(pageSize, pageNo);
  },

  async getAllByKeyword(keyword: string, pageSize: number = 10, pageNo: number = 1) {

    return bookRepository.getAllByKeyword(keyword, pageSize, pageNo);

  }
};
