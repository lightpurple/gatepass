import dotenv from 'dotenv'
import { normalizePort } from './lib/utils.js'

dotenv.config();

export const env = {
	db: {
		host: process.env.DB_HOST,
		port: normalizePort(process.env.DB_PORT),
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME
	},
	port: normalizePort(process.env.PORT)
}
