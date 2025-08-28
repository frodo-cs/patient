import dotenv from 'dotenv';

dotenv.config();

interface Config {
  origin: string;
  port: number;
  nodeEnv: string;
  models: {
    openAIKey: string;
    assemblyKey: string;
    text: string;
  }
  db: {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
  };
  aws: {
    region: string;
    bucketName: string;
  }
}

const config: Config = {
  origin: process.env.ORIGIN || '',
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'local',
  models: {
    openAIKey: process.env.OPENAI_API_KEY || '',
    assemblyKey: process.env.ASSEMBLYAI_API_KEY || '',
    text: process.env.TEXT_MODEL_URL || '',
  },
  db: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || '',
    name: process.env.POSTGRES_DB || 'postgres',
  },
  aws: {
    region: process.env.AWS_REGION || '',
    bucketName: process.env.AWS_BUCKET_NAME || '',
  }
};

export default config;
