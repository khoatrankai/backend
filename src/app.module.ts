import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ConflictExceptionFilter } from './common/filters/conflict-exception.filter';
import { ArticlesModule } from './modules/articles/articles.module';
import { NewsModule } from './modules/news/news.module';
import { InfosModule } from './modules/infos/infos.module';
import { UsersModule } from './modules/users/users.module';
import { AwardsModule } from './modules/awards/awards.module';
import { GroupsModule } from './modules/groups/groups.module';
import { ImagesModule } from './modules/images/images.module';
import { SlidesModule } from './modules/slides/slides.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { VideosModule } from './modules/videos/videos.module';
import { ReportsModule } from './modules/reports/reports.module';
import { SoftwareModule } from './modules/software/software.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { HistoriesModule } from './modules/histories/histories.module';
import { StatisticalModule } from './modules/statistical/statistical.module';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: ConflictExceptionFilter,
    },
  ],
  imports: [ ConfigModule.forRoot({
    envFilePath: '../.env',
    isGlobal: true, 
  }),
    DatabaseModule,ArticlesModule,NewsModule,InfosModule,UsersModule,AwardsModule,GroupsModule,ImagesModule,SlidesModule,TracksModule,VideosModule,ReportsModule,SoftwareModule,DocumentsModule,HistoriesModule,StatisticalModule
  ]
})
export class AppModule {}
