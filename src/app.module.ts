import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { ContactModule } from './contact/contact.module';
import { ClubModule } from './club/club.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
    BoardModule,
    ContactModule,
    ClubModule,
  ],
})
export class AppModule {}
