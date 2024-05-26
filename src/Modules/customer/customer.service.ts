import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const existingCustomer = await this.findByEmail(createCustomerDto.email);
    if (existingCustomer) {
      throw new ConflictException('Customer with this email already exists');
    }
    
    const hashedPassword = await this.hashPassword(createCustomerDto.password);

    return await this.prisma.customer.create({
      data: {
        ...createCustomerDto,
        password: hashedPassword,
      },
    });
  }

  async findAll(): Promise<Customer[]> {
    return await this.prisma.customer.findMany();
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    if (updateCustomerDto.password) {
      updateCustomerDto.password = await this.hashPassword(updateCustomerDto.password);
    }

    return await this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  async remove(id: number): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return await this.prisma.customer.delete({
      where: { id },
    });
  }

  private async findByEmail(email: string): Promise<Customer | null> {
    return await this.prisma.customer.findUnique({
      where: { email },
    });
  }

  private async hashPassword(password: string): Promise<string> {

    return await bcrypt.hash(password, process.env.SALT);
  }
}
