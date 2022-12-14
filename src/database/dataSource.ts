import { DataSource } from 'typeorm';
import User from './models/User.entity';
import dotenv from 'dotenv';
import Beat from './models/Beat.entity';
import Credit from './models/Credit.entity';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'sweatshop_calabasas',
  synchronize: true,
  logging: true,
  entities: [User, Beat, Credit],
  subscribers: [],
  migrations: [],
  ssl: true,
});
