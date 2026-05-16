import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Delete,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { NoticiasService } from './noticias.service';
import { storage } from '../cloudinary/cloudinary.storage';
import { AuthGuard } from '../auth/auth.guard';

@Controller('noticias')
export class NoticiasController {
  constructor(private noticiasService: NoticiasService) {}

  // ✅ PÚBLICO (cualquiera puede ver noticias)
  @Get()
  findAll() {
    return this.noticiasService.findAll();
  }

  // 🔐 PROTEGIDO (solo admin)
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage,
      limits: {
        fileSize: 20 * 1024 * 1024, // 20 MB
      },
    }),
  )
  crear(@UploadedFile() file: any, @Body() body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const imagenUrl = file ? file.path : null;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.noticiasService.create({
      ...body,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      imagen: imagenUrl,
    });
  }

  // 🔐 PROTEGIDO
  @UseGuards(AuthGuard)
  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.noticiasService.delete(id);
  }

  // 🔐 PROTEGIDO
  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage,
      limits: {
        fileSize: 20 * 1024 * 1024, // 20 MB
      },
    }),
  )
  update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const imagenUrl = file ? file.path : body.imagen;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.noticiasService.update(id, {
      ...body,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      imagen: imagenUrl,
    });
  }
}
