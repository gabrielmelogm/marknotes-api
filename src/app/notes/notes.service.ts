import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MessagesHelper } from 'src/helpers/messages.helper'
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm'
import { UsersService } from '../users/users.service'
import { CreateNoteDto } from './dto/createNote.dto'
import { UpdateNoteDto } from './dto/updateNote.dto'
import { NotesEntity } from './entities/notes.entity'

@Injectable()
export class NotesService {
	constructor(
		@InjectRepository(NotesEntity)
		private readonly notesRepository: Repository<NotesEntity>,
		private readonly userService: UsersService,
	) {}

	async findOne(options: FindOneOptions<NotesEntity>) {
		return await this.notesRepository.findOneOrFail(options)
	}

	async store(data: CreateNoteDto) {
		const user = await this.userService.findOne({ where: { id: data.userId } })

		if (!user) throw new Error(MessagesHelper.USER_NOT_FOUND)

		const notes = await this.notesRepository.create({
			title: data.title,
			content: data.content,
			user: {
				id: data.userId,
			},
		})

		return await this.notesRepository.save(notes)
	}

	async update(id: string, data: UpdateNoteDto) {
		const note = await this.findOne({ where: { id } })
		this.notesRepository.merge(note, data)
		return await this.notesRepository.save(note)
	}

	async destroy(options: FindOptionsWhere<NotesEntity>) {
		return await this.notesRepository.delete(options)
	}
}
