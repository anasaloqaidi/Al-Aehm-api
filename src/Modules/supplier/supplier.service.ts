import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from '@prisma/client';


@Injectable()
export class SupplierService {
  constructor(private prisma: PrismaService) {}

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const existingSupplier = await this.findByEmail(createSupplierDto.email);
    if (existingSupplier) {
      throw new ConflictException('Supplier with this email already exists');
    }
    
    return await this.prisma.supplier.create({
      data: createSupplierDto,
    });
  }

  async findAll(): Promise<Supplier[]> {
    return await this.prisma.supplier.findMany();
  }

  async findOne(id: number): Promise<Supplier> {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
    });
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
    return supplier;
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
    });
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }

    return await this.prisma.supplier.update({
      where: { id },
      data: updateSupplierDto,
    });
  }

  async remove(id: number): Promise<Supplier> {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
    });
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }

    return await this.prisma.supplier.delete({
      where: { id },
    });
  }

  private async findByEmail(email: string): Promise<Supplier | null> {
    return await this.prisma.supplier.findUnique({
      where: { email },
    });
  }

}
