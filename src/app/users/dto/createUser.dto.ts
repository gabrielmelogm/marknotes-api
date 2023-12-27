import { IsEmail, IsNotEmpty, Matches } from 'class-validator'
import { RegExHelper } from 'src/helpers/regex.helper'

export class CreateUserDto {
	@IsNotEmpty()
	name: string

	@IsEmail()
	@IsNotEmpty()
	email: string

	@IsNotEmpty()
	@Matches(RegExHelper.password, {
		message: 'The password must be 8 caracteres',
	})
	password: string
}
