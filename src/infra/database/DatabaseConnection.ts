import pgp from 'pg-promise';
import * as dotenv from 'dotenv';

export default interface DataBaseConnection {
  query(statement: string, params: any): Promise<any>;
  close(): Promise<any>;
}

export class PgPromiseAdapter implements DataBaseConnection {
  connection: any;

  constructor() {
    dotenv.config();
    const POSTGRE_PORT = process.env.POSTGRE_PORT || 5432;
    const POSTGRE_USER = process.env.POSTGRE_USER || 'postgres';
    const POSTGRE_PASSWORD = process.env.POSTGRE_PASSWORD || '123456';
    const POSTGRE_DB = process.env.POSTGRE_DB || 'app';
    const POSTGRE_HOST = process.env.POSTGRE_HOST || 'localhost';
    this.connection = pgp()(`postgres://${POSTGRE_USER}:${POSTGRE_PASSWORD}@${POSTGRE_HOST}:${POSTGRE_PORT}/${POSTGRE_DB}`);
  }

  async query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params);
  }

  async close(): Promise<any> {
    return this.connection.$pool.end();
  }
}