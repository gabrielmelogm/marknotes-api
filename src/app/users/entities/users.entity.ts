import { NotesEntity } from 'src/app/notes/entities/notes.entity'
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity('users')
export class UsersEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ name: 'name' })
	name: string

	@Column({ name: 'email', unique: true })
	email: string

	@OneToMany(
		() => NotesEntity,
		(notes) => notes.user,
	)
	notes: NotesEntity[]

	@CreateDateColumn({ name: 'created_at' })
	createdAt: string

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: string

	@DeleteDateColumn({ name: 'deleted_at' })
	deletedAt: string
}
