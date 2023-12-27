import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
	Req,
	UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ReqUserLogin } from '../auth/@types/userHeader'
import { CreateNoteDto } from './dto/createNote.dto'
import { UpdateNoteDto } from './dto/updateNote.dto'
import { NotesService } from './notes.service'

@Controller('notes')
@UseGuards(AuthGuard('jwt'))
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
	async store(@Body() data: CreateNoteDto, @Req() req: ReqUserLogin) {
		return await this.notesService.store(
			{
				title: data.title,
				content: data.content,
			},
			req.user.id,
		)
	}

	@Put(':id')
	async update(
		@Param('id', new ParseUUIDPipe()) id: string,
		@Body() data: UpdateNoteDto,
	) {
		return await this.notesService.update(id, data)
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
		return await this.notesService.destroy({
			id,
		})
	}
}
