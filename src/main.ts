import * as dotenv from 'dotenv';
import cors from "cors";
import express from "express";
import UserSignUp from './application/usecase/UserSignUp';
import { PgPromiseAdapter } from './infra/database/DatabaseConnection';
import UserCredentialsRepositoryDatabase from './infra/repository/UserCredentialsRepositoryDatabase';
import PsychologistRepositoryDatabase from './infra/repository/PsychologistRepositoryDatabase';
import UserSignIn from './application/usecase/UserSignIn';
import { PatientRepositoryDatabase } from './infra/repository/PatientRepositoryDatabase';
import PatientRegister from './application/usecase/PatientRegister';
import UserAuthenticationService from './infra/service/AuthenticationService';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/login', async (req, res) => {
  const input = req.body;
  const connection = new PgPromiseAdapter();
  const userCredentialsRepositoryDatabase = new UserCredentialsRepositoryDatabase(connection);
  const userSignIn: UserSignIn = new UserSignIn(userCredentialsRepositoryDatabase);
  try {
    const output = await userSignIn.execute(input);
    res.send(output)
    console.log("api/login output", output);
  }
  catch (error) {
    console.log(error);
    res.status(401).send({ error: 'Invalid username or password' }); // Send 401 Unauthorized
  }finally{
    connection.close();
  }
});

app.post('/api/users', async (req, res) => {
  const input = req.body;
  const connection = new PgPromiseAdapter();
  const userCredentialsRepositoryDatabase = new UserCredentialsRepositoryDatabase(connection);
  const psychologistRepositoryDatabase = new PsychologistRepositoryDatabase(connection);
  const userSignUp: UserSignUp = new UserSignUp(psychologistRepositoryDatabase, userCredentialsRepositoryDatabase);
  try {
    await userSignUp.execute(input);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }finally{
    connection.close();
  }
})

// gets the user profile by the user_id contained in the JWT token
app.get('/api/users', async (req, res) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }
  const connection = new PgPromiseAdapter();
  try {
    const decodedJWT = await UserAuthenticationService.verifyJWT(authorizationHeader);
    const userId = decodedJWT.userId;
    const psychologistRepositoryDatabase = new PsychologistRepositoryDatabase(connection);
    const output = await psychologistRepositoryDatabase.getByUserId(userId);
    res.send(output);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: error });
  }finally{
    connection.close();
  }
})

app.get('/api/users/:userId/patients', async (req, res) => {
  const connection = new PgPromiseAdapter();
  const patientRepository = new PatientRepositoryDatabase(connection);
  const userId = req.params.userId;
  try {
    const output = await patientRepository.getByPsychologistId(userId);
    res.send(output);
  } catch (error) {
    console.log(error);
  }  
  finally{
    connection.close();
  }
});

app.post('/api/users/:userId/patients', async (req, res) => {
  const connection = new PgPromiseAdapter();
  const patientRepository = new PatientRepositoryDatabase(connection);
  const patientRegister = new PatientRegister(patientRepository);
  const userId = req.params.userId;
  const input = { ...req.body, psychologistId: userId };
  try {
    const output = await patientRegister.execute(input);
    res.send({ message: "Patient registered" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }
  finally{
    connection.close();
  }
});

app.delete('/api/users/:userId/patients/:cpf', async (req, res) => {
  const connection = new PgPromiseAdapter();
  const patientRepository = new PatientRepositoryDatabase(connection);
  const cpf = req.params.cpf;
  try {
    await patientRepository.deleteByCpf(cpf);
    res.send({ message: "Patient deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }
  finally{
    connection.close();
  }
});

app.listen(process.env.HTTP_SERVER_PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.HTTP_SERVER_PORT}`);
});



