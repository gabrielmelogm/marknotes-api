import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateNoteDto {
	@IsNotEmpty()
	title: string

	@IsNotEmpty()
	content: string

	@IsUUID()
	userId: string
}
