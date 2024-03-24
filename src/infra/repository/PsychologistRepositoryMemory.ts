import PsychologistProfile from "../../../src/domain/entity/PsychologistProfile";
import PsychologistRepository from "../../domain/repository/PsychologistRepository";
import { PsychologistProfileData } from "./PsychologistProfileData";
export default class PsychologistRepositoryMemory implements PsychologistRepository {
  psychologistsProfiles: PsychologistProfileData[]
  constructor() {
    this.psychologistsProfiles = [];
  }

  async save(psychologistProfile: PsychologistProfile) {
    const psychologistProfileData = {
      userId: psychologistProfile.getUserId(),
      name: psychologistProfile.getName(),
      birthdate: psychologistProfile.getBirthdate(),
      cpf: psychologistProfile.getCpf(),
      phone: psychologistProfile.getPhone(),
      city: psychologistProfile.getCity(),
      province: psychologistProfile.getProvince(),
      address: psychologistProfile.getAddress()
    }
    this.psychologistsProfiles.push(psychologistProfileData);
  }

  async getByCpf(cpf: string) {
    const psychologistProfile = this.psychologistsProfiles.find(psychologist => psychologist.cpf === cpf);
    if (!psychologistProfile) return;
    return PsychologistProfile.restore(psychologistProfile.userId, psychologistProfile.name, psychologistProfile.birthdate, psychologistProfile.cpf, psychologistProfile.phone, psychologistProfile.city, psychologistProfile.province, psychologistProfile.address);
  }

  async getByUserId(userId: string) {
    const [psychologistProfile] = this.psychologistsProfiles.filter(psychologist => psychologist.userId === userId);
    if (!psychologistProfile) return;
    return PsychologistProfile.restore(psychologistProfile.userId, psychologistProfile.name, psychologistProfile.birthdate, psychologistProfile.cpf, psychologistProfile.phone, psychologistProfile.city, psychologistProfile.province, psychologistProfile.address);
  }

  async deleteByUserId(userId: string) {
    this.psychologistsProfiles = this.psychologistsProfiles.filter(psychologist => psychologist.userId !== userId);
  }
}
