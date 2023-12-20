import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm'
import { CreateNoteDto } from './dto/createNote.dto'
import { UpdateNoteDto } from './dto/updateNote.dto'
import { NotesEntity } from './entities/notes.entity'

@Injectable()
export class NotesService {
	constructor(
		@InjectRepository(NotesEntity)
		private readonly notesRepository: Repository<NotesEntity>,
	) {}

	async findOne(options: FindOneOptions<NotesEntity>) {
		return await this.notesRepository.findOneOrFail(options)
	}

	async store(data: CreateNoteDto) {
		return await this.notesRepository.save(data)
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
