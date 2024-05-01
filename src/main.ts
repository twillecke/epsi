import * as dotenv from 'dotenv';
import cors from "cors";
import express from "express";
import UserSignUp from './application/usecase/UserSignUp';
import { PgPromiseAdapter } from './infra/database/DatabaseConnection';
import UserCredentialsRepositoryDatabase from './infra/repository/UserCredentialsRepositoryDatabase';
import PsychologistRepositoryDatabase from './infra/repository/PsychologistRepositoryDatabase';
import UserSignIn from './application/usecase/UserSignIn';

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
    console.log(output);
  }
  catch (e) {
    console.log(e);
  }
  connection.close();
});

app.post('/api/users', async (req, res) => {
  const input = req.body;
  const connection = new PgPromiseAdapter();
  const userCredentialsRepositoryDatabase = new UserCredentialsRepositoryDatabase(connection);
  const psychologistRepositoryDatabase = new PsychologistRepositoryDatabase(connection);
  const userSignUp: UserSignUp = new UserSignUp(psychologistRepositoryDatabase, userCredentialsRepositoryDatabase);
  await userSignUp.execute(input);
  connection.close();
})

app.listen(process.env.HTTP_SERVER_PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.HTTP_SERVER_PORT}`);
});



