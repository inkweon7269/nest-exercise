import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { ContactModule } from './contact/contact.module';
import { ClubModule } from './club/club.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(),
    /*
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [__dirname + '/!**!/!*.entity{.ts,.js}'],
        synchronize: config.get<boolean>('DB_SYNC'),
      }),
      inject: [ConfigService],
    }),
    */
    /*
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'final-app',
      entities: ['dist/!**!/!*.entity.{js,ts}'],
      synchronize: true,
    }),
    */
    UserModule,
    AuthModule,
    BoardModule,
    ContactModule,
    ClubModule,
  ],
})
export class AppModule {}
