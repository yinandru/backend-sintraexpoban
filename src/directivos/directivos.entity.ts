import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('directivos')
export class Directivo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  cargo!: string;

  @Column({ nullable: true })
  imagen!: string;
}
