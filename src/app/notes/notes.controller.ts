import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
} from '@nestjs/common'
import { CreateNoteDto } from './dto/createNote.dto'
import { UpdateNoteDto } from './dto/updateNote.dto'
import { NotesService } from './notes.service'

@Controller('notes')
export class NotesController {
	constructor(private readonly notesService: NotesService) {}

	@Get(':id')
	async show(@Param('id', new ParseUUIDPipe()) id: string) {
		try {
			return await this.notesService.findOne({
				where: {
					id,
				},
			})
		} catch (error) {
			return new HttpException('Note was not found', HttpStatus.BAD_REQUEST)
		}
	}

	@Post()
	async store(@Body() data: CreateNoteDto) {
		return await this.notesService.store(data)
	}

	@Put(':id')
	async update(
		@Param('id', new ParseUUIDPipe()) id: string,
		@Body() data: UpdateNoteDto,
	) {
		return await this.notesService.update(id, data)
	}

	@Delete(':id')
	async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
		return await this.notesService.destroy({
			id,
		})
	}
}
