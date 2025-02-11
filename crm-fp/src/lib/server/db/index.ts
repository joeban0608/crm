import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import * as schema from './schema';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, { schema });
export type DB = typeof db;

export class DatabaseAdmin {
	constructor(public database: DB) {}
	static get _tables() {
		return schema;
	}
}
