import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { UsersEntity } from '../../app/users/entities/users.entity'

export default class UserSeeder implements Seeder {
	public async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager,
	): Promise<void> {
		await dataSource.query('TRUNCATE "users" RESTART IDENTITY;')

		const user = {
			name: 'Gabriel Melo',
			email: 'melogoncalvesbiel@gmail.com',
			password: 'Gabriel@123',
		}

		const repository = dataSource.getRepository(UsersEntity)
		const newUser = repository.create(user)
		await repository.save(newUser)
	}
}
