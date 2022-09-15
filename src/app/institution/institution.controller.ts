import { Body, Controller, Post } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/request/create.institution.dto';
import { InstitutionService } from './institution.service';

@Controller('institution')
export class InstitutionController {
  constructor(private institutionService: InstitutionService) {}

  @Post('create')
  async createInstitution(
    @Body() createInstitutionDto: CreateInstitutionDto,
  ): Promise<any> {
    return await this.institutionService.createInstitution(
      createInstitutionDto,
    );
  }
}
