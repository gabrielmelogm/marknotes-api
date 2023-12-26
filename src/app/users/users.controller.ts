import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
} from '@nestjs/common'
import { CreateUserDto } from './dto/createUser.dto'
import { UpdateUserDto } from './dto/updateUser.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get(':id')
	async show(@Param('id', new ParseUUIDPipe()) id: string) {
		try {
			return await this.usersService.findOne({
				where: {
					id,
				},
			})
		} catch (error) {
			return new HttpException('User was not found', HttpStatus.BAD_REQUEST)
		}
	}

	@Post()
	async store(@Body() data: CreateUserDto) {
		return await this.usersService.store(data)
	}

	@Put(':id')
	async update(
		@Param('id', new ParseUUIDPipe()) id: string,
		@Body() data: UpdateUserDto,
	) {
		return await this.usersService.update(id, data)
	}
}
