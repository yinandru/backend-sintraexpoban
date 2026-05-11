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

  update(id: number, data: any) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
