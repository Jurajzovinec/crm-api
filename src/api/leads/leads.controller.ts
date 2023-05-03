import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { StandardizePhoneNumberPipe } from './decorators/standardize-phone-number.pipe';

@ApiTags('Leads')
@Controller('leads')
export class LeadsController {
  public constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @ApiBody({ type: CreateLeadDto })
  public create(@Body(StandardizePhoneNumberPipe) createLeadDto: CreateLeadDto) {
    return this.leadsService.create(createLeadDto);
  }

  @Get()
  public findAll() {
    return this.leadsService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number) {
    return this.leadsService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateLeadDto })
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body(StandardizePhoneNumberPipe) updateLeadDto: UpdateLeadDto
  ) {
    return this.leadsService.update(id, updateLeadDto);
  }

  @Delete(':id')
  public remove(@Param('id', ParseIntPipe) id: number) {
    return this.leadsService.remove(id);
  }
}
