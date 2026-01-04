import { authorRepository } from "../repository/authorRepository";

export const authorService = {
  async getAllAuthors(pageSize: number = 10, pageNo: number = 1) {
    return authorRepository.getAll(pageSize, pageNo);
  },
};
