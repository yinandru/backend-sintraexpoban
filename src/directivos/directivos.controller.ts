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
import { storage } from '../cloudinary/cloudinary.storage';

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
      storage,
    }),
  )
  create(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    const imagenUrl = file ? file.path : null;

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
      storage,
    }),
  )
  update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    const imagenUrl = file ? file.path : null; // ✅ correcto// 👈 mantiene la imagen si no cambia

    return this.service.update(id, {
      ...body,

      imagen: imagenUrl,
    });
  }
}
