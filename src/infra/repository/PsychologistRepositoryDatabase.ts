import PsychologistProfile from "../../domain/entity/PsychologistProfile";
import PsychologistRepository from "../../domain/repository/PsychologistRepository";
import DatabaseConnection from "../database/DatabaseConnection";

export default class PsychologistRepositoryDatabase implements PsychologistRepository {
  constructor(readonly connection: DatabaseConnection) {
  }

  async save(psychologistProfile: PsychologistProfile) {
    await this.connection.query("insert into epsi.psychologist_profile (user_id, name, birthdate, cpf, phone, city, province, address) values ($1, $2, $3, $4, $5, $6, $7, $8)",
      [psychologistProfile.getUserId(), psychologistProfile.getName(), psychologistProfile.getBirthdate(), psychologistProfile.getCpf(), psychologistProfile.getPhone(), psychologistProfile.getCity(), psychologistProfile.getProvince(), psychologistProfile.getAddress()]);
  }

  async getByCpf(cpf: string) {
    const [psychologistProfileData] = await this.connection.query("select user_id, name, birthdate, cpf, phone, city, province, address from epsi.psychologist_profile where cpf = $1", [cpf]);
    if (!psychologistProfileData) return;
    return PsychologistProfile.restore(psychologistProfileData.userId, psychologistProfileData.name, psychologistProfileData.birthdate, psychologistProfileData.cpf, psychologistProfileData.phone, psychologistProfileData.city, psychologistProfileData.province, psychologistProfileData.address);
  }

  async getByUserId(userId: string) {
    const [psychologistProfileData] = await this.connection.query("SELECT user_id, name, birthdate, cpf, phone, city, province, address FROM epsi.psychologist_profile WHERE user_id = $1", [userId]);
    if (!psychologistProfileData) return;
    return PsychologistProfile.restore(psychologistProfileData.user_id, psychologistProfileData.name, psychologistProfileData.birthdate, psychologistProfileData.cpf, psychologistProfileData.phone, psychologistProfileData.city, psychologistProfileData.province, psychologistProfileData.address);
  }

  async deleteByUserId(userId: string) {
    await this.connection.query("delete from epsi.psychologist_profile where user_id = $1", [userId]);
  }
}
