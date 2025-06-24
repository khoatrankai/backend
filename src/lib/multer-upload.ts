import { extname } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';
import * as multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

export const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'public/images/';
    
    // Create directory if it doesn't exist
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    try {
      
      if (!file || !file.originalname) {
        return cb(new Error('No file uploaded or file is invalid'), '');
      }
      
      const originalname = file.originalname;
      
      const ext = extname(originalname).toLowerCase();
      const uuidName = uuidv4();
      cb(null, `${uuidName}${ext}`);
    } catch (error) {
      cb(error as Error, '');
    }
  },
});

export const storageVideosConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'public/videos/';
    
    // Create directory if it doesn't exist
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    try {
      
      if (!file || !file.originalname) {
        return cb(new Error('No file uploaded or file is invalid'), '');
      }
      
      const originalname = file.originalname;
      
      const ext = extname(originalname).toLowerCase();
      const uuidName = uuidv4();
      console.log(`${uuidName}${ext}`)
      cb(null, `${uuidName}${ext}`);
    } catch (error) {
      cb(error as Error, '');
    }
  },
});

export const storageTracksConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'public/tracks/';
    
    // Create directory if it doesn't exist
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    try {
      
      if (!file || !file.originalname) {
        return cb(new Error('No file uploaded or file is invalid'), '');
      }
      
      const originalname = file.originalname;
      
      const ext = extname(originalname).toLowerCase();
      const uuidName = uuidv4();
      cb(null, `${uuidName}${ext}`);
    } catch (error) {
      cb(error as Error, '');
    }
  },
});

export const storageSoftwaresConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'public/softwares/';
    
    // Create directory if it doesn't exist
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    try {
      
      if (!file || !file.originalname) {
        return cb(new Error('No file uploaded or file is invalid'), '');
      }
      
      const originalname = file.originalname;
      
      const ext = extname(originalname).toLowerCase();
      const uuidName = uuidv4();
      cb(null, `${uuidName}${ext}`);
    } catch (error) {
      cb(error as Error, '');
    }
  },
});