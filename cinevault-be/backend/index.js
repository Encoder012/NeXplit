import express from 'express';
import cors from "cors"
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import accountRoutes from "./routes/accountRoutes.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cors());
// app.use('/api/list', listRoutes);
app.use('/api/accounts', accountRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
