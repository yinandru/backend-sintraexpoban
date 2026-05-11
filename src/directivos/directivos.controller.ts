import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { DirectivosService } from './directivos.service';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('directivos')
export class DirectivosController {
  constructor(private service: DirectivosService) {}

  // ✅ PUBLICO
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // 🔐 CREAR
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const nombre = Date.now() + '-' + file.originalname;
          cb(null, nombre);
        },
      }),
    }),
  )
  create(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    const imagenUrl = file
      ? `http://localhost:3000/uploads/${file.filename}`
      : null;

    return this.service.create({
      ...body,
      imagen: imagenUrl,
    });
  }

  // 🔐 ELIMINAR
  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }

  // 🔐 ACTUALIZAR
  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const nombre = Date.now() + '-' + file.originalname;
          cb(null, nombre);
        },
      }),
    }),
  )
  update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const imagenUrl = file?.filename
      ? `http://localhost:3000/uploads/${file.filename}`
      : body.imagen; // ✅ correcto// 👈 mantiene la imagen si no cambia

    return this.service.update(id, {
      ...body,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      imagen: imagenUrl,
    });
  }
}
