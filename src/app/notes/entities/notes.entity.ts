import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'notes' })
export class NotesEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ name: 'title' })
	title: string

	@Column({ name: 'content', type: 'text' })
	content: string

	@CreateDateColumn({ name: 'created_at' })
	createdAt: string

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: string

	@DeleteDateColumn({ name: 'deleted_at' })
	deletedAt: string
}
