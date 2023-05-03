import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.input.dto';
import { UpdateLeadDto } from './dto/update-lead.input.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { StandardizePhoneNumberPipe } from './decorators/standardize-phone-number.pipe';
import { LEAD_SOURCES, LEAD_STATUSES } from './leads.types';
import { GetLeadsInputDto } from './dto/get-leads.input.dto';

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
  @ApiQuery({
    name: 'source',
    required: false,
    type: String,
    enum: LEAD_SOURCES
  })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
    enum: LEAD_STATUSES
  })
  public findAll(@Query() input: GetLeadsInputDto) {
    return this.leadsService.find(input);
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
