import { borrowRepository } from "../repository/borrowRepository";

export const borrowService = {
  async getBooksDueOnDate(date: Date, pageSize: number = 10, pageNo: number = 1) {
    return borrowRepository.getBooksDueOnDate(date,pageSize,pageNo);
  },

  async getUnreturnedBooks() {
    return borrowRepository.getUnreturnedBooks();
  },
};
