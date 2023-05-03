import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.input.dto';
import { UpdateLeadDto } from './dto/update-lead.input.dto';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { Lead } from '@prisma/client';
import { GetLeadsInputDto } from './dto/get-leads.input.dto';

@Injectable()
export class LeadsService {
  public constructor(private readonly prisma: PrismaService) {}

  public create(createLeadDto: CreateLeadDto): Promise<Lead> {
    return this.prisma.lead.create({ data: createLeadDto });
  }

  public find(input: GetLeadsInputDto): Promise<Lead[]> {
    return this.prisma.lead.findMany({ where: input });
  }

  public async findOne(id: number): Promise<Lead> {
    await this.validateIfLeadExists(id);
    return this.prisma.lead.findUnique({ where: { id } });
  }

  public async update(id: number, updateLeadDto: UpdateLeadDto) {
    await this.validateIfLeadExists(id);
    return this.prisma.lead.update({ where: { id }, data: updateLeadDto });
  }

  public async remove(id: number) {
    await this.validateIfLeadExists(id);
    return this.prisma.lead.delete({ where: { id } });
  }

  private async validateIfLeadExists(id: number) {
    if (!(await this.prisma.lead.findUnique({ where: { id } }))) {
      throw new NotFoundException(`Lead with id ${id} not found`);
    }
  }
}
