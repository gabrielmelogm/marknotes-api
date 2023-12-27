import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { env } from 'env'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.register({
			privateKey: env.JWT_KEY,
			signOptions: {
				expiresIn: `${env.SESSION_EXPIRES}s`,
			},
		}),
	],
	providers: [AuthService, LocalStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
