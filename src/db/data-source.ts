import { DataSourceOptions } from 'typeorm'
import { env } from '../../env'

export const dataSourceOptions: DataSourceOptions = {
	type: env.TYPEORM_CONNECTION,
	host: env.TYPEORM_HOST,
	port: parseInt(env.DATABASE_PORT),
	username: env.DATABASE_USERNAME,
	password: env.DATABASE_PASSWORD,
	database: env.DATABASE_NAME,
	entities: ['dist/src/**/*.entity{.js,.ts}'],
	synchronize: env.NODE_ENV === 'development',
}
