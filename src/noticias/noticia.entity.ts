import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Noticia {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column()
  contenido!: string;

  @Column()
  imagen!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
