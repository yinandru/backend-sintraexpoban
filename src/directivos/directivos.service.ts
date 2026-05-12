import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Directivo } from './directivos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DirectivosService {
  constructor(
    @InjectRepository(Directivo)
    private repo: Repository<Directivo>,
  ) {}

  findAll() {
    return this.repo.find({ order: { id: 'DESC' } });
  }

  create(data: any) {
    return this.repo.save(data);
  }

  async update(id: number, data: any) {
    const directivo = await this.repo.findOneBy({ id });

    if (!directivo) {
      return null;
    }

    // ✅ Mantener imagen actual si no viene nueva
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!data.imagen) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      data.imagen = directivo.imagen;
    }

    Object.assign(directivo, data);

    return this.repo.save(directivo);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
