import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotesEntity } from './entities/notes.entity'
import { NotesController } from './notes.controller'
import { NotesService } from './notes.service'

@Module({
	imports: [TypeOrmModule.forFeature([NotesEntity])],
	controllers: [NotesController],
	providers: [NotesService],
})
export class NotesModule {}
