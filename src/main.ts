import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import * as express from "express";
import * as path from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const customValidationPipe = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      const customErrors = validationErrors.map((error) => {
        if (error.constraints) {
          return {
            field: error.property,
            errors: Object.values(error.constraints),
          };
        } else {
          return {
            field: error.property,
            errors: [`The ${error.property} field is not allowed to exist`],
          };
        }
      });

      return new BadRequestException({
        statusCode: HttpStatus.BAD_GATEWAY,
        message: 'Invalid data',
        errors: customErrors,
      });
    },
  });
  const app = await NestFactory.create(AppModule);
  app.use(
  "/public",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // hoặc cụ thể "http://localhost:3000"
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  },
  express.static(path.join(__dirname, "../public"))
)
  app.use(cookieParser());
  app.useGlobalPipes(customValidationPipe);
   app.enableCors({
    origin: '*', // hoặc '*' nếu test tạm thời
    credentials: true,
  });
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
