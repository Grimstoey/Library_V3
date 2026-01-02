import { authorRepository } from "../repository/authorRepository";

export const authorService = {
  async getAllAuthors() {
    return authorRepository.getAll();
  },
};
