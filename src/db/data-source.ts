import { DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'
import { env } from '../../env'
import { MainSeeder } from './seeds/main.seeder'

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
	type: env.TYPEORM_CONNECTION,
	host: env.TYPEORM_HOST,
	port: parseInt(env.DATABASE_PORT),
	username: env.DATABASE_USERNAME,
	password: env.DATABASE_PASSWORD,
	database: env.DATABASE_NAME,
	entities: ['dist/src/**/*.entity{.js,.ts}'],
	seeds: [MainSeeder],
	synchronize: env.NODE_ENV === 'development',
}
