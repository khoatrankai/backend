import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import * as mssql from 'mssql';
import { Article } from './entities/articles/article.entity';
import { CategoryActivity } from './entities/news/category-activity.entity';
import { CategoryArticle } from './entities/articles/category-article.entity';
import { CategoryDocument } from './entities/documents/category-document.entity';
import { CategoryImage } from './entities/images/category-image.entity';
import { CategoryNews } from './entities/news/category-news.entity';
import { CategoryPlatform } from './entities/softwares/category-platform.entity';
import { CategoryReport } from './entities/reports/category-report.entity';
import { CategoryTrack } from './entities/tracks/category-track.entity';
import { CategoryVideo } from './entities/videos/category-video.entity';
import { Award } from './entities/awards/award.entity';
import { Document } from './entities/documents/document.entity';
import { Group } from './entities/groups/group.entity';
import { History } from './entities/histories/history.entity';
import { Image } from './entities/images/image.entity';
import { Info } from './entities/infos/info.entity';
import { News } from './entities/news/news.entity';
import { Report } from './entities/reports/report.entity';
import { Slide } from './entities/slides/slide.entity';
import { Software } from './entities/softwares/software.entity';
import { Statistical } from './entities/statistical/statistical.entity';
import { Track } from './entities/tracks/track.entity';
import { User } from './entities/users/user.entity';
import { Video } from './entities/videos/video.entity';
import { Region } from './entities/news/region.entity';
import { Platform } from './entities/softwares/platform.entity';
import { HistoriesLeader } from './entities/histories/histories-leader.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const dbName = configService.get<string>('DB_DATABASE');

        // Tạo kết nối tạm để tạo database nếu chưa tồn tại
        const tempConnection = await mssql.connect({
          user: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          server: configService.get<string>('DB_HOST'),
          port: parseInt(configService.get<string>('DB_PORT') ?? '1433', 10),
          database: 'master', // Kết nối vào master để tạo DB
          options: {
            encrypt: false,
            trustServerCertificate: true,
          },
        });

        await tempConnection.request().query(`IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = '${dbName}') CREATE DATABASE [${dbName}]`);
        await tempConnection.close();

        // Cấu hình kết nối thật sự đến DB chính
        return {
          type: 'mssql',
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: parseInt(configService.get<string>('DB_PORT') ?? '1433', 10),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: dbName,
          entities: [
            Platform,HistoriesLeader,CategoryActivity,CategoryDocument,CategoryImage,CategoryNews,CategoryPlatform,CategoryReport,CategoryTrack,CategoryVideo,Award,Document,Group,History,Image,Info,News,Report,Slide,Software,Statistical,Track,User,Video,Region,Article,CategoryArticle
          ],
          // synchronize: true,
          // dropSchema:true,
          options: {
            encrypt: false,
            trustServerCertificate: true,
          },
        };
      },
    }),
  ],
})
export class DatabaseModule {}
