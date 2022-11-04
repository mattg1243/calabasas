import express from 'express';
import { uploadBeatHandler } from '../handlers/upload.handlers';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/beat', upload.single('beat'), uploadBeatHandler);

export default router;
