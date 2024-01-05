import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './app/auth/auth.module'
import { NotesModule } from './app/notes/notes.module'
import { UsersModule } from './app/users/users.module'
import { dataSourceOptions } from './db/data-source'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot(dataSourceOptions),
		NotesModule,
		UsersModule,
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
