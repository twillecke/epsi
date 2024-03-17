import * as dotenv from 'dotenv';
import cors from "cors";
import express from "express";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('');
});

app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
