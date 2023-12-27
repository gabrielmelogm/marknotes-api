import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcrypt'
import { UsersEntity } from '../users/entities/users.entity'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async login(user: UsersEntity) {
		const payload = { sub: user.id, email: user.email }
		return {
			token: this.jwtService.sign(payload),
		}
	}

	async validateUser(
		email: string,
		password: string,
	): Promise<UsersEntity> | null {
		let user: UsersEntity
		try {
			user = await this.userService.findOne({ where: { email } })
		} catch (error) {
			return null
		}

		const isPasswordValid = compareSync(password, user.password)
		if (!isPasswordValid) return null

		return user
	}
}
