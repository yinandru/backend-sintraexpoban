import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.config';

export const storage = new CloudinaryStorage({
  cloudinary,
  // eslint-disable-next-line @typescript-eslint/require-await
  params: async (req, file) => {
    return {
      folder: 'sintraexpoban',
      format: 'png',
      public_id: Date.now() + '-' + file.originalname,
    };
  },
});
