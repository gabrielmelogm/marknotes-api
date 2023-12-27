import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from '../users/users.module'
import { NotesEntity } from './entities/notes.entity'
import { NotesController } from './notes.controller'
import { NotesService } from './notes.service'

@Module({
	imports: [TypeOrmModule.forFeature([NotesEntity]), UsersModule],
	controllers: [NotesController],
	providers: [NotesService],
})
export class NotesModule {}
