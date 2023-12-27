import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CreateUserDto } from './dto/createUser.dto'
import { UpdateUserDto } from './dto/updateUser.dto'
import { UsersService } from './users.service'

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get(':email')
	async show(@Param('email') email: string) {
		try {
			return await this.usersService.findByEmail(email)
		} catch (error) {
			return new HttpException('User was not found', HttpStatus.BAD_REQUEST)
		}
	}

	@Post()
	async store(@Body() data: CreateUserDto) {
		try {
			return await this.usersService.store(data)
		} catch (error) {
			return new HttpException(error?.message, HttpStatus.BAD_REQUEST)
		}
	}

	@Put(':email')
	async update(@Param('email') email: string, @Body() data: UpdateUserDto) {
		return await this.usersService.update(email, data)
	}
}
