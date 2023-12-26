import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
import { CreateUserDto } from './dto/createUser.dto'
import { UpdateUserDto } from './dto/updateUser.dto'
import { UsersEntity } from './entities/users.entity'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UsersEntity)
		private readonly usersRepository: Repository<UsersEntity>,
	) {}

	async findOne(options: FindOneOptions<UsersEntity>) {
		return await this.usersRepository.findOneOrFail(options)
	}

	async findByEmail(email: string) {
		return await this.usersRepository.findOne({
			where: {
				email,
			},
		})
	}

	async store(data: CreateUserDto) {
		const user = await this.findByEmail(data.email)
		if (user) throw new Error('User already exists')
		return await this.usersRepository.save(data)
	}

	async update(id: string, data: UpdateUserDto) {
		const user = await this.findOne({ where: { id } })
		this.usersRepository.merge(user, data)
		return await this.usersRepository.save(user)
	}
}
