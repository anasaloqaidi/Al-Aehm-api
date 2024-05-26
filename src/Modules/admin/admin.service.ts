import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Admin } from '@prisma/client';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async create(createAdminDto: Prisma.AdminCreateInput): Promise<Admin> {
    const existingAdmin = await this.findByEmail(createAdminDto.email);
    if (existingAdmin) {
      throw new ConflictException('Admin with this email already exists');
    }
    
    return await this.prisma.admin.create({
      data: {
        ...createAdminDto,
        password: await this.hashPassword(createAdminDto.password),

      },
    });
  }

  async findAll(): Promise<Admin[]> {
    return await this.prisma.admin.findMany();
  }

  async findOne(id: number): Promise<Admin | null> {
    return await this.prisma.admin.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateAdminDto: Prisma.AdminUpdateInput): Promise<Admin> {
    return await this.prisma.admin.update({
      where: { id },
      data: updateAdminDto,
    });
  }

  async remove(id: number): Promise<Admin> {
    return await this.prisma.admin.delete({
      where: { id },
    });
  }

  private async findByEmail(email: string): Promise<Admin | null> {
    return await this.prisma.admin.findUnique({
      where: { email },
    });
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, process.env.SALT);
  }
}
