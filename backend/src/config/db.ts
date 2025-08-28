import { Pool, QueryResult } from 'pg';
import config from './config.ts'

const pool = new Pool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name,
});

pool.on('connect', () => {
    console.log('Connected to the database');
})

export async function query<T = any>(text: string, params?: any[]): Promise<QueryResult<T>> {
    return pool.query<T>(text, params);
}

export { pool };