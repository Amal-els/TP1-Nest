import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { FirstMiddleware } from './middlewares/first-middleware/first-middleware.middleware';
import { logger } from './middlewares/logger';
@Module({
  imports: [CvModule, SkillModule, UserModule, 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'tp1',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    },
  ), AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirstMiddleware, logger).forRoutes('cv',
      { path: 'skill', method: RequestMethod.POST },
    );
  }
}
