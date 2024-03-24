import Psychologist from "../entity/Psychologist";

export default interface PsychologistRepository {
  save(psychologist: Psychologist): Promise<void>;
  getByEmail(email: string): Promise<Psychologist | undefined>;
  getByCpf(cpf: string): Promise<Psychologist | undefined>;
  deleteByCpf(cpf: string): Promise<void>;
}