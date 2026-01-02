import { borrowRepository } from "../repository/borrowRepository";

export const borrowService = {
  async getBooksDueOnDate(date: Date) {
    return borrowRepository.getBooksDueOnDate(date);
  },

  async getUnreturnedBooks() {
    return borrowRepository.getUnreturnedBooks();
  },
};
