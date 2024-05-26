import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';



@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect().then(()=>console.log("connected to the postgres DB")).catch(()=>console.log("Error connecting to the postgres DB"));
  }
}