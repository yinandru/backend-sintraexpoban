import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  /* @Column({ default: 'user' })
  role!: string; */

  @Column({
    type: 'enum',
    enum: ['user', 'admin', 'superadmin'], // 👈 aquí defines los roles permitidos
    default: 'user', // 👈 por defecto será "user"
  })
  role!: string;
}
