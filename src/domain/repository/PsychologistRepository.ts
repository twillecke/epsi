import PsychologistProfile from "../entity/PsychologistProfile";

export default interface PsychologistRepository {
  save(psychologistProfile: PsychologistProfile): Promise<void>;
  getByCpf(cpf: string): Promise<PsychologistProfile | undefined>;
  deleteByUserId(userId: string): Promise<void>;
  getByUserId(userId: string): Promise<any | undefined>;
  restoreByUserId(userId: string): Promise<PsychologistProfile | undefined>;
}