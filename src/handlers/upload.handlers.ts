import { Request, Response, NextFunction } from 'express';
import { uploadBeatToBucket } from '../bucket/audio';
import fs from 'fs';

export const uploadBeatHandler = async (req: Request, res: Response, next: NextFunction) => {
  const uploadTimer = '---  file uploaded to bucket in:';
  console.time(uploadTimer);
  if (req.file) {
    const beat = req.file;
    try {
      const s3response = await uploadBeatToBucket(beat);
      // now need to create an SQL row and store the filepath there
      console.timeEnd(uploadTimer);
      console.log('file uploaded: ');
      console.log(s3response);
      fs.unlink(beat.path, () => {
        console.log('---  upload deleted from server  ---');
      });
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log('no file detected');
  }
};
