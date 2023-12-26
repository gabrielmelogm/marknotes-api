import { IsString, IsUUID } from 'class-validator'

export class UpdateNoteDto {
	@IsString()
	title: string

	@IsString()
	content: string
}
