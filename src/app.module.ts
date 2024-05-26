import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './Modules/admin/admin.module';
import { PrismaModule } from './Modules/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AdminModule
],
})
export class AppModule {}

