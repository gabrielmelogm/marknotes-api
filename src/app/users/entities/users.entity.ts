import { hashSync } from 'bcrypt'
import { NotesEntity } from 'src/app/notes/entities/notes.entity'
import {
	BeforeInsert,
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

	@Column()
	name: string

	@Column({ unique: true })
	email: string

	@Column()
	password: string

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

	@BeforeInsert()
	hashPassword() {
		this.password = hashSync(this.password, 10)
	}
}
