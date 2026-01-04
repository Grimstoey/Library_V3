import { memberRepository } from "../repository/memberRepository";

export const memberService = {
  async searchMembers(name: string) {
    return memberRepository.searchByName(name);
  },

  async getMemberByCode(code: string) {
    return memberRepository.getByCode(code);
  },
  
  async getAllMembers(pageSize : number = 10 , pageNo : number = 1) {
    return memberRepository.getAll(pageSize, pageNo);
  },
};
