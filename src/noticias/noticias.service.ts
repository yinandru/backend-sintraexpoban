import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Noticia } from './noticia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoticiasService {
  constructor(
    @InjectRepository(Noticia)
    private noticiaRepo: Repository<Noticia>,
  ) {}

  findAll() {
    return this.noticiaRepo.find({
      order: {
        id: 'DESC',
      },
    });
  }

  create(data: Partial<Noticia>) {
    const noticia = this.noticiaRepo.create(data);
    return this.noticiaRepo.save(noticia);
  }

  delete(id: number) {
    return this.noticiaRepo.delete(id);
  }

  async update(id: number, data: Partial<Noticia>) {
    const noticia = await this.noticiaRepo.findOneBy({ id });

    if (!noticia) {
      throw new Error('Noticia no encontrada');
    }

    // ✅ título
    if (data.titulo !== undefined) {
      noticia.titulo = data.titulo;
    }

    // ✅ contenido
    if (data.contenido !== undefined) {
      noticia.contenido = data.contenido;
    }

    // ✅ imagen CLOUDINARY
    if (data.imagen !== undefined) {
      noticia.imagen = data.imagen;
    }

    return this.noticiaRepo.save(noticia);
  }
}
