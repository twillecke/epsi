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
    res.send(output)
    console.log("api/login output", output);
  }
  catch (error) {
    console.log(error);
  }
  connection.close();
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
  }
  connection.close();
})

app.get('/api/users/:userId', async (req, res) => {
  const connection = new PgPromiseAdapter();
  const psychologistRepositoryDatabase = new PsychologistRepositoryDatabase(connection);
  const userId = req.params.userId;
  console.log("userId", userId);
  try {
    const output = await psychologistRepositoryDatabase.getByUserId(userId);
    res.send(output);
  } catch (error) {
    console.log(error);
  }
})

app.listen(process.env.HTTP_SERVER_PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.HTTP_SERVER_PORT}`);
});



