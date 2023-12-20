import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { env } from '../env'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: env.TYPEORM_CONNECTION,
			host: env.TYPEORM_HOST,
			port: parseInt(env.DATABASE_PORT),
			username: env.DATABASE_USERNAME,
			password: env.DATABASE_PASSWORD,
			database: env.DATABASE_NAME,
			entities: [`${__dirname}/**/*.entity{.js,.ts}`],
			synchronize: env.NODE_ENV === 'development',
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
