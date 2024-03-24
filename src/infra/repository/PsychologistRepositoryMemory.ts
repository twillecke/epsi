import Psychologist from "../../domain/entity/Psychologist";
import PsychologistRepository from "../../domain/repository/PsychologistRepository";

export default class PsychologistRepositoryMemory implements PsychologistRepository {
  psychologists: Psychologist[]
  constructor() {
    this.psychologists = [];
  }

  async save(psychologist: Psychologist) {
    this.psychologists.push(psychologist);
  }

  async getByEmail(emailAddress: string) {
    return this.psychologists.find(psychologist => psychologist.getEmailAddress() === emailAddress);
  }

  async getByCpf(cpf: string) {
    return this.psychologists.find(psychologist => psychologist.getCpf() === cpf);
  }

  async getByPsychologistId(psychologistId: string) {
    const [psychologist] = this.psychologists.filter(psychologist => psychologist.getPsychologistId() === psychologistId);
    if (!psychologist) return;
    return psychologist;
  }

  async getByUsername(username: string) {
    return this.psychologists.find(psychologist => psychologist.getUsername() === username);
  }

  async deleteByCpf(cpf: string) {
    this.psychologists = this.psychologists.filter(psychologist => psychologist.getCpf() !== cpf);
  }
}
